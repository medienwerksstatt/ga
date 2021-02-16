import {Injectable} from '@angular/core';
import {StateListenPluginInterface} from '../state-listen-plugin.interface';
import {StateDispatchEventInterface} from '../../state-dispatch/state-dispatch-event.interface';
import {StateDispatchTypesEnum} from '../../state-dispatch/state-dispatch-types.enum';
import {StateListenPluginAbstract} from '../state-listen-plugin-abstract';
import {AppState} from '../../state-dispatch/states/app-state.enum';
import {LogService} from '../../../services/log/log.service';
import {StatusBarService} from '../../../services/status-bar/status-bar.service';

@Injectable({
    providedIn: 'root'
})
export class AppReadyListen extends StateListenPluginAbstract implements StateListenPluginInterface {
    constructor(private log: LogService,
                private statusBar: StatusBarService) {
        super();
    }

    public validate(event: StateDispatchEventInterface): boolean {
        return event.type === StateDispatchTypesEnum.APP && event.state === AppState.READY;
    }

    public execute(event: StateDispatchEventInterface): void {
        this.log.log('APP.READY');
        this.statusBar.primary();
    }
}
