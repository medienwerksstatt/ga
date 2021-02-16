import {Injectable} from '@angular/core';
import {ErrorInterface} from '../../../services/error/error.interface';
import {StateListenPluginAbstract} from '../state-listen-plugin-abstract';
import {StateListenPluginInterface} from '../state-listen-plugin.interface';
import {LogService} from '../../../services/log/log.service';
import {StateDispatchEventInterface} from '../../state-dispatch/state-dispatch-event.interface';
import {AppState} from '../../state-dispatch/states/app-state.enum';
import {StateDispatchTypesEnum} from '../../state-dispatch/state-dispatch-types.enum';

@Injectable({
    providedIn: 'root'
})
export class AppErrorListen extends StateListenPluginAbstract implements StateListenPluginInterface {
    constructor(private log: LogService) {
        super();
    }

    public validate(event: StateDispatchEventInterface): boolean {
        return event.type === StateDispatchTypesEnum.APP && event.state === AppState.ERROR;
    }

    public execute(event: StateDispatchEventInterface): void {
        if (!event.params) {
            return;
        }

        const error = event.params as ErrorInterface;
        this.log.error(error.label, error.error);
    }
}
