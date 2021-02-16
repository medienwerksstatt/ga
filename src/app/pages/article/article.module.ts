import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {ArticlePage} from './article.page';
import {AgmCoreModule} from '@agm/core';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DirectivesModule,
        RouterModule.forChild([
            {
                path: '',
                component: ArticlePage
            }
        ])
    ],
    declarations: [ArticlePage]
})
export class ArticlePageModule {
}
