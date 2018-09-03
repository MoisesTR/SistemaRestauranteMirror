import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {JwtHelperService} from '@auth0/angular-jwt';
import {
    BodegaSucursalService
    , CargoService
    , CategoriaProductoService
    , ClasificacionProductoService
    , ClasificacionUnidadMedidaService
    , DeleteImageService
    , EmpaqueService
    , EnvaseService
    , EstadoEmpaqueService
    , FacturaService
    , MenuService
    , PermisoControlService
    , ProductoService
    , ProductoProveedorService
    , ProveedorService
    , RolusuarioService
    , SubClasificacionProductoService
    , SucursalService
    , TelefonosucursalService
    , TrabajadorService
    , UnidadMedidaService
    , UploadService
    , UsuarioService
    , AuthService
    , AuthGuardService
    , ReporteService
    , PreviousRouteService

} from './service.index';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
      BodegaSucursalService
      , CargoService
      , CategoriaProductoService
      , ClasificacionProductoService
      , ClasificacionUnidadMedidaService
      , DeleteImageService
      , EmpaqueService
      , EnvaseService
      , EstadoEmpaqueService
      , FacturaService
      , MenuService
      , PermisoControlService
      , ProductoService
      , ProductoProveedorService
      , ProveedorService
      , RolusuarioService
      , SubClasificacionProductoService
      , SucursalService
      , TelefonosucursalService
      , TrabajadorService
      , UnidadMedidaService
      , UploadService
      , UsuarioService
      , AuthService
      , AuthGuardService
      , JwtHelperService
      , DatePipe
      , ReporteService
      , PreviousRouteService
  ],
  declarations: []
})
export class ServiceModule { }
