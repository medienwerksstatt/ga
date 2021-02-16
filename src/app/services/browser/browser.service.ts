import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {BehaviorSubject, Observable} from 'rxjs';
import {InAppBrowser, InAppBrowserObject, InAppBrowserOptions} from '@ionic-native/in-app-browser/ngx';

@Injectable({
    providedIn: 'root'
})
export class BrowserService {
    private launchedObserver: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor(private iab: InAppBrowser) {
    }

    public open(url): InAppBrowserObject {
        return this.iab.create(url, '_blank', {
            location: 'no',
            closebuttoncaption: 'Zurück',
            closebuttoncolor: '#ffffff',
            toolbarcolor: '#e30045',
            footercolor: '#e30045',
            hidenavigationbuttons: 'yes',
            footer: 'yes',
            hideurlbar: 'yes',
        } as InAppBrowserOptions);
    }
}
