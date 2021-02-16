import {NgModule} from '@angular/core';
import {MenuComponent} from './menu/menu.component';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        RouterModule,
        FontAwesomeModule,
    ],
    exports: [MenuComponent],
    declarations: [MenuComponent]
})
export class ComponentsModule {
}
