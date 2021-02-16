import {Injectable} from '@angular/core';
import {StateDispatch} from './state-dispatch';
import {BehaviorSubject} from 'rxjs';
import {StateDispatchEventInterface} from './state-dispatch-event.interface';
import {AppResumedDispatch} from './plugins/app-resumed.dispatch';
import {PlatformReadyDispatch} from './plugins/platform-ready.dispatch';
import {AppErrorDispatch} from './plugins/app-error.dispatch';
import {AppLaunchedDispatch} from './plugins/app-launched.dispatch';
import {AppPausedDispatch} from './plugins/app-paused.dispatch';
import {MessageOpenedDispatch} from './plugins/message-opened.dispatch';
import {MessageReceivedDispatch} from './plugins/message-received.dispatch';
import {AppOfflineDispatch} from './plugins/app-offline.dispatch';

@Injectable({
    providedIn: 'root'
})
export class StateDispatchFactory {
    constructor(private stateDispatcher: StateDispatch,
                private platformReady: PlatformReadyDispatch,
                private messageOpened: MessageOpenedDispatch,
                private messageReceived: MessageReceivedDispatch,
                private appOffline: AppOfflineDispatch,
                private appError: AppErrorDispatch,
                private appLaunched: AppLaunchedDispatch,
                private appPaused: AppPausedDispatch,
                private appResumed: AppResumedDispatch) {
    }

    public create(): BehaviorSubject<StateDispatchEventInterface> {
        this.stateDispatcher.register(this.appLaunched);
        this.stateDispatcher.register(this.platformReady);
        this.stateDispatcher.register(this.messageOpened);
        this.stateDispatcher.register(this.messageReceived);
        this.stateDispatcher.register(this.appResumed);
        this.stateDispatcher.register(this.appPaused);
        this.stateDispatcher.register(this.appError);
        this.stateDispatcher.register(this.appOffline);
        return this.stateDispatcher.initialize();
    }

    public start(): void {
        this.stateDispatcher.start();
    }
}
