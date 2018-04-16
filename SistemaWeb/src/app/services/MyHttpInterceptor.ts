import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor(  private _route: ActivatedRoute,
                  private _router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Before sending data")
        return next.handle(req)
            .retry(3)
            .map(resp => {
                if (resp instanceof HttpResponse) {
                    console.log('Response is ::');
                    console.log(resp.body)
                }
                return resp;
            }).catch(err => {
                //console.log(err);
                if (err instanceof HttpResponse)
                {
                    console.log(err.status);
                    console.log(err.body);
                }

                if(err instanceof HttpErrorResponse) {
                    if(err.status == 0) {
                        this._router.navigate(['/notfound']);
                    }
                }
                return Observable.of(err);
            });

    }
}