import {BehaviorSubject} from 'rxjs';
import {StateDispatchEventInterface} from './state-dispatch-event.interface';

export interface StateDispatchPluginInterface {
    create(): BehaviorSubject<StateDispatchEventInterface>;
}
