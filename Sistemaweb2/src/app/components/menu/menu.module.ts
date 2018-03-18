///Modulos
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuRoutingModule} from './menu.routing.module';
import {DataTablesModule} from 'angular-datatables';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
//Componentes
import {ClasificacionProductoComponent} from '../clasificacion-producto/clasificacion-producto.component';
import {ProveedorComponent} from '../proveedor/proveedor.component';
import {SucursalComponent} from '../sucursal/sucursal.component';
import {CategoriaProductoComponent} from '../categoria-producto/categoria-producto.component';
import {SubClasificacionProductoComponent} from '../sub-clasificacion-producto/sub-clasificacion-producto.component';
import {EnvaseComponent} from '../envase/envase.component';
import {BodegaSucursalComponent} from '../bodega-sucursal/bodega-sucursal.component';
import {EmpaqueComponent} from '../empaque/empaque.component';

import {MenuComponent} from './menu.component';
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
import {ProductoModule} from '../producto/producto.module';
import {TelephoneNumberFormatValidatorDirective} from '../../validadores/telephoneNumber';
import {BirthYearValidatorDirective} from '../../validadores/birthYear';
import {CargoComponent} from '../cargo/cargo.component';
import {ReporteComponent} from '../reporte/reporte.component';
import {TrasladoProductoComponent} from '../traslado-producto/traslado-producto.component';
import {UploadService} from '../../services/upload.service';
import {ProductoProveedorService} from '../../services/producto-proveedor.service';
import {RolusuarioComponent} from '../rolusuario/rolusuario.component';
import {HabilitadosComponent} from '../habilitados/habilitados.component';
import {UnidadmedidaComponent} from '../unidadmedida/unidadmedida.component';
import {FacturaModule} from '../factura/factura.module';
import {BuscarPipe} from '../../pipe/buscar.pipe';
import {DashBoardComponent} from '../dash-board/dash-board.component';
import {SharedModuleModule} from '../shared-module/shared-module.module';
import {SalidaProductoComponent} from '../salida-producto/salida-producto.component';
import {TrabajadorModule} from '../trabajador/trabajador.module';
import {UsuarioModule} from '../usuario/usuario.module';
import {ClasificacionUnidadMedidaService} from '../../services/clasificacion-unidad-medida.service';
import {TelefonosucursalService} from '../../services/telefonosucursal.service';
import {AuthGuardService} from '../../services/auth/auth-guard.service';
import {AuthService} from '../../services/auth/auth.service';
import {JwtHelper} from 'angular2-jwt';
import {ProductoProveedorModule} from '../producto-proveedor/producto-proveedor.module';
import {InformacionFacturaComponent} from '../informacion-factura/informacion-factura.component';
import {BuscarGeneralFacturaComponent} from '../buscar-general-factura/buscar-general-factura.component';
import {MDBBootstrapModulePro} from '../../typescripts/pro';


@NgModule({
  declarations: [
    CategoriaProductoComponent
    , ClasificacionProductoComponent
    , SubClasificacionProductoComponent
    , ProveedorComponent
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
    , SalidaProductoComponent
    , InformacionFacturaComponent
    , BuscarGeneralFacturaComponent
    , BuscarPipe
  ],
  imports: [
    CommonModule
    , FormsModule
    , HttpModule
    , MenuRoutingModule
    , ProductoModule
    , ReactiveFormsModule
    , DataTablesModule
    , FacturaModule
    , TrabajadorModule
    , UsuarioModule
    , SharedModuleModule
    , ProductoProveedorModule
    , HttpClientModule
    , MDBBootstrapModulePro.forRoot()

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

  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})

export class MenuModule {

}

