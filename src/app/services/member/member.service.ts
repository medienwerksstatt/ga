import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MemberInterface } from "./member.interface";
import { environment } from "../../../environments/environment.prod";
import { MemberGroupInterface } from "./member.group.interface";
import {
  flatMap,
  groupBy,
  map,
  mergeMap,
  switchMap,
  toArray,
} from "rxjs/operators";
import { from, of, zip } from "rxjs";
import { ArticleInterface } from "../article/article.interface";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class MemberService {
  private static readonly STORAGE_KEY = "MEMBER";

  private static readonly URL = `${environment.apiUrl}/mitglieder/details`;
  private cache: MemberInterface[];

  constructor(private http: HttpClient, private storage: Storage) {}

  public async all(force: boolean = false): Promise<MemberInterface[]> {
    if (this.cache && !force) {
      return this.cache;
    }

    try {
      this.cache = await this.http
        .get<MemberInterface[]>(`${MemberService.URL}`)
        .toPromise();
      await this.storage.set(MemberService.STORAGE_KEY, this.cache);
    } catch (exception) {
      this.cache = await this.storage.get(MemberService.STORAGE_KEY);
    }

    return this.cache;
  }

  public async teachAll(force: boolean = false): Promise<MemberInterface[]> {
    await this.checkCache(force);

    return this.cache.filter((m: MemberInterface) => m.lehrberuf);
  }

  public async grouped(
    force: boolean = false
  ): Promise<MemberGroupInterface[]> {
    await this.checkCache(force);

    return from(this.cache)
      .pipe(
        groupBy((m: MemberInterface) => m.branche),
        mergeMap((group) =>
          zip(
            of(group.key),
            group.pipe(
              toArray(),
              map((ml: MemberInterface[]) => ml.sort(this.memberSortFunction))
            ),
            (key: string, result: MemberInterface[]) =>
              ({ category: key, member: result } as MemberGroupInterface)
          )
        ),
        toArray(),
        map((mg: MemberGroupInterface[]) =>
          mg.sort(this.memberGroupSortFunction)
        )
      )
      .toPromise();
  }

  public async teachGrouped(
    force: boolean = false
  ): Promise<MemberGroupInterface[]> {
    const member = await this.teachAll(force);

    return from(member)
      .pipe(
        switchMap((m) =>
          of(m.lehrberuf.split(",")).pipe(
            flatMap((job: string[]) => job),
            map((job: string) => job.trim()),
            map((job: string) => ({ ...m, lehrberuf: job } as MemberInterface))
          )
        ),
        toArray(),
        map((m: MemberInterface[]) => m.sort(this.jobSortFunction)),
        map((m: MemberInterface[]) => [
          { category: "Lehrberuf", member: m } as MemberGroupInterface,
        ])
      )
      .toPromise();
  }

  public async one(id: number): Promise<MemberInterface> {
    if (!this.cache) {
      await this.all();
    }

    return this.cache.find((m: MemberInterface) => +m.id === +id);
  }

  private async checkCache(force: boolean = false): Promise<void> {
    if (!this.cache || force) {
      await this.all(force);
    }
  }

  private jobSortFunction(m1: MemberInterface, m2: MemberInterface): number {
    return m1.lehrberuf.localeCompare(m2.lehrberuf, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }

  private memberSortFunction(m1: MemberInterface, m2: MemberInterface): number {
    return m1.firma.localeCompare(m2.firma, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }

  private memberGroupSortFunction(
    m1: MemberGroupInterface,
    m2: MemberGroupInterface
  ): number {
    return m1.category.localeCompare(m2.category, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  }
}
