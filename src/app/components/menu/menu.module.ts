import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {MenuRoutingModule} from './menu.routing.module';
import {SharedModule} from '../shared-module/shared.module';
import {TrabajadorModule} from '../trabajador/trabajador.module';
import {UsuarioModule} from '../usuario/usuario.module';
import {ProductoModule} from '../producto/producto.module';
import {FacturaModule} from '../factura/factura.module';
import {ClasificacionProductoComponent} from '../clasificacion-producto/clasificacion-producto.component';
import {SucursalComponent} from '../sucursal/sucursal.component';
import {CategoriaProductoComponent} from '../categoria-producto/categoria-producto.component';
import {SubClasificacionProductoComponent} from '../sub-clasificacion-producto/sub-clasificacion-producto.component';
import {EnvaseComponent} from '../envase/envase.component';
import {EmpaqueComponent} from '../empaque/empaque.component';
import {CargoComponent} from '../cargo/cargo.component';
import {GaleriaProductosProveedoresComponent} from '../reporte/galeria-productos-proveedores.component';
import {RolusuarioComponent} from '../rolusuario/rolusuario.component';
import {UnidadmedidaComponent} from '../unidadmedida/unidadmedida.component';
import {DashBoardComponent} from '../dash-board/dash-board.component';
import {SalidaProductoComponent} from '../salida-producto/salida-producto.component';
import {InicioComponent} from '../inicio/inicio.component';
import {ProveedorModule} from '../proveedor/proveedor.module';
import {ReportesComponent} from '../reportes/reportes.component';
import {ConfiguracionComponent} from '../configuracion/configuracion.component';
import {GastoModule} from '@app/components/gastos/gasto.module';
import {ConsumoInternoComponent} from '../consumo-interno/consumo-interno.component';
import {ModalModule} from '@app/components/modales/modal.module';
import {ConsolidadoComponent} from '../consolidado/consolidado.component';
import {TestuiComponent} from '@app/components/testui/testui.component';
import {AreaProduccionComponent} from '../produccion/area-produccion/area-produccion.component';
import {BodegaAreaProduccionComponent} from '../produccion/bodega-area-produccion/bodega-area-produccion.component';

@NgModule({
	imports: [
		SharedModule,
		MenuRoutingModule,
		ModalModule,
		ProductoModule,
		FacturaModule,
		GastoModule,
		TrabajadorModule,
		ProveedorModule,
		UsuarioModule
	],
	declarations: [
		CategoriaProductoComponent
		, ClasificacionProductoComponent
		, SubClasificacionProductoComponent
		, SucursalComponent
		, EnvaseComponent
		, EmpaqueComponent
		, SucursalComponent
		, CargoComponent
		, GaleriaProductosProveedoresComponent
		, RolusuarioComponent
		, UnidadmedidaComponent
		, DashBoardComponent
		, InicioComponent
		, SalidaProductoComponent
		, ReportesComponent
		, ConfiguracionComponent
		, ConsumoInternoComponent
		, ConsolidadoComponent
		, TestuiComponent
		, AreaProduccionComponent
		, BodegaAreaProduccionComponent
	],
	exports: [],
	schemas: [NO_ERRORS_SCHEMA]
})
export class MenuModule {}
