import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Componentes
import {CategoriaProductoComponent} from '../categoria-producto/categoria-producto.component';
import {ClasificacionProductoComponent} from '../clasificacion-producto/clasificacion-producto.component';
import {SubClasificacionProductoComponent} from '../sub-clasificacion-producto/sub-clasificacion-producto.component';
import {SucursalComponent} from '../sucursal/sucursal.component';
import {EnvaseComponent} from '../envase/envase.component';
import {AddUsuarioComponent} from '../usuario/add-usuario/add-usuario.component';
import {EmpaqueComponent} from '../empaque/empaque.component';
import {ListProductosComponent} from '../producto/list-productos/list-productos.component';
import {AddProductoComponent} from '../producto/add-producto/add-producto.component';
import {UpdateProductoComponent} from '../producto/update-producto/update-producto.component';
import {CargoComponent} from '../cargo/cargo.component';
import {ReporteComponent} from '../reporte/reporte.component';
import {RolusuarioComponent} from '../rolusuario/rolusuario.component';
import {UnidadmedidaComponent} from '../unidadmedida/unidadmedida.component';
import {AddfacturaComponent} from '../factura/addfactura/addfactura.component';
import {ListFacturaComponent} from '../factura/list-factura/list-factura.component';
import {DeleteFacturaComponent} from '../factura/delete-factura/delete-factura.component';
import {BusquedafacturasComponent} from '../factura/busquedafacturas/busquedafacturas.component';
import {ShowFacturaComponent} from '../factura/show-factura/show-factura.component';
import {UpdateFacturaComponent} from '../factura/update-factura/update-factura.component';
import {SummaryFacturasComponent} from '../factura/summary-facturas/summary-facturas.component';
import {DashBoardComponent} from '../dash-board/dash-board.component';
import {SalidaProductoComponent} from '../salida-producto/salida-producto.component';
import {AddTrabajadorComponent} from '../trabajador/add-trabajador/add-trabajador.component';
import {ListTrabajadorComponent} from '../trabajador/list-trabajador/list-trabajador.component';
import {UpdateTrabajadorComponent} from '../trabajador/update-trabajador/update-trabajador.component';
import {ListUsuariosComponent} from '../usuario/list-usuarios/list-usuarios.component';
import {UpdateUsuarioComponent} from '../usuario/update-usuario/update-usuario.component';
import {ListUsuarioComponent} from '../usuario/list-usuario/list-usuario.component';
import {ListProveedorComponent} from '../proveedor/list-proveedor/list-proveedor.component';
import {AddProveedorComponent} from '../proveedor/add-proveedor/add-proveedor.component';
import {UpdateProveedorComponent} from '../proveedor/update-proveedor/update-proveedor.component';
import {ReportesComponent} from '../reportes/reportes.component';
import {ConfiguracionComponent} from '../configuracion/configuracion.component';
import {GastosComponent} from '../gastos/add-gasto/gastos.component';
import {SummaryGastosComponent} from '../gastos/summary-gastos/summary-gastos.component';
import {ConsumoInternoComponent} from '../consumo-interno/consumo-interno.component';

