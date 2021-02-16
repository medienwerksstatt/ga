import {ArticleMediaSizesInterface} from './article.media.sizes.interface';

export interface ArticleMediaInterface {
    id: number;
    media_details: {
        width: number,
        height: number,
        file: string,
        sizes: {
            thumbnail: ArticleMediaSizesInterface,
            'post-thumbnail': ArticleMediaSizesInterface,
            full: ArticleMediaSizesInterface,
            large: ArticleMediaSizesInterface,
            medium: ArticleMediaSizesInterface,
            medium_large: ArticleMediaSizesInterface,
            'large-feature': ArticleMediaSizesInterface
            'small-feature': ArticleMediaSizesInterface
        },
    };
    source_url: string;
}
