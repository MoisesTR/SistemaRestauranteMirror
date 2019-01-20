import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { NotFound404Component } from "./components/not-found-404/not-found-404.component";
import { MDBBootstrapModulesPro, ToastModule } from "ng-uikit-pro-standard";
import { CoreModule } from "./core/core.module";
import { MenuComponent } from "./components/menu/menu.component";
import { AppRoutingModule } from "./app-routing.module";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { NgxSpinnerModule } from "ngx-spinner";
import { PipesModule } from "@app/pipe/pipes.module";
import { SettingsRestauranteComponent } from "./components/settings-restaurante/settings-restaurante.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

@NgModule({
	declarations: [AppComponent, LoginComponent, MenuComponent, NotFound404Component, SettingsRestauranteComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		NgxSpinnerModule,
		PipesModule,
		NgSelectModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
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
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
