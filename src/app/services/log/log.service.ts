import {Injectable} from '@angular/core';
import {takeUntil} from 'rxjs/operators';
import {Unsubscribeable} from '../../traits/unsubscribeable';
import {environment} from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LogService extends Unsubscribeable {
    private debug: boolean = !environment.production;

    public error(message, params?): void {
        if (!this.debug) {
            return;
        }

        console.error(message, params);
    }

    public log(message, params?): void {
        if (!this.debug) {
            return;
        }

        console.log(message, params);
    }

    public warn(message, params?): void {
        if (!this.debug) {
            return;
        }

        console.warn(message, params);
    }
}