const menuRoutes: Routes = [

        // MODULO PRODUCTO
         {path: 'producto', component: ListProductosComponent, data : { titulo : 'Productos'}}
        , {path: 'producto/add', component: AddProductoComponent, data : { titulo : 'Producto'}}
        , {path: 'producto/update/:id', component: UpdateProductoComponent, data : { titulo : 'Producto'}}

        /*MODULO USUARIO*/
        , {path: 'usuario/add', component: AddUsuarioComponent , data : { titulo : 'Usuario'}}
        , {path: 'usuario', component: ListUsuariosComponent, data : { titulo : 'Usuarios'} }
        , {path: 'usuario/update/:id', component: UpdateUsuarioComponent, data : { titulo : 'Usuario'} }
        , {path: 'usuario/view', component: ListUsuarioComponent, data : { titulo : 'Usuario'} }

        , {path: 'categorias', component: CategoriaProductoComponent, data : { titulo : 'Categorias'}}
        , {path: 'clasificacion-productos', component: ClasificacionProductoComponent, data : { titulo : 'Clasificaciones Produtos'}}

        //MODULO PROVEEDORES
        , {path: 'proveedor', component: ListProveedorComponent, data : { titulo : 'Proveedores'}}
        , {path: 'proveedor/add', component: AddProveedorComponent, data : { titulo : 'Proveedor'}}
        , {path: 'proveedor/update/:id', component: UpdateProveedorComponent, data : { titulo : 'Proveedor'}}

        // CATALOGOS
        , {path: 'subclasificacion-productos', component: SubClasificacionProductoComponent, data : { titulo : 'Subclasificaciones Productos'}}
        , {path: 'sucursales', component: SucursalComponent, data : { titulo : 'Sucursales'}}
        , {path: 'empaques', component: EmpaqueComponent, data : { titulo : 'Empaques'} }
        , {path: 'envases', component: EnvaseComponent, data : { titulo : 'Envases'} }
        , {path: 'cargo', component: CargoComponent, data : { titulo : 'Cargos'}}
        , {path: 'rol', component: RolusuarioComponent, data : { titulo : 'Roles'}}
        , {path: 'unidadmedida', component: UnidadmedidaComponent , data : { titulo : 'Unidad Medida'}}
        , {path: 'consumo-interno', component: ConsumoInternoComponent , data : { titulo : 'Consumo Interno'}}

        // Reportes
        , {path: 'reportes', component: ReportesComponent , data : { titulo : 'Reportes'}}

        , {path: 'busqueda-productos', component: ReporteComponent, data : { titulo : 'Busqueda Productos'}}

        /*FACTURA MODULO*/
        , {path: 'factura/add', component: AddfacturaComponent, data : { titulo : 'Factura'}}
        , {path: 'factura/list', component: ListFacturaComponent, data : { titulo : 'Facturas'}}
        , {path: 'factura/delete', component: DeleteFacturaComponent, data : { titulo : 'Factura'} }
        , {path: 'factura/busquedafacturas', component: BusquedafacturasComponent, data: { titulo : 'Factura'}}
        , {path: 'factura/showFactura/:id', component: ShowFacturaComponent, data: {titulo : 'Factura'}}
        , {path: 'factura/updateFactura/:id', component: UpdateFacturaComponent, data: {titulo: 'Factura'}}
        , {path: 'factura/summaryFactura', component: SummaryFacturasComponent, data: {titulo: 'Factura'}}

        /*TRABAJADOR MODULO*/
        , {path: 'trabajador/add', component: AddTrabajadorComponent, data : { titulo : 'Trabajador'}}
        , {path: 'trabajador', component: ListTrabajadorComponent, data : { titulo : 'Trabajadores'}}
        , {path: 'trabajador/update/:id', component: UpdateTrabajadorComponent, data : { titulo : 'Trabajador'}}
        , {path: 'dashboard', component: DashBoardComponent, data : { titulo : 'Dashboard'}}
        , {path: 'salida-producto', component: SalidaProductoComponent, data : { titulo : 'Salida Producto'}}

        // Configuraciones generales del sistema
        , {path: 'configuraciones', component: ConfiguracionComponent, data : { titulo : 'Configuraciones'}}

        // Modulo gastos
        , {path: 'gasto/gastos', component: GastosComponent, data : { titulo : 'Gastos'}}
        , {path: 'gastos/summary-gastos', component: SummaryGastosComponent, data : { titulo : 'Gastos'}}

        , {path: '', redirectTo: '/dashboard', pathMatch: 'full', data : { titulo : 'Dashboard'} }
];

@NgModule({
  imports: [
      RouterModule.forChild(menuRoutes)
  ],
  exports: [
      RouterModule
  ]
})

export class MenuRoutingModule {

}
