import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export class Unsubscribeable implements OnDestroy {

    protected readonly ngUnsubscribe: Subject<any> = new Subject();

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
