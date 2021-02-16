import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log/log.service';
import {ArticleService} from '../../services/article/article.service';
import {ArticleInterface} from '../../services/article/article.interface';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {CategoryInterface} from '../../services/category/category.interface';
import {CategoryService} from '../../services/category/category.service';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {Platform} from '@ionic/angular';
import {Offlineable} from '../../traits/offlineable';
import {ConnectionService} from '../../services/connection/connection.service';

@Component({
    selector: 'app-category',
    templateUrl: 'category.page.html',
    styleUrls: ['category.page.scss'],
})
export class CategoryPage extends Offlineable implements OnInit {
    private static readonly HOME_CATEGORY: number = 1;
    private static readonly BUTTON_CATEGORY: number = 13;

    public category: CategoryInterface;
    public articles: ArticleInterface[];
    public buttons: ArticleInterface[];
    public loadingArticles: Array<any> = new Array(3);

    constructor(private articleService: ArticleService,
                private categoryService: CategoryService,
                private route: ActivatedRoute,
                private platform: Platform,
                private splashScreen: SplashScreen,
                private logService: LogService,
                connection: ConnectionService) {
        super(connection);
    }

    public doRefresh(event: any): void {
        this.loadArticles(event, true);
    }

    public ngOnInit(): void {
        this.route.paramMap
            .pipe(switchMap((params: ParamMap) => this.init(+params.get('id'))))
            .subscribe();
    }

    private async init(categoryId: number): Promise<void> {
        this.category = await this.categoryService.get(categoryId);
        this.loadArticles();
    }

    private async loadArticles(event?: any, force: boolean = false): Promise<void> {
        this.articles = undefined;

        try {
            this.articles = await this.articleService.category(this.category.id, force) || [];

            if (this.category.id === CategoryPage.HOME_CATEGORY) {
                this.buttons = await this.articleService.category(CategoryPage.BUTTON_CATEGORY);
            }

            await this.platform.ready();
            this.splashScreen.hide();
        } catch (e) {
            this.logService.error('CategoryPage.loadArticles()', e);
            this.articles = [];
        }

        if (event) {
            event.target.complete();
        }
    }
}
