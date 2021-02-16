import {Unsubscribeable} from './unsubscribeable';
import {ConnectionService} from '../services/connection/connection.service';
import {takeUntil} from 'rxjs/operators';

export class Offlineable extends Unsubscribeable {
    public isOffline = false;

    constructor(private connection: ConnectionService) {
        super();

        this.connection.offline()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((isOffline: boolean) => this.isOffline = isOffline);
    }
}
