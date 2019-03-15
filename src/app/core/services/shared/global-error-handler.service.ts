import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "@env/environment";
import { NGXLogger } from "ngx-logger";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
	constructor(private injector: Injector, private logger: NGXLogger) {}

	handleError(error: any): void {
		if (!(error instanceof HttpErrorResponse)) {
			if (navigator.onLine && environment.production) {
				this.logger.error(error);
				const router = this.injector.get(Router);
				router.navigate(["/error"], { queryParams: { error: error } });
			} else {
				const router = this.injector.get(Router);
				this.logger.error(error);
				router.navigate(["/error"], { queryParams: { error: error } });
			}
		}
	}
}
