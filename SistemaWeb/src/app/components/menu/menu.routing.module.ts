import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
//Componentes
import {MenuComponent} from './menu.component';
import {CategoriaProductoComponent} from '../categoria-producto/categoria-producto.component';
import {ClasificacionProductoComponent} from '../clasificacion-producto/clasificacion-producto.component';
import {SubClasificacionProductoComponent} from '../sub-clasificacion-producto/sub-clasificacion-producto.component';
import {SucursalComponent} from '../sucursal/sucursal.component';
import {EnvaseComponent} from '../envase/envase.component';
import {ProveedorComponent} from '../proveedor/proveedor.component';
import {AddUsuarioComponent} from '../usuario/add-usuario/add-usuario.component';
import {EmpaqueComponent} from '../empaque/empaque.component';
import {ListProductosComponent} from '../producto/list-productos/list-productos.component';
import {AddProductoComponent} from '../producto/add-producto/add-producto.component';
import {UpdateProductoComponent} from '../producto/update-producto/update-producto.component';
import {CargoComponent} from '../cargo/cargo.component';
import {BodegaSucursalComponent} from '../bodega-sucursal/bodega-sucursal.component';
import {TrasladoProductoComponent} from '../traslado-producto/traslado-producto.component';
import {ReporteComponent} from '../reporte/reporte.component';
import {RolusuarioComponent} from '../rolusuario/rolusuario.component';
import {HabilitadosComponent} from '../habilitados/habilitados.component';
import {UnidadmedidaComponent} from '../unidadmedida/unidadmedida.component';
import {AddfacturaComponent} from '../factura/addfactura/addfactura.component';
import {ListFacturaComponent} from '../factura/list-factura/list-factura.component';
import {DeleteFacturaComponent} from '../factura/delete-factura/delete-factura.component';
import {DashBoardComponent} from '../dash-board/dash-board.component';
import {SalidaProductoComponent} from '../salida-producto/salida-producto.component';
import {AddTrabajadorComponent} from '../trabajador/add-trabajador/add-trabajador.component';
import {ListTrabajadorComponent} from '../trabajador/list-trabajador/list-trabajador.component';
import {UpdateTrabajadorComponent} from '../trabajador/update-trabajador/update-trabajador.component';
import {ListUsuariosComponent} from '../usuario/list-usuarios/list-usuarios.component';
import {UpdateUsuarioComponent} from '../usuario/update-usuario/update-usuario.component';
import {InformacionFacturaComponent} from '../informacion-factura/informacion-factura.component';
import {BuscarGeneralFacturaComponent} from '../buscar-general-factura/buscar-general-factura.component';
import {ListUsuarioComponent} from '../usuario/list-usuario/list-usuario.component';
import {AuthGuardService} from '../../services/auth/auth-guard.service';
import {AddProductoProveedorComponent} from '../producto-proveedor/add-producto-proveedor/add-producto-proveedor.component';
import {UpdateProductoProveedorComponent} from '../producto-proveedor/update-producto-proveedor/update-producto-proveedor.component';
import {ListProductoProveedorComponent} from '../producto-proveedor/list-producto-proveedor/list-producto-proveedor.component';


const menuRoutes: Routes = [

  {
    path:'',
    component: MenuComponent,
    canActivate: [AuthGuardService],
    children: [
        {path:'',redirectTo:'/dashboard',pathMatch:'full', data : { titulo : 'Dashboard'} }
        //MODULO PRODUCTO
        , {path:'producto',component: ListProductosComponent, data : { titulo : 'Productos'}}
        , {path:'producto/add',component: AddProductoComponent, data : { titulo : 'Producto'}}
        , {path:'producto/update/:id',component: UpdateProductoComponent, data : { titulo : 'Producto'}}

        /*MODULO USUARIO*/
        , {path:'usuario/add',component:AddUsuarioComponent , data : { titulo : 'Usuario'}}
        , {path:'usuario',component:ListUsuariosComponent, data : { titulo : 'Usuarios'} }
        , {path:'usuario/update/:id',component:UpdateUsuarioComponent, data : { titulo : 'Usuario'} }
        , {path:'usuario/view',component:ListUsuarioComponent, data : { titulo : 'Usuario'} }

        , {path:'categorias',component: CategoriaProductoComponent, data : { titulo : 'Categorias'}}
        , {path:'clasificacion-productos',component: ClasificacionProductoComponent, data : { titulo : 'Clasificaciones Produtos'}}
        , {path:'proveedores',component: ProveedorComponent, data : { titulo : 'Proveedores'}}
        , {path:'subclasificacion-productos',component: SubClasificacionProductoComponent, data : { titulo : 'Subclasificaciones Productos'}}
        , {path:'sucursales',component: SucursalComponent, data : { titulo : 'Sucursales'}}
        , {path:'empaques',component: EmpaqueComponent, data : { titulo : 'Empaques'} }
        , {path:'envases',component: EnvaseComponent, data : { titulo : 'Envases'} }
        , {path:'cargo',component: CargoComponent, data : { titulo : 'Cargos'}}
        , {path:'bodega',component: BodegaSucursalComponent, data : { titulo : 'Bodega'}}
        , {path:'traslados',component: TrasladoProductoComponent , data : { titulo : 'Traslados'}}
        , {path:'busqueda-productos',component: ReporteComponent, data : { titulo : 'Busqueda Productos'}}
        , {path:'rol',component: RolusuarioComponent, data : { titulo : 'Roles'}}
        , {path:'habilitados',component: HabilitadosComponent, data : { titulo : 'Habilitados'}}
        , {path:'unidadmedida',component: UnidadmedidaComponent , data : { titulo : 'Unidad Medida'}}
        /*FACTURA MODULO*/
        , {path:'factura/add',component: AddfacturaComponent, data : { titulo : 'Factura'}}
        , {path:'factura/list',component: ListFacturaComponent, data : { titulo : 'Facturas'}}
        , {path:'factura/delete',component: DeleteFacturaComponent, data : { titulo : 'Factura'} }
        , {path:'factura/informacion',component: InformacionFacturaComponent, data : { titulo : 'Factura'}}
        , {path:'factura/busqueda',component: BuscarGeneralFacturaComponent, data : { titulo : 'Factura'}}

        /*TRABAJADOR MODULO*/
        , {path:'trabajador/add',component: AddTrabajadorComponent, data : { titulo : 'Trabajador'}}
        , {path:'trabajador',component: ListTrabajadorComponent, data : { titulo : 'Trabajadores'}}
        , {path:'trabajador/update',component: UpdateTrabajadorComponent, data : { titulo : 'Trabajador'}}
        , {path:'dashboard',component: DashBoardComponent, data : { titulo : 'Dashboard'}}
        , {path:'salida-producto',component: SalidaProductoComponent, data : { titulo : 'Salida Producto'}}

        //Producto proveedor
      , {path:'producto-proveedor/add',component: AddProductoProveedorComponent, data : { titulo : 'Producto Proveedor'}}
      , {path:'producto-proveedor/update/:id',component: UpdateProductoProveedorComponent, data : { titulo : 'Producto Proveedor'}}
      , {path:'producto-proveedor/list',component: ListProductoProveedorComponent, data : { titulo : 'Producto Proveedor'}}
      , {path:'producto-proveedor',component: ListProductoProveedorComponent, data : { titulo : 'Producto Proveedor'}}

    ]
  },
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