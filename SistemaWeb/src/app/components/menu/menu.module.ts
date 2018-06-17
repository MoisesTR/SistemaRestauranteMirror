///Modulos
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {MenuRoutingModule} from './menu.routing.module';
//Modulos propios
import {SharedModuleModule} from '../shared-module/shared-module.module';
import {TrabajadorModule} from '../trabajador/trabajador.module';
import {UsuarioModule} from '../usuario/usuario.module';
import {ProductoProveedorModule} from '../producto-proveedor/producto-proveedor.module';
import {ProductoModule} from '../producto/producto.module';
import {FacturaModule} from '../factura/factura.module';
import {MDBBootstrapModulePro} from '../../typescripts/pro';
import {MDBBootstrapModule} from '../../typescripts/free';
//Componentes
import {ClasificacionProductoComponent} from '../clasificacion-producto/clasificacion-producto.component';
import {SucursalComponent} from '../sucursal/sucursal.component';
import {CategoriaProductoComponent} from '../categoria-producto/categoria-producto.component';
import {SubClasificacionProductoComponent} from '../sub-clasificacion-producto/sub-clasificacion-producto.component';
import {EnvaseComponent} from '../envase/envase.component';
import {BodegaSucursalComponent} from '../bodega-sucursal/bodega-sucursal.component';
import {EmpaqueComponent} from '../empaque/empaque.component';
import {MenuComponent} from './menu.component';
import {CargoComponent} from '../cargo/cargo.component';
import {ReporteComponent} from '../reporte/reporte.component';
import {TrasladoProductoComponent} from '../traslado-producto/traslado-producto.component';
import {RolusuarioComponent} from '../rolusuario/rolusuario.component';
import {HabilitadosComponent} from '../habilitados/habilitados.component';
import {UnidadmedidaComponent} from '../unidadmedida/unidadmedida.component';
import {DashBoardComponent} from '../dash-board/dash-board.component';
import {InformacionFacturaComponent} from '../informacion-factura/informacion-factura.component';
import {BuscarGeneralFacturaComponent} from '../buscar-general-factura/buscar-general-factura.component';
import {SalidaProductoComponent} from '../salida-producto/salida-producto.component';
//Servicios
import {CategoriaProductoService} from '../../services/categoria-producto.service';
import {ClasificacionProductoService} from '../../services/clasificacion-producto.service';
import {SubClasificacionProductoService} from '../../services/sub-clasificacion-producto.service';
import {ProveedorService} from '../../services/proveedor.service';
import {SucursalService} from '../../services/sucursal.service';
import {UsuarioService} from '../../services/usuario.service';
import {EnvaseService} from '../../services/envase.service';
import {EmpaqueService} from '../../services/empaque.service';
import {BodegaSucursalService} from '../../services/bodega-sucursal.service';
import {TrabajadorService} from '../../services/trabajador.service';
import {UploadService} from '../../services/upload.service';
import {ProductoProveedorService} from '../../services/producto-proveedor.service';
import {ClasificacionUnidadMedidaService} from '../../services/clasificacion-unidad-medida.service';
import {TelefonosucursalService} from '../../services/telefonosucursal.service';
import {AuthGuardService} from '../../services/auth/auth-guard.service';
import {AuthService} from '../../services/auth/auth.service';
import {JwtHelper} from 'angular2-jwt';
//Directivas
import {TelephoneNumberFormatValidatorDirective} from '../../validadores/telephoneNumber';
import {BirthYearValidatorDirective} from '../../validadores/birthYear';
import {DatePipe} from '@angular/common';
import {DeleteImageService} from '../../services/delete-image-service';
import {InicioComponent} from '../inicio/inicio.component';
import {ProveedorModule} from '../proveedor/proveedor.module';
import {ReportesComponent} from '../reportes/reportes.component';


@NgModule({
  declarations: [
    CategoriaProductoComponent
    , ClasificacionProductoComponent
    , SubClasificacionProductoComponent
    , SucursalComponent
    , EnvaseComponent
    , EmpaqueComponent
    , BodegaSucursalComponent
    , SucursalComponent
    , MenuComponent
    , TelephoneNumberFormatValidatorDirective
    , BirthYearValidatorDirective
    , CargoComponent
    , ReporteComponent
    , TrasladoProductoComponent
    , RolusuarioComponent
    , HabilitadosComponent
    , UnidadmedidaComponent
    , DashBoardComponent
      , InicioComponent
    , SalidaProductoComponent
    , InformacionFacturaComponent
    , BuscarGeneralFacturaComponent
    , ReportesComponent


  ],
  imports: [
      SharedModuleModule
    , MenuRoutingModule
    , ProductoModule
    , FacturaModule
    , TrabajadorModule
      , ProveedorModule
    , UsuarioModule
    , ProductoProveedorModule
    , MDBBootstrapModule
    , MDBBootstrapModulePro

  ],
  exports: [
    MenuComponent
    , TelephoneNumberFormatValidatorDirective
    , BirthYearValidatorDirective


  ],
  providers: [
    CategoriaProductoService
    , ClasificacionProductoService
    , SubClasificacionProductoService
    , ProveedorService
    , SucursalService
    , UsuarioService
    , EnvaseService
    , EmpaqueService
    , BodegaSucursalService
    , TrabajadorService
    , UploadService
    , ProductoProveedorService
    , ClasificacionUnidadMedidaService
    , TelefonosucursalService
    , AuthGuardService
    , AuthService
    , JwtHelper
      , DatePipe
      , DeleteImageService

  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})

export class MenuModule {

}

