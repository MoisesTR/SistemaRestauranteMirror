import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListProductosComponent} from "./list-productos/list-productos.component";
import {AddProductoComponent} from "./add-producto/add-producto.component";

//Componentes


/*const produtoRoutes: Routes = [

  {
    path:'producto',
    component: ListProductosComponent,
    children: [
      {path:'',component:AddProductoComponent,pathMatch:'full'}


    ]
  },
];*/

@NgModule({
  imports: [
  /*  RouterModule.forChild(produtoRoutes)*/

  ],
  exports: [
    RouterModule
  ]
})


export class ProductoRoutingModule {

}
