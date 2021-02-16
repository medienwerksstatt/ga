import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StateDispatchPluginAbstract} from '../state-dispatch-plugin-abstract';
import {StateDispatchPluginInterface} from '../state-dispatch-plugin.interface';
import {StateDispatchTypesEnum} from '../state-dispatch-types.enum';
import {StateDispatchEventInterface} from '../state-dispatch-event.interface';
import {MessageService} from '../../../services/message/message.service';
import {filter, takeUntil} from 'rxjs/operators';
import {MessageState} from '../states/message-state.enum';

@Injectable({
    providedIn: 'root'
})
export class MessageOpenedDispatch extends StateDispatchPluginAbstract implements StateDispatchPluginInterface {
    protected type: StateDispatchTypesEnum = StateDispatchTypesEnum.MESSAGE;

    constructor(private messageService: MessageService) {
        super();
    }

    public create(): BehaviorSubject<StateDispatchEventInterface> {
        this.messageService.opened()
            .pipe(takeUntil(this.ngUnsubscribe), filter(message => message !== undefined))
            .subscribe((message) => this.dispatch(MessageState.OPENED, message));

        return this.dispatcher;
    }
}
