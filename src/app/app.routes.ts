import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {MenuComponent} from './components/menu/menu.component';
import {NotFound404Component} from './components/not-found-404/not-found-404.component';
import {AuthGuardService} from './services/auth/auth-guard.service';

export const ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {  path: '',
        component: MenuComponent,
        canActivate: [AuthGuardService],
        loadChildren: './components/menu/menu.module#MenuModule'
    },
    {path: '**', component: NotFound404Component},
];

