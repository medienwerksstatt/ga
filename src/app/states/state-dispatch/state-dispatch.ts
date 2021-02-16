import {Injectable} from '@angular/core';
import {StateDispatchPluginInterface} from './state-dispatch-plugin.interface';
import {StateDispatchEventInterface} from './state-dispatch-event.interface';
import {Unsubscribeable} from '../../traits/unsubscribeable';
import {takeUntil} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StateDispatch extends Unsubscribeable {
    private pluginRegister: StateDispatchPluginInterface[] = [];

    protected dispatcher: BehaviorSubject<StateDispatchEventInterface> = new BehaviorSubject({} as StateDispatchEventInterface);

    public register(plugin: StateDispatchPluginInterface): void {
        this.pluginRegister = this.pluginRegister.concat(plugin);
    }

    public initialize(): BehaviorSubject<StateDispatchEventInterface> {
        return this.dispatcher;
    }

    public start(): void {
        for (const plugin of this.pluginRegister) {
            plugin.create()
                .pipe(takeUntil(this.ngUnsubscribe))
                .subscribe((event: StateDispatchEventInterface) => this.dispatcher.next(event));
        }
    }
}
