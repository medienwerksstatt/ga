import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {LogService} from '../../services/log/log.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ArticleInterface} from '../../services/article/article.interface';
import {ArticleService} from '../../services/article/article.service';
import {Offlineable} from '../../traits/offlineable';
import {ConnectionService} from '../../services/connection/connection.service';

@Component({
    selector: 'app-article',
    templateUrl: 'article.page.html',
    styleUrls: ['article.page.scss']
})
export class ArticlePage extends Offlineable implements OnInit {
    public article: ArticleInterface;

    constructor(private navCtrl: NavController,
                private articleService: ArticleService,
                private logService: LogService,
                private route: ActivatedRoute,
                connection: ConnectionService) {
        super(connection);
    }

    public ngOnInit(): void {
        this.route.paramMap
            .pipe(switchMap((params: ParamMap) => this.loadArticle(+params.get('id'))))
            .subscribe();
    }

    public back(): void {
        this.navCtrl.pop();
    }

    private async loadArticle(id: number): Promise<void> {
        try {
            this.article = await this.articleService.one(id);
        } catch (e) {
            this.logService.error('ArticlePage.loadArticle()', e);
        }
    }
}
