import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private launchedObserver: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor(private platform: Platform) {
    }

    public launched(): Observable<boolean> {
        return this.launchedObserver.asObservable();
    }

    public ready(): Promise<string> {
        return this.platform.ready();
    }

    public resume(): Observable<void> {
        return this.platform.resume.asObservable();
    }

    public pause(): Observable<void> {
        return this.platform.pause.asObservable();
    }
}
