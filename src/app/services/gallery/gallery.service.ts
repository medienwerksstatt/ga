import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment.prod";
import { GalleryInterface } from "./gallery.interface";
import { forkJoin } from "rxjs";
import { map, switchMap, toArray } from "rxjs/operators";
import { ApiGalleryInterface } from "./api.gallery.interface";
import { ApiImageInterface } from "./api.image.interface";
import { GalleryImageInterface } from "./gallery.image.interface";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class GalleryService {
  private static readonly STORAGE_KEY = "GALLERY";

  private static readonly GALLERY_URL = `${environment.apiUrl}/fotos/gallerien`;
  private static readonly IMAGE_URL = `${environment.apiUrl}/fotos/gallerien/bilder`;
  private cache: GalleryInterface[];

  constructor(private http: HttpClient, private storage: Storage) {}

  public async all(force: boolean = false): Promise<GalleryInterface[]> {
    if (this.cache && !force) {
      return this.cache;
    }

    try {
      this.cache = await forkJoin([
        this.http.get<ApiGalleryInterface[]>(`${GalleryService.GALLERY_URL}`),
        this.http.get<ApiImageInterface[]>(`${GalleryService.IMAGE_URL}`),
      ])
        .pipe(
          switchMap(
            (result: { 0: ApiGalleryInterface[]; 1: ApiImageInterface[] }) =>
              this.combine(result)
          ),
          toArray(),
          map((g: GalleryInterface[]) => g.sort(this.gallerySortFunction))
        )
        .toPromise();
      await this.storage.set(GalleryService.STORAGE_KEY, this.cache);
    } catch (exception) {
      this.cache = await this.storage.get(GalleryService.STORAGE_KEY);
    }

    return this.cache;
  }

  public async one(id: number): Promise<GalleryInterface> {
    await this.all();

    return this.cache.find((g: GalleryInterface) => +g.id === +id);
  }

  private combine(result: {
    0: ApiGalleryInterface[];
    1: ApiImageInterface[];
  }): GalleryInterface[] {
    const apiGalleries = result[0];
    const apiImages = result[1];
    const gallery: GalleryInterface[] = [];

    for (const apiGallery of apiGalleries) {
      gallery.push({
        id: apiGallery.gid,
        title: apiGallery.title,
        path: apiGallery.path,
        preview: this.mapImage(
          apiImages.find(
            (i: ApiImageInterface) => +i.pid === +apiGallery.previewpic
          )
        ),
        images: apiImages
          .filter((i: ApiImageInterface) => +i.galleryid === +apiGallery.gid)
          .map(this.mapImage),
      } as GalleryInterface);
    }

    return gallery;
  }

  private mapImage(apiImage: ApiImageInterface): GalleryImageInterface {
    if (!apiImage) {
      return;
    }

    return {
      id: apiImage.pid,
      filename: apiImage.filename,
    } as GalleryImageInterface;
  }

  private gallerySortFunction(
    g1: GalleryInterface,
    g2: GalleryInterface
  ): number {
    if (g1.id > g2.id) {
      return -1;
    }

    if (g2.id > g1.id) {
      return 1;
    }

    return 0;
  }
}
