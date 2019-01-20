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
	UsuarioService
} from "./service.index";
import { throwIfAlreadyLoaded } from "@app/core/module-import-guard";
import { ReactiveFormsModule } from "@angular/forms";
import { MDBSpinningPreloader } from "ng-uikit-pro-standard";
import { TokenInterceptorService } from "@app/core/services/auth/token.interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {NG_SELECT_DEFAULT_CONFIG} from "@ng-select/ng-select";
import {DateTimeAdapter, OWL_DATE_TIME_LOCALE} from "ng-pick-datetime";
import {NativeDateTimeAdapter} from "ng-pick-datetime/date-time/adapter/native-date-time-adapter.class";
import {Platform} from "@angular/cdk/platform";

@NgModule({
	imports: [],
	exports: [ReactiveFormsModule],
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
		MDBSpinningPreloader,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
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
	],
	declarations: []
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		throwIfAlreadyLoaded(parentModule, "CoreModule");
	}
}