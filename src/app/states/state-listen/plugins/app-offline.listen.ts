import {Injectable} from '@angular/core';
import {StateListenPluginAbstract} from '../state-listen-plugin-abstract';
import {StateListenPluginInterface} from '../state-listen-plugin.interface';
import {StateDispatchEventInterface} from '../../state-dispatch/state-dispatch-event.interface';
import {AppState} from '../../state-dispatch/states/app-state.enum';
import {StateDispatchTypesEnum} from '../../state-dispatch/state-dispatch-types.enum';
import {AlertController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AppOfflineListen extends StateListenPluginAbstract implements StateListenPluginInterface {
    constructor(private alertCtrl: AlertController) {
        super();
    }

    public validate(event: StateDispatchEventInterface): boolean {
        return event.type === StateDispatchTypesEnum.APP && event.state === AppState.OFFLINE;
    }

    public async execute(event: StateDispatchEventInterface): Promise<void> {
        const alert = await this.alertCtrl.create({
            header: 'Sie sind offline',
            message: 'Gewisse Funktionen sind eingeschränkt oder stehen im Offline-Modus nicht zur Verfügung.',
            buttons: [{
                text: 'OK',
            }]
        });

        await alert.present();
    }
}
