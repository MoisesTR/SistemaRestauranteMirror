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
import {UNAUTHORIZED} from "http-status-codes";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
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

		this.logger.log(request);
		return next.handle(request)
            .pipe(
			tap(
				(response: HttpEvent<any>) => {
				    console.log(response)
                },
				(err: any) => {
					let errorMessage = "";
					if (err instanceof HttpErrorResponse) {
                        errorMessage = Utils.msgError(err)
                            ? Utils.msgError(err)
                            : `Error Code: ${err.status}\nMessage: ${err.message}`;

						if (err.status === UNAUTHORIZED) {
							this.auth.logout();
						}

						if (this.spinnerService.status.value) this.spinnerService.display(false);

						Utils.showMsgError(String(errorMessage), "Ops... Ha ocurrido un error!");

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
