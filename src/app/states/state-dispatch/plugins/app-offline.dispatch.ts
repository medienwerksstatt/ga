import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {StateDispatchPluginAbstract} from '../state-dispatch-plugin-abstract';
import {StateDispatchPluginInterface} from '../state-dispatch-plugin.interface';
import {StateDispatchTypesEnum} from '../state-dispatch-types.enum';
import {AppState} from '../states/app-state.enum';
import {StateDispatchEventInterface} from '../state-dispatch-event.interface';
import {ConnectionService} from '../../../services/connection/connection.service';

@Injectable({
    providedIn: 'root'
})
export class AppOfflineDispatch extends StateDispatchPluginAbstract implements StateDispatchPluginInterface {
    protected type: StateDispatchTypesEnum = StateDispatchTypesEnum.APP;

    constructor(private connection: ConnectionService) {
        super();
    }

    public create(): BehaviorSubject<StateDispatchEventInterface> {
        this.connection.offline()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((offline: boolean) => offline ? this.dispatch(AppState.OFFLINE) : undefined);

        return this.dispatcher;
    }
}
