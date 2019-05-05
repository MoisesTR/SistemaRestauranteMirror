import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// Componentes
import { CategoriaProductoComponent } from "../categoria-producto/categoria-producto.component";
import { ClasificacionProductoComponent } from "../clasificacion-producto/clasificacion-producto.component";
import { SubClasificacionProductoComponent } from "../sub-clasificacion-producto/sub-clasificacion-producto.component";
import { SucursalComponent } from "../sucursal/sucursal.component";
import { EnvaseComponent } from "../envase/envase.component";
import { EmpaqueComponent } from "../empaque/empaque.component";
import { CargoComponent } from "../cargo/cargo.component";
import { GaleriaProductosProveedoresComponent } from "../reporte/galeria-productos-proveedores.component";
import { RolusuarioComponent } from "../rolusuario/rolusuario.component";
import { UnidadmedidaComponent } from "../unidadmedida/unidadmedida.component";
import { DashBoardComponent } from "../dash-board/dash-board.component";
import { SalidaProductoComponent } from "../salida-producto/salida-producto.component";
import { ReportesComponent } from "../reportes/reportes.component";
import { ConfiguracionComponent } from "../configuracion/configuracion.component";
import { ConsumoInternoComponent } from "../consumo-interno/consumo-interno.component";
import { ConsolidadoComponent } from "../consolidado/consolidado.component";

import { TestuiComponent } from "@app/components/testui/testui.component";
import { AreaProduccionComponent } from "../produccion/area-produccion/area-produccion.component";
import { BodegaAreaProduccionComponent } from "../produccion/bodega-area-produccion/bodega-area-produccion.component";

const menuRoutes: Routes = [
	{ path: "categorias", component: CategoriaProductoComponent, data: { titulo: "Categorias" } },
	{
		path: "clasificacion-productos",
		component: ClasificacionProductoComponent,
		data: { titulo: "Clasificaciones Produtos" }
	},

	// CATALOGOS
	{
		path: "subclasificacion-productos",
		component: SubClasificacionProductoComponent,
		data: { titulo: "Subclasificaciones Productos" }
	},
	{ path: "sucursales", component: SucursalComponent, data: { titulo: "Sucursales" } },
	{ path: "empaques", component: EmpaqueComponent, data: { titulo: "Empaques" } },
	{ path: "envases", component: EnvaseComponent, data: { titulo: "Envases" } },
	{ path: "cargo", component: CargoComponent, data: { titulo: "Cargos" } },
	{ path: "rol", component: RolusuarioComponent, data: { titulo: "Roles" } },
	{ path: "unidadmedida", component: UnidadmedidaComponent, data: { titulo: "Unidad Medida" } },
	{ path: "consumo-interno", component: ConsumoInternoComponent, data: { titulo: "Consumo Interno" } },

	// Reportes
	{ path: "reportes", component: ReportesComponent, data: { titulo: "Reportes" } },

	{
		path: "busqueda-productos",
		component: GaleriaProductosProveedoresComponent,
		data: { titulo: "Busqueda Productos" }
	},

	{ path: "dashboard", component: DashBoardComponent, data: { titulo: "Dashboard" } },
	{ path: "salida-producto", component: SalidaProductoComponent, data: { titulo: "Salida Producto" } },

	// Configuraciones generales del sistema
	{ path: "configuraciones/documentos", component: ConfiguracionComponent, data: { titulo: "Documentos y Monedas" } },

	// Consolidado de gastos y facturas
	{ path: "consolidado", component: ConsolidadoComponent, data: { titulo: "Consolidado" } },

	{ path: "testing", component: TestuiComponent, data: { titulo: "Testing" } },

	{ path: "", redirectTo: "/dashboard", pathMatch: "full", data: { titulo: "Dashboard" } },

	//Modulo Produccion
	{ path: "produccion/area-produccion", component: AreaProduccionComponent, data: { titulo: "Area de Produccion" } },
	{ path: "produccion/bodega-area-produccion", component: BodegaAreaProduccionComponent, data: { titulo: "Bodega Area de Produccion" } }
];

@NgModule({
	imports: [RouterModule.forChild(menuRoutes)],
	exports: [RouterModule]
})
export class MenuRoutingModule {}
