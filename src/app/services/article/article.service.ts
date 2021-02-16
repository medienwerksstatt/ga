import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ArticleInterface } from "./article.interface";
import { environment } from "../../../environments/environment.prod";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class ArticleService {
  private static readonly STORAGE_KEY = "ARTICLE";

  private static readonly URL = `${environment.apiUrl}/posts?_embed&news_per_page`;
  private cache: ArticleInterface[];

  constructor(private http: HttpClient, private storage: Storage) {}

  public async all(force: boolean = false): Promise<ArticleInterface[]> {
    if (this.cache && !force) {
      return this.cache;
    }

    try {
      this.cache = await this.http
        .get<ArticleInterface[]>(`${ArticleService.URL}`)
        .toPromise();
      await this.storage.set(ArticleService.STORAGE_KEY, this.cache);
    } catch (exception) {
      this.cache = await this.storage.get(ArticleService.STORAGE_KEY);
    }
    return this.cache;
  }

  public async one(id: number): Promise<ArticleInterface> {
    if (!this.cache) {
      await this.all();
    }

    return this.cache.find((m: ArticleInterface) => +m.id === +id);
  }

  public async category(
    id: number,
    force: boolean = false
  ): Promise<ArticleInterface[]> {
    if (!this.cache || force) {
      await this.all(force);
    }

    return this.cache.filter((m: ArticleInterface) =>
      m.categories.find((n) => +n === +id)
    );
  }
}
