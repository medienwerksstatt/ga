import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StateDispatchEventInterface} from '../state-dispatch/state-dispatch-event.interface';
import {StateListen} from './state-listen';
import {AppResumedListen} from './plugins/app-resumed.listen';
import {AppReadyListen} from './plugins/app-ready.listen';
import {AppErrorListen} from './plugins/app-error.listen';
import {AppLaunchedListen} from './plugins/app-launched.listen';
import {AppPausedListen} from './plugins/app-paused.listen';
import {AppReadyMessageInitListen} from './plugins/app-ready-message-init.listen';
import {MessageOpenedListen} from './plugins/message-opened.listen';
import {MessageReceivedListen} from './plugins/message-received.listen';
import {AppOfflineListen} from './plugins/app-offline.listen';
import {CacheWarmupListen} from './plugins/cache-warmup.listen';

@Injectable({
    providedIn: 'root'
})
export class StateListenFactory {
    constructor(private stateListen: StateListen,
                private platformReady: AppReadyListen,
                private messageInit: AppReadyMessageInitListen,
                private messageOpened: MessageOpenedListen,
                private messageReceived: MessageReceivedListen,
                private appOffline: AppOfflineListen,
                private cacheWarmup: CacheWarmupListen,
                private appError: AppErrorListen,
                private appLaunched: AppLaunchedListen,
                private appPaused: AppPausedListen,
                private appResumed: AppResumedListen) {
    }

    public create(observer: BehaviorSubject<StateDispatchEventInterface>): void {
        this.stateListen.register(this.appLaunched);
        this.stateListen.register(this.platformReady);
        this.stateListen.register(this.appError);
        this.stateListen.register(this.appResumed);
        this.stateListen.register(this.appPaused);
        this.stateListen.register(this.appOffline);
        this.stateListen.register(this.cacheWarmup);
        this.stateListen.register(this.messageInit);
        this.stateListen.register(this.messageOpened);
        this.stateListen.register(this.messageReceived);
        this.stateListen.initialize(observer);
    }
}

