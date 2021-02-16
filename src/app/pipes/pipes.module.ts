import {NgModule} from '@angular/core';
import {SearchByPipe} from './search-by/search-by.pipe';
import {StripTagsPipe} from './strip-tags/strip-tags.pipe';
import { NiceUrlPipe } from './nice-url/nice-url.pipe';

@NgModule({
    declarations: [SearchByPipe, StripTagsPipe, NiceUrlPipe],
    imports: [],
    exports: [SearchByPipe, StripTagsPipe, NiceUrlPipe]
})
export class PipesModule {
}
