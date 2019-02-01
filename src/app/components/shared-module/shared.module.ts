import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DataTablesModule} from 'angular-datatables';
import {NG_SELECT_DEFAULT_CONFIG, NgSelectModule} from '@ng-select/ng-select';
import {NativeDateTimeAdapter} from 'ng-pick-datetime/date-time/adapter/native-date-time-adapter.class';
import {MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import {NgxSpinnerModule} from 'ngx-spinner';
import {DateTimeAdapter, OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {Platform} from '@angular/cdk/platform';
import {PipesModule} from '@app/pipe/pipes.module';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {ShowErrorsComponent} from '../show-errors.component';
import {DirectivesModule} from '@app/directives/directives.module';
import {SpinnerComponent} from '@app/components/spinner/spinner.component';

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
		DirectivesModule,
		PipesModule,
		ShowErrorsComponent,
		BreadcrumbComponent,
        SpinnerComponent
	],

	declarations: [ShowErrorsComponent, BreadcrumbComponent, SpinnerComponent],
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
