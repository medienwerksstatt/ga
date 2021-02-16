import {Injectable} from '@angular/core';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Platform} from '@ionic/angular';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StatusBarService {
    constructor(private statusBar: StatusBar,
                private platform: Platform) {
    }

    public async primary(): Promise<void> {
        await this.platform.ready();
        this.statusBar.backgroundColorByHexString(environment.primaryColor);
    }

    public async secondary(): Promise<void> {
        await this.platform.ready();
        this.statusBar.backgroundColorByHexString(environment.secondaryColor);
    }
}
