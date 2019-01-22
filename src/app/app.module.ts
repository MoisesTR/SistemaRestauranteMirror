import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ErrorHandler, Injectable, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { NotFound404Component } from "./components/not-found-404/not-found-404.component";
import { MDBBootstrapModulesPro, ToastModule } from "ng-uikit-pro-standard";
import { CoreModule } from "./core/core.module";
import { MenuComponent } from "./components/menu/menu.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoggerModule, NGXLogger, NgxLoggerLevel } from "ngx-logger";
import { SettingsRestauranteComponent } from "./components/settings-restaurante/settings-restaurante.component";
import * as Sentry from "@sentry/browser";

Sentry.init({
	dsn: "https://c7dd0e241bb548dd919a4e7edd1d3422@sentry.io/1376101"
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
	constructor(private logger: NGXLogger) {}
	handleError(error) {
		if (navigator.onLine) {
			Sentry.captureException(error.originalError || error);
			throw error;
		} else {
			this.logger.error(error.originalError || error);
			throw error;
		}
	}
}

@NgModule({
	declarations: [AppComponent, LoginComponent, MenuComponent, NotFound404Component, SettingsRestauranteComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CoreModule,
		AppRoutingModule,
		MDBBootstrapModulesPro.forRoot(),
		ToastModule.forRoot({
			maxOpened: 1,
			timeOut: 2000,
			preventDuplicates: true
		}),
		LoggerModule.forRoot({ level: NgxLoggerLevel.DEBUG })
	],
	schemas: [NO_ERRORS_SCHEMA],
	providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
	bootstrap: [AppComponent]
})
export class AppModule {}
