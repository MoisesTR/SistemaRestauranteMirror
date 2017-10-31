import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//Componentes
import { ProductoComponent } from '../producto/producto.component';
import { MenuComponent } from './menu.component';
import {CategoriaProductoComponent} from "../categoria-producto/categoria-producto.component";
import {ClasificacionProductoComponent} from "../clasificacion-producto/clasificacion-producto.component";
import {SubClasificacionProductoComponent} from "../sub-clasificacion-producto/sub-clasificacion-producto.component";
import {UsuarioComponent} from "../usuario/usuario.component";
import {SucursalComponent} from "../sucursal/sucursal.component";
import {EnvaseComponent} from "../envase/envase.component";
import {ProveedorComponent} from "../proveedor/proveedor.component";
import {AddProductoComponent} from "../producto/add-producto/add-producto.component";
import {AddUsuarioComponent} from "../usuario/add-usuario/add-usuario.component";

const menuRoutes: Routes = [

  {
    path:'menu',
    component: MenuComponent,
    children: [
        {path:'',redirectTo:'menu',pathMatch:'full'},
        {path:'productos',component: ProductoComponent},
        {path:'add-usuario',component:AddUsuarioComponent },
        {path:'add-producto',component: AddProductoComponent},
        {path:'categorias',component: CategoriaProductoComponent},
        {path:'clasificacion-productos',component: ClasificacionProductoComponent},
        {path:'proveedores',component: ProveedorComponent},
        {path:'subclasificacion-productos',component: SubClasificacionProductoComponent},
        {path:'registro-usuario',component: UsuarioComponent},
        {path:'sucursales',component: SucursalComponent},
        {path:'empaques',component: AddProductoComponent},
        {path:'envases',component: EnvaseComponent},
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
