import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//Componentes
import { MenuComponent } from './menu.component';
import {CategoriaProductoComponent} from "../categoria-producto/categoria-producto.component";
import {ClasificacionProductoComponent} from "../clasificacion-producto/clasificacion-producto.component";
import {SubClasificacionProductoComponent} from "../sub-clasificacion-producto/sub-clasificacion-producto.component";
import {SucursalComponent} from "../sucursal/sucursal.component";
import {EnvaseComponent} from "../envase/envase.component";
import {ProveedorComponent} from "../proveedor/proveedor.component";
import {AddUsuarioComponent} from "../usuario/add-usuario/add-usuario.component";
import {EmpaqueComponent} from "../empaque/empaque.component";
import {ListProductosComponent} from "../producto/list-productos/list-productos.component";
import {AddProductoComponent} from "../producto/add-producto/add-producto.component";
import {UpdateProductoComponent} from "../producto/update-producto/update-producto.component";
import {TrabajadorComponent} from "../trabajador/trabajador.component";


const menuRoutes: Routes = [

  {
    path:'menu',
    component: MenuComponent,
    children: [
        {path:'',redirectTo:'menu',pathMatch:'full'},
        {path:'producto',component: ListProductosComponent},
        {path:'producto/add',component: AddProductoComponent},
        {path:'producto/update',component: UpdateProductoComponent},
        {path:'add-usuario',component:AddUsuarioComponent },
        {path:'categorias',component: CategoriaProductoComponent},
        {path:'clasificacion-productos',component: ClasificacionProductoComponent},
        {path:'proveedores',component: ProveedorComponent},
        {path:'subclasificacion-productos',component: SubClasificacionProductoComponent},
        {path:'usuario',component: AddUsuarioComponent},
        {path:'sucursales',component: SucursalComponent},
        {path:'empaques',component: EmpaqueComponent},
        {path:'envases',component: EnvaseComponent},
        {path:'trabajador',component: TrabajadorComponent}
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
