import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

import {MemberPage} from './member.page';
import {PipesModule} from '../../pipes/pipes.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PipesModule,
        FontAwesomeModule,
        RouterModule.forChild([
            {
                path: '',
                component: MemberPage
            }
        ])
    ],
    declarations: [MemberPage]
})
export class MemberPageModule {
}
