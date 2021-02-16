import {ArticleMediaInterface} from './article.media.interface';

export interface ArticleInterface {
    id: number;
    date: string;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    categories: number[];
    featured_media: number;
    _embedded?: { 'wp:featuredmedia'?: ArticleMediaInterface[] };
}
