import {GalleryImageInterface} from './gallery.image.interface';

export interface GalleryInterface {
    id: number;
    title: string;
    path: string;
    preview: GalleryImageInterface;
    images: GalleryImageInterface[];
}
