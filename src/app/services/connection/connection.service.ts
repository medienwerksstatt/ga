import {Injectable} from '@angular/core';
import {Network} from '@ionic-native/network/ngx';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Unsubscribeable} from '../../traits/unsubscribeable';
import {takeUntil} from 'rxjs/operators';
import {Platform} from '@ionic/angular';
import {LogService} from '../log/log.service';

@Injectable({
    providedIn: 'root'
})
export class ConnectionService extends Unsubscribeable {
    protected isOffline = false;
    protected offlineSubject: Subject<boolean> = new BehaviorSubject<boolean>(this.isOffline);
    protected onlineSubject: Subject<boolean> = new BehaviorSubject<boolean>(!this.isOffline);

    constructor(private platform: Platform,
                private network: Network,
                private log: LogService) {
        super();

        this.platform.ready().then(() => this.init());
    }

    private init(): void {
        if (this.network.type) {
            this.initApp();
        } else {
            this.initWeb();
        }
    }

    private initApp(): void {
        if (this.network.type === 'none') {
            this.isOffline = true;
            this.offlineSubject.next(this.isOffline);
            this.onlineSubject.next(!this.isOffline);
        }

        // watch network for a disconnect
        this.network.onDisconnect()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => this.goOffline());

        // watch network for a connection
        this.network.onConnect()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => this.goOnline());
    }

    private initWeb(): void {
        try {
            this.isOffline = !window.navigator.onLine;
            this.offlineSubject.next(this.isOffline);
            this.onlineSubject.next(!this.isOffline);

            window.addEventListener('online', () => this.goOnline());
            window.addEventListener('offline', () => this.goOffline());
        } catch (e) {
            this.log.error('ConnectionService.init()', e);
        }
    }

    public online(): Observable<boolean> {
        return this.onlineSubject.asObservable();
    }

    public offline(): Observable<boolean> {
        return this.offlineSubject.asObservable();
    }

    private goOffline(): void {
        this.isOffline = true;
        this.offlineSubject.next(this.isOffline);
        this.onlineSubject.next(!this.isOffline);
    }

    private goOnline(): void {
        setTimeout(() => {
            this.isOffline = false;
            this.offlineSubject.next(this.isOffline);
            this.onlineSubject.next(!this.isOffline);
        }, 3000);
    }
}
