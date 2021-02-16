import {Injectable} from '@angular/core';
import {StateListenPluginInterface} from '../state-listen-plugin.interface';
import {StateDispatchEventInterface} from '../../state-dispatch/state-dispatch-event.interface';
import {StateDispatchTypesEnum} from '../../state-dispatch/state-dispatch-types.enum';
import {StateListenPluginAbstract} from '../state-listen-plugin-abstract';
import {AppState} from '../../state-dispatch/states/app-state.enum';
import {LogService} from '../../../services/log/log.service';

@Injectable({
    providedIn: 'root'
})
export class AppResumedListen extends StateListenPluginAbstract implements StateListenPluginInterface {
    constructor(private log: LogService) {
        super();
    }

    public validate(event: StateDispatchEventInterface): boolean {
        return event.type === StateDispatchTypesEnum.APP && event.state === AppState.RESUME;
    }

    public execute(event: StateDispatchEventInterface): void {
        this.log.log('APP.RESUME');
    }
}
