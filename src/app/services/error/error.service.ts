import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ErrorInterface} from './error.interface';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private errors: BehaviorSubject<ErrorInterface> = new BehaviorSubject<ErrorInterface>(undefined);

    public add(error: ErrorInterface): void {
        this.errors.next(error);
    }

    public get(): Promise<ErrorInterface> {
        return this.errors.asObservable().toPromise();
    }

    public watch(): Observable<ErrorInterface> {
        return this.errors.asObservable();
    }
}
