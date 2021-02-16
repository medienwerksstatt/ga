import { Component, OnInit } from "@angular/core";
import { LogService } from "../../services/log/log.service";
import { GalleryService } from "../../services/gallery/gallery.service";
import { EnvironmentInterface } from "../../../environments/environment.interface";
import { environment } from "../../../environments/environment.prod";
import { GalleryInterface } from "../../services/gallery/gallery.interface";
import { Offlineable } from "../../traits/offlineable";
import { ConnectionService } from "../../services/connection/connection.service";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.page.html",
  styleUrls: ["./gallery.page.scss"],
})
export class GalleryPage extends Offlineable implements OnInit {
  public environment: EnvironmentInterface = environment;

  public galleries: GalleryInterface[];
  public loadingGalleries: Array<any> = new Array(15);

  constructor(
    private galleryService: GalleryService,
    private logService: LogService,
    connection: ConnectionService
  ) {
    super(connection);
  }

  public doRefresh(event: any): void {
    this.loadGalleries(event, true);
  }

  public ngOnInit(): void {
    this.loadGalleries();
  }

  private async loadGalleries(
    event?: any,
    force: boolean = false
  ): Promise<void> {
    this.galleries = undefined;

    try {
      this.galleries = (await this.galleryService.all(force)) || [];
    } catch (e) {
      this.logService.error("GalleryPage.loadGalleries()", e);
      this.galleries = [];
    }

    if (event) {
      event.target.complete();
    }
  }
}
