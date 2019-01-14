import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {MenuComponent} from './components/menu/menu.component';
import {NotFound404Component} from './components/not-found-404/not-found-404.component';
import {AuthGuardService} from '@app/core/service.index';
import {NgModule} from '@angular/core';

export const ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {  path: '',
        component: MenuComponent,
        canActivate: [AuthGuardService],
        loadChildren: './components/menu/menu.module#MenuModule'
    },
    {path: '**', component: NotFound404Component},
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules})]
    , exports: [RouterModule]
})

export class AppRoutingModule { }

