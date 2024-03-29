import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {MenuComponent} from './components/menu/menu.component';
import {NotFound404Component} from './components/not-found-404/not-found-404.component';
import {SettingsRestauranteComponent} from './components/settings-restaurante/settings-restaurante.component';
import {AuthGuardService} from '@app/core/service.index';
import {NgModule} from '@angular/core';
import {LoginGuardService} from '@app/core/services/auth/login-guard.service';
import {ErrorComponent} from '@app/core/error/error.component';

export const ROUTES: Routes = [
	{
		path: "login",
		component: LoginComponent,
        canLoad: [LoginGuardService],
		data: {
			titulo: "Login"
		}
	},
	{
		path: "configuraciones/restaurante",
		canActivate: [AuthGuardService],
		component: SettingsRestauranteComponent,
		data: {
			titulo: "Restaurante"
		}
	},
    {
        path: "error",
        component: ErrorComponent,
        data: {
            titulo: "Error Interfaz"
        }
    },
	{
		path: "",
		component: MenuComponent,
		canActivate: [AuthGuardService],
		loadChildren: "./components/menu/menu.module#MenuModule",
		data: {
			titulo: "Menu"
		}
	},
	{
		path: "**",
		component: NotFound404Component,
		data: {
			titulo: "No encontrado"
		}
	}
];

@NgModule({
	imports: [RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
