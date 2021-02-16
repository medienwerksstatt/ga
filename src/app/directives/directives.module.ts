import {NgModule} from '@angular/core';
import { WordpressContentDirective } from './wordpress-content/wordpress-content.directive';

@NgModule({
    declarations: [WordpressContentDirective],
    imports: [],
    exports: [WordpressContentDirective]
})
export class DirectivesModule {
}
