import {Component} from '@angular/core';
import {StateListenFactory} from './states/state-listen/state-listen-factory';
import {StateDispatchFactory} from './states/state-dispatch/state-dispatch-factory';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(private stateListener: StateListenFactory,
                private stateDispatcher: StateDispatchFactory) {
        this.stateListener.create(this.stateDispatcher.create());
        this.stateDispatcher.start();
    }
}
