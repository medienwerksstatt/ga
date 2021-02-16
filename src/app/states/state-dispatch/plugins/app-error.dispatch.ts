import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {StateDispatchPluginAbstract} from '../state-dispatch-plugin-abstract';
import {StateDispatchPluginInterface} from '../state-dispatch-plugin.interface';
import {StateDispatchTypesEnum} from '../state-dispatch-types.enum';
import {AppState} from '../states/app-state.enum';
import {StateDispatchEventInterface} from '../state-dispatch-event.interface';
import {ErrorService} from '../../../services/error/error.service';
import {ErrorInterface} from '../../../services/error/error.interface';

@Injectable({
    providedIn: 'root'
})
export class AppErrorDispatch extends StateDispatchPluginAbstract implements StateDispatchPluginInterface {
    protected type: StateDispatchTypesEnum = StateDispatchTypesEnum.APP;

    constructor(private errors: ErrorService) {
        super();
    }

    public create(): BehaviorSubject<StateDispatchEventInterface> {
        this.errors.watch()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((error: ErrorInterface) => this.dispatch(AppState.ERROR, error));

        return this.dispatcher;
    }
}
