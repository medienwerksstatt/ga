import { Component, OnInit } from "@angular/core";
import { LogService } from "../../services/log/log.service";
import { of } from "rxjs";
import { delay, switchMap } from "rxjs/operators";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { EnvironmentInterface } from "../../../environments/environment.interface";
import { GalleryInterface } from "../../services/gallery/gallery.interface";
import { environment } from "../../../environments/environment.prod";
import { GalleryService } from "../../services/gallery/gallery.service";

@Component({
  selector: "app-album",
  templateUrl: "./album.page.html",
  styleUrls: ["./album.page.scss"],
})
export class AlbumPage implements OnInit {
  public environment: EnvironmentInterface = environment;

  public gallery: GalleryInterface;
  public loadingImages: Array<any> = new Array(15);

  constructor(
    private logService: LogService,
    private galleryService: GalleryService,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.loadImages(+params.get("id"))))
      .subscribe();
  }

  private async loadImages(id: number): Promise<void> {
    this.gallery = undefined;

    try {
      this.gallery = await this.galleryService.one(id);
    } catch (e) {
      this.logService.error("AlbumPage.loadImages()", e);
    }
  }
}
