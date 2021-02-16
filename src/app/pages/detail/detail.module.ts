import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {DetailPage} from './detail.page';
import {AgmCoreModule} from '@agm/core';
import {PipesModule} from '../../pipes/pipes.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AgmCoreModule,
        PipesModule,
        FontAwesomeModule,
        RouterModule.forChild([
            {
                path: '',
                component: DetailPage
            }
        ])
    ],
    declarations: [DetailPage]
})
export class DetailPageModule {
}
