import {Injectable} from '@angular/core';
import {StateListenPluginInterface} from '../state-listen-plugin.interface';
import {StateDispatchEventInterface} from '../../state-dispatch/state-dispatch-event.interface';
import {StateDispatchTypesEnum} from '../../state-dispatch/state-dispatch-types.enum';
import {StateListenPluginAbstract} from '../state-listen-plugin-abstract';
import {LogService} from '../../../services/log/log.service';
import {MessageState} from '../../state-dispatch/states/message-state.enum';
import {MessageInterface} from '../../../services/message/message.interface';

@Injectable({
    providedIn: 'root'
})
export class MessageOpenedListen extends StateListenPluginAbstract implements StateListenPluginInterface {
    constructor(private log: LogService) {
        super();
    }

    public validate(event: StateDispatchEventInterface): boolean {
        return event.type === StateDispatchTypesEnum.MESSAGE && event.state === MessageState.OPENED;
    }

    public execute(event: StateDispatchEventInterface): void {
        this.log.log('MessageOpenedListen.execute()', event.params as MessageInterface);
    }
}
