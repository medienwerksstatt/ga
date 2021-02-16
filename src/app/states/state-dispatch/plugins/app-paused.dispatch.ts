import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {StateDispatchPluginAbstract} from '../state-dispatch-plugin-abstract';
import {StateDispatchPluginInterface} from '../state-dispatch-plugin.interface';
import {StateDispatchTypesEnum} from '../state-dispatch-types.enum';
import {StateDispatchEventInterface} from '../state-dispatch-event.interface';
import {AppState} from '../states/app-state.enum';
import {AppService} from '../../../services/app/app.service';
import {takeUntil} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppPausedDispatch extends StateDispatchPluginAbstract implements StateDispatchPluginInterface {
    protected type: StateDispatchTypesEnum = StateDispatchTypesEnum.APP;

    constructor(private app: AppService) {
        super();
    }

    public create(): BehaviorSubject<StateDispatchEventInterface> {
        this.app.pause()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => this.dispatch(AppState.PAUSE));

        return this.dispatcher;
    }
}
