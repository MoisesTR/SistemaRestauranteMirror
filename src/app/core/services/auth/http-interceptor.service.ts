import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {throwError} from 'rxjs';
import {Utils} from '@app/components/Utils';
import {SpinnerService} from '@app/core/service.index';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
	constructor(public auth: AuthService, public spinnerService: SpinnerService, public router: Router) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.auth.getToken()}`
			}
		});

		return next.handle(request).pipe(
			tap(
				(response: HttpEvent<any>) => {},
				(err: any) => {
					let errorMessage = "";
					if (err instanceof HttpErrorResponse) {
						errorMessage = Utils.msgError(err)
							? Utils.msgError(err)
							: `Error Code: ${err.status}\nMessage: ${err.message}`;


						// TODO REVISAR SI ES NECESARIO CERRAR SESION CUANDO SE GENERE EL CODIGO 401
						// if (err.status === UNAUTHORIZED) {
						// 	this.auth.logout();
						// }

						if (this.spinnerService.status.value) this.spinnerService.display(false);

						Utils.showMsgError(errorMessage, "Ops... Ha ocurrido un error!");

						return throwError(errorMessage);
					}
				},
				() => {
					if (this.spinnerService.status.value) this.spinnerService.display(false);
				}
			)
		);
	}
}
