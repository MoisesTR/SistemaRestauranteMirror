// Modulos
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {MenuRoutingModule} from './menu.routing.module';
// Modulos propios
import {SharedModuleModule} from '../shared-module/shared-module.module';
import {TrabajadorModule} from '../trabajador/trabajador.module';
import {UsuarioModule} from '../usuario/usuario.module';
import {ProductoModule} from '../producto/producto.module';
import {FacturaModule} from '../factura/factura.module';
// Componentes
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
import {SalidaProductoComponent} from '../salida-producto/salida-producto.component';
// Directivas
import {TelephoneNumberFormatValidatorDirective} from '../../validadores/telephoneNumber';
import {BirthYearValidatorDirective} from '../../validadores/birthYear';
import {InicioComponent} from '../inicio/inicio.component';
import {ProveedorModule} from '../proveedor/proveedor.module';
import {ReportesComponent} from '../reportes/reportes.component';
import {MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import {ServiceModule} from '../../services/service.module';
import {ConfiguracionComponent} from '../configuracion/configuracion.component';

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
    , ReportesComponent
    , ConfiguracionComponent
  ],
  imports: [
      SharedModuleModule
    , ServiceModule
    , MenuRoutingModule
    , ProductoModule
    , FacturaModule
    , TrabajadorModule
    , ProveedorModule
    , UsuarioModule
    , MDBBootstrapModulesPro
  ],
  exports: [
    MenuComponent
    , TelephoneNumberFormatValidatorDirective
    , BirthYearValidatorDirective
  ],
  providers: [],
  schemas: [ NO_ERRORS_SCHEMA ]
})

export class MenuModule {

}

