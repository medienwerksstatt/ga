import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {PipesModule} from '../../pipes/pipes.module';
import {CategoryPage} from './category.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
        RouterModule.forChild([
            {
                path: '',
                component: CategoryPage
            }
        ])
    ],
    declarations: [CategoryPage]
})
export class CategoryPageModule {
}
