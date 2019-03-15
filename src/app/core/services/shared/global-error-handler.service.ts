import { ErrorHandler, Injectable, Injector } from "@angular/core";
import * as Sentry from "@sentry/browser";
import { Router } from "@angular/router";
import { environment } from "@env/environment";
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
	constructor(private injector: Injector, private logger: NGXLogger) {}

	handleError(error: any): void {
		if (navigator.onLine && environment.production) {
			Sentry.captureException(error.originalError || error);
			this.logger.error(error.originalError);
			const router = this.injector.get(Router);
			router.navigate(["/error"], { queryParams: { error: error } });

		} else {
			const router = this.injector.get(Router);
            this.logger.error(error);
			router.navigate(["/error"], { queryParams: { error: error } });
		}
	}
}
