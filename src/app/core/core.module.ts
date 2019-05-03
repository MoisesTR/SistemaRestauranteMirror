import { NgModule, Optional, SkipSelf } from "@angular/core";
import { DatePipe } from "@angular/common";
import { JwtHelperService } from "@auth0/angular-jwt";
import {
	AuthGuardService,
	AuthService,
	BodegaSucursalService,
	CargoService,
	CategoriaProductoService,
	ClasificacionProductoService,
	ClasificacionUnidadMedidaService,
	DeleteImageService,
	EmpaqueService,
	EnvaseService,
	EstadoEmpaqueService,
	FacturaService,
	GastoService,
	MenuService,
	PermisoControlService,
	PreviousRouteService,
	ProductoProveedorService,
	ProductoService,
	ProveedorService,
	ReporteService,
	RolusuarioService,
	SubClasificacionProductoService,
	SucursalService,
	TrabajadorService,
	UnidadMedidaService,
	UploadService,
	UsuarioService,
	SpinnerService,
	TipoDocumentoService,
	TipoMonedaService,
	PersistenciaDatoService,
	LoginGuardService,
	SettingRestauranteService,
	PaisService,
	TipoInsumoService,
	FacturacionMonedaService,
	GrupoCuentaServiceService,
	CuentaServiceService,
	SubCuentaServiceService
} from "./service.index";
import { throwIfAlreadyLoaded } from "@app/core/module-import-guard";
import { ReactiveFormsModule } from "@angular/forms";
import { MDBSpinningPreloader } from "ng-uikit-pro-standard";
import { HttpInterceptorService } from "@app/core/services/auth/http-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NG_SELECT_DEFAULT_CONFIG, NgSelectModule } from "@ng-select/ng-select";
import { DateTimeAdapter, OWL_DATE_TIME_LOCALE, OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { NativeDateTimeAdapter } from "ng-pick-datetime/date-time/adapter/native-date-time-adapter.class";
import { Platform } from "@angular/cdk/platform";
import { PipesModule } from "@app/pipe/pipes.module";
import { NgxSpinnerModule } from "ngx-spinner";
import {GlobalErrorHandlerService} from '@app/core/services/shared/global-error-handler.service';

@NgModule({
	imports: [],
	exports: [
		ReactiveFormsModule,
		NgxSpinnerModule,
		PipesModule,
		NgSelectModule,
		OwlDateTimeModule,
		OwlNativeDateTimeModule
	],
	providers: [
		BodegaSucursalService,
		CargoService,
		CategoriaProductoService,
		ClasificacionProductoService,
		ClasificacionUnidadMedidaService,
		DeleteImageService,
		EmpaqueService,
		EnvaseService,
		EstadoEmpaqueService,
		FacturaService,
		MenuService,
		PermisoControlService,
		ProductoService,
		ProductoProveedorService,
		ProveedorService,
		RolusuarioService,
		SubClasificacionProductoService,
		SucursalService,
		TrabajadorService,
		UnidadMedidaService,
		UploadService,
		UsuarioService,
		AuthService,
		AuthGuardService,
		JwtHelperService,
		DatePipe,
		ReporteService,
		PreviousRouteService,
		GastoService,
		SpinnerService,
		TipoDocumentoService,
		TipoMonedaService,
		MDBSpinningPreloader,
		PersistenciaDatoService,
		LoginGuardService,
		SettingRestauranteService,
		PaisService,
		LoginGuardService,
		TipoInsumoService,
		FacturacionMonedaService,
		GrupoCuentaServiceService,
		CuentaServiceService,
		SubCuentaServiceService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpInterceptorService,
			multi: true
		},
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
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		throwIfAlreadyLoaded(parentModule, "CoreModule");
	}
}
