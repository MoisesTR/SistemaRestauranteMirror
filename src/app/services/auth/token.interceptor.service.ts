import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

    constructor(public auth: AuthService,  public router: Router, public logger: NGXLogger) {}
    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });

        this.logger.log(request.url);
        return next.handle(request).pipe(
            tap(
                (response: HttpEvent<any>) => {},
                (err: any) => {

                    if (err instanceof HttpErrorResponse) {

                        if (err.status === 401) {
                            this.auth.logout();
                        }
                    }
                }
            )
        );
    }
}
