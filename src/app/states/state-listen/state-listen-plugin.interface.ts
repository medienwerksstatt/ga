import {StateDispatchEventInterface} from '../state-dispatch/state-dispatch-event.interface';

export interface StateListenPluginInterface {
    validate(event: StateDispatchEventInterface): boolean;

    execute(event: StateDispatchEventInterface): void;
}
