/*
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//Componentes

import { ProductoComponent } from '../producto/producto.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { MenuComponent } from './menu.component';
import { ClasificacionComponent } from '../clasificacion/clasificacion.component';
import { SubclasificacionComponent } from '../subclasificacion/subclasificacion.component';
import { ProveedoresComponent } from '../proveedores/proveedores.component';
import {UsuarioComponent} from "../usuario/usuario.component";
import { DataTablesModule } from 'angular-datatables';

const menuRoutes: Routes = [

  {
    path:'menu',
    component: MenuComponent,
    children: [

        {path:'',redirectTo:'menu',pathMatch:'full'},
        {path:'productos',component: ProductoComponent},
        {path:'categorias',component: CategoriaComponent},
        {path:'clasificacion',component: ClasificacionComponent},
        {path:'sub-clasificacion',component: SubclasificacionComponent},
        {path:'proveedores',component: ProveedoresComponent},
        {path:'usuario',component: UsuarioComponent},
        {path:'**',redirectTo:'menu'},
    ]
  },

];

@NgModule({
  imports: [
      RouterModule.forChild(menuRoutes),
    DataTablesModule

  ],
  exports: [
      RouterModule
  ]
})

export class MenuRoutingModule {

}
*/
