import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//Componentes

import { ProductoComponent } from '../producto/producto.component';

import { MenuComponent } from './menu.component';
import {CategoriaProductoComponent} from "../categoria-producto/categoria-producto.component";
import {ClasificacionProductoComponent} from "../clasificacion-producto/clasificacion-producto.component";
import {SubClasificacionProductoComponent} from "../sub-clasificacion-producto/sub-clasificacion-producto.component";


const menuRoutes: Routes = [

  {
    path:'menu',
    component: MenuComponent,
    children: [
        {path:'',redirectTo:'menu',pathMatch:'full'},
        {path:'productos',component: ProductoComponent},
        {path:'categorias',component: CategoriaProductoComponent},
        {path:'clasificacion-productos',component: ClasificacionProductoComponent},
        {path:'subclasificacion-productos',component: SubClasificacionProductoComponent},

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
