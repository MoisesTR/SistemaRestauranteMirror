import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ErrorHandler, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { NotFound404Component } from "./components/not-found-404/not-found-404.component";
import { MDBBootstrapModulesPro, ToastModule } from "ng-uikit-pro-standard";
import { CoreModule } from "./core/core.module";
import { MenuComponent } from "./components/menu/menu.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { SettingsRestauranteComponent } from "./components/settings-restaurante/settings-restaurante.component";
import { BreadcrumbComponent } from "@app/components/breadcrumb/breadcrumb.component";
import { ErrorComponent } from "@app/core/error/error.component";
import { GlobalErrorHandlerService } from "@app/core/services/shared/global-error-handler.service";

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		BreadcrumbComponent,
		MenuComponent,
		NotFound404Component,
		SettingsRestauranteComponent,
		ErrorComponent
	],
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
	providers: [GlobalErrorHandlerService, { provide: ErrorHandler, useClass: GlobalErrorHandlerService }],
	bootstrap: [AppComponent]
})
export class AppModule {}
