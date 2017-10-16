import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductoComponent } from './components/producto/producto.component';
import { CategoriaProductoComponent } from './components/categoria-producto/categoria-producto.component';
import { ClasificacionProductoComponent } from './components/clasificacion-producto/clasificacion-producto.component';
import { SubClasificacionProductoComponent } from './components/sub-clasificacion-producto/sub-clasificacion-producto.component';
import { SucursalComponent } from './components/sucursal/sucursal.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { NotFound404Component } from './components/not-found-404/not-found-404.component';
import { MenuComponent } from './components/menu/menu.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'login', component: LoginComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'regitro-usuario', component: RegistroUsuarioComponent},
  {path:'**',component: NotFound404Component}
]
@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    CategoriaProductoComponent,
    ClasificacionProductoComponent,
    SubClasificacionProductoComponent,
    SucursalComponent,
    UsuarioComponent,
    ProveedorComponent,
    InicioComponent,
    LoginComponent,
    RegistroUsuarioComponent,
    DashBoardComponent,
    NotFound404Component,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
