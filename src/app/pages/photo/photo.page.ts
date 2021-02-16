import { Component, OnInit } from "@angular/core";
import { LogService } from "../../services/log/log.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { EnvironmentInterface } from "../../../environments/environment.interface";
import { GalleryInterface } from "../../services/gallery/gallery.interface";
import { GalleryService } from "../../services/gallery/gallery.service";
import { environment } from "../../../environments/environment.prod";
import { GalleryImageInterface } from "../../services/gallery/gallery.image.interface";
import { StatusBarService } from "../../services/status-bar/status-bar.service";

@Component({
  selector: "app-photo",
  templateUrl: "./photo.page.html",
  styleUrls: ["./photo.page.scss"],
})
export class PhotoPage implements OnInit {
  public slideOpts: any = {
    initialSlide: 0,
    speed: 400,
    pagination: false,
    breakpointsInverse: true,
    breakpoints: {
      480: {
        slidesPerView: 3,
      },
    },
  };
  public environment: EnvironmentInterface = environment;

  public gallery: GalleryInterface;
  public loadingImages: Array<any> = new Array(15);

  constructor(
    private logService: LogService,
    private galleryService: GalleryService,
    private route: ActivatedRoute,
    private statusBar: StatusBarService
  ) {}

  public ngOnInit(): void {
    this.statusBar.secondary();
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.loadImages(+params.get("id"), +params.get("image"))
        )
      )
      .subscribe();
  }

  public ionViewWillLeave(): void {
    this.statusBar.primary();
  }

  private async loadImages(id: number, image: number): Promise<void> {
    this.gallery = undefined;

    try {
      const gallery = await this.galleryService.one(id);
      this.slideOpts.initialSlide = Math.max(
        gallery.images.findIndex(
          (i: GalleryImageInterface) => +image === +i.id
        ),
        0
      );
      this.gallery = gallery;
    } catch (e) {
      this.logService.error("PhotoPage.loadImages()", e);
    }
  }
}
