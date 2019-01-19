import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { DataTablesModule } from "angular-datatables";
import { AlphanumericDirective } from "@app/directives/alphanumeric.directive";
import { AcceptCharactersDirective } from "@app/directives/acceptcaracter.directive";
import { NegOrPosNumbergDirective } from "@app/directives/negorposnumber.directive";
import { NumberDirective } from "@app/directives/onlypositivenumber.directive";
import { NumberOnlyDirective } from "@app/directives/onlynumber.directive";
import { NG_SELECT_DEFAULT_CONFIG, NgSelectModule } from "@ng-select/ng-select";
import { NativeDateTimeAdapter } from "ng-pick-datetime/date-time/adapter/native-date-time-adapter.class";
import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { NgxSpinnerModule } from "ngx-spinner";
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { Platform } from "@angular/cdk/platform";
import { PipesModule } from "@app/pipe/pipes.module";
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { ShowErrorsComponent } from "../show-errors.component";

@NgModule({
	imports: [CommonModule, MDBBootstrapModulesPro],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		MDBBootstrapModulesPro,
		NgSelectModule,
		DataTablesModule,
		NgxSpinnerModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule,
		PipesModule,
		ShowErrorsComponent,
		BreadcrumbComponent,
		NumberOnlyDirective,
		NumberDirective,
		AlphanumericDirective,
		AcceptCharactersDirective,
		NegOrPosNumbergDirective
	],

	declarations: [
		ShowErrorsComponent,
		BreadcrumbComponent,
		NumberOnlyDirective,
		NumberDirective,
		AlphanumericDirective,
		AcceptCharactersDirective,
		NegOrPosNumbergDirective
	],
	providers: [
		{
			provide: NG_SELECT_DEFAULT_CONFIG,
			useValue: {
				notFoundText: "No se encontraron resultados"
			}
		},
		{ provide: OWL_DATE_TIME_LOCALE, useValue: "es" },
		{
			provide: DateTimeAdapter,
			useClass: NativeDateTimeAdapter,
			deps: [OWL_DATE_TIME_LOCALE, Platform]
		}
	]
})
export class SharedModule {}
