import {StateDispatchTypesEnum} from './state-dispatch-types.enum';
import {AppState} from './states/app-state.enum';
import {MessageState} from './states/message-state.enum';

export interface StateDispatchEventInterface {
    type: StateDispatchTypesEnum;
    state: AppState | MessageState;
    params: any;
}
