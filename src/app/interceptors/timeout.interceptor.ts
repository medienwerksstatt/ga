import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {timeout} from 'rxjs/operators';

interface TimeoutInterface {
    path: string;
    timeout: number;
}

@Injectable({
    providedIn: 'root'
})
export class TimeoutInterceptor implements HttpInterceptor {
    public static readonly DEFAULT_TIMEOUT: number = 30000;

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.method.toLowerCase() === 'options') {
            return next.handle(request);
        }

        return next.handle(request).pipe(timeout(TimeoutInterceptor.DEFAULT_TIMEOUT));
    }
}
