import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { NGXLogger } from "ngx-logger";
import { throwError } from "rxjs";
import { Utils } from "@app/components/Utils";
import { SpinnerService } from "@app/core/service.index";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
	constructor(
		public auth: AuthService,
		public spinnerService: SpinnerService,
		public router: Router,
		public logger: NGXLogger
	) {}
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.auth.getToken()}`
			}
		});

		// this.logger.log(request);
		return next.handle(request).pipe(
			tap(
				(response: HttpEvent<any>) => {},
				(err: any) => {
					let errorMessage = "";
					if (err instanceof HttpErrorResponse) {
						if (err.error instanceof ErrorEvent) {
							// client-side error
							errorMessage = `Error: ${err.error.message}`;
						} else {
							// server-side error
                            errorMessage = Utils.msgError(err) ? Utils.msgError(err) : `Error Code: ${err.status}\nMessage: ${err.message}`;
							if (err.status === 401) {
								this.auth.logout();
							}
						}
						if (this.spinnerService.status) this.spinnerService.display(false);
						Utils.showMsgError(errorMessage, "Ops... Ha ocurrido un error!");
						return throwError(errorMessage);
					}
				}
			)
		);
	}
}
