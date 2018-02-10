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
//import {ProductoProveedorComponent} from "../producto-proveedor/producto-proveedor.component";
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


const menuRoutes: Routes = [

  {
    path:'menu',
    component: MenuComponent,
    canActivate: [AuthGuardService],
    children: [
        {path:'',redirectTo:'dashboard',pathMatch:'full' }
        , {path:'producto',component: ListProductosComponent}
        , {path:'producto/add',component: AddProductoComponent}
        , {path:'producto/update/:id',component: UpdateProductoComponent}
        /*MODULO USUARIO*/
        , {path:'usuario/add',component:AddUsuarioComponent }
        , {path:'usuario',component:ListUsuariosComponent }
        , {path:'usuario/update/:id',component:UpdateUsuarioComponent }
        , {path:'usuario/view',component:ListUsuarioComponent }
        , {path:'categorias',component: CategoriaProductoComponent}
        , {path:'clasificacion-productos',component: ClasificacionProductoComponent}
        , {path:'proveedores',component: ProveedorComponent}
        , {path:'subclasificacion-productos',component: SubClasificacionProductoComponent}
        , {path:'sucursales',component: SucursalComponent}
        , {path:'empaques',component: EmpaqueComponent}
        , {path:'envases',component: EnvaseComponent}
        , {path:'cargo',component: CargoComponent}
        , {path:'bodega',component: BodegaSucursalComponent}
        , {path:'traslados',component: TrasladoProductoComponent}
        , {path:'reportes',component: ReporteComponent}
  //      , {path:'producto-proveedor',component: ProductoProveedorComponent}
        , {path:'rol',component: RolusuarioComponent}
        , {path:'habilitados',component: HabilitadosComponent}
        , {path:'unidadmedida',component: UnidadmedidaComponent}
        /*FACTURA MODULO*/
        , {path:'factura/add',component: AddfacturaComponent}
        , {path:'factura/list',component: ListFacturaComponent}
        , {path:'factura/delete',component: DeleteFacturaComponent}
        , {path:'factura/informacion',component: InformacionFacturaComponent}
        , {path:'factura/busqueda',component: BuscarGeneralFacturaComponent}

        /*TRABAJADOR MODULO*/
      /*FACTURA MODULO*/
        , {path:'trabajador/add',component: AddTrabajadorComponent}
        , {path:'trabajador',component: ListTrabajadorComponent}
        , {path:'trabajador/update',component: UpdateTrabajadorComponent}
        , {path:'dashboard',component: DashBoardComponent}
        , {path:'salida-producto',component: SalidaProductoComponent}

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
