import {Unsubscribeable} from '../../traits/unsubscribeable';
import {StateDispatchTypesEnum} from './state-dispatch-types.enum';
import {StateDispatchEventInterface} from './state-dispatch-event.interface';
import {BehaviorSubject} from 'rxjs';

export abstract class StateDispatchPluginAbstract extends Unsubscribeable {
    protected abstract type: StateDispatchTypesEnum;
    protected dispatcher: BehaviorSubject<StateDispatchEventInterface> = new BehaviorSubject(<StateDispatchEventInterface>{});

    protected dispatch(state: any, params?: any): void {
        this.dispatcher.next({type: this.type, state, params} as StateDispatchEventInterface);
    }
}
