import {Injectable} from '@angular/core';
import {StateListenPluginInterface} from './state-listen-plugin.interface';
import {BehaviorSubject} from 'rxjs';
import {StateDispatchEventInterface} from '../state-dispatch/state-dispatch-event.interface';
import {Unsubscribeable} from '../../traits/unsubscribeable';
import {takeUntil} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StateListen extends Unsubscribeable {
    private pluginRegister: StateListenPluginInterface[] = [];

    public register(plugin: StateListenPluginInterface): void {
        this.pluginRegister = this.pluginRegister.concat(plugin);
    }

    public initialize(observer: BehaviorSubject<StateDispatchEventInterface>): void {
        observer
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((event: StateDispatchEventInterface) => {
                for (const plugin of this.pluginRegister) {
                    if (plugin.validate(event)) {
                        plugin.execute(event);
                    }
                }
            });
    }
}
