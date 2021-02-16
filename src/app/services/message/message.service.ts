import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {takeUntil} from 'rxjs/operators';
import {OneSignal, OSNotification, OSNotificationOpenedResult} from '@ionic-native/onesignal/ngx';
import {Unsubscribeable} from '../../traits/unsubscribeable';
import {BehaviorSubject, Observable} from 'rxjs';
import {MessageInterface} from './message.interface';

@Injectable({
    providedIn: 'root'
})
export class MessageService extends Unsubscribeable {
    private messageOpened: BehaviorSubject<MessageInterface> = new BehaviorSubject<MessageInterface>(undefined);
    private messageReceived: BehaviorSubject<MessageInterface> = new BehaviorSubject<MessageInterface>(undefined);

    constructor(private oneSignal: OneSignal) {
        super();
    }

    public init(): void {
        this.oneSignal.setLocationShared(false);

        this.oneSignal.startInit(environment.oneSignalAppId, environment.googleProjectNumber);

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

        this.oneSignal.handleNotificationReceived()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((notification: OSNotification) => {
                this.messageReceived.next({...notification, opened: false} as MessageInterface);
            });

        this.oneSignal.handleNotificationOpened()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((result: OSNotificationOpenedResult) => {
                this.messageOpened.next({...result.notification, opened: true} as MessageInterface);
            });

        this.oneSignal.endInit();
    }

    public opened(): Observable<MessageInterface> {
        return this.messageOpened.asObservable();
    }

    public received(): Observable<MessageInterface> {
        return this.messageReceived.asObservable();
    }
}
