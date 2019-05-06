import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuardService} from '@app/core/services/auth/login-guard.service';
import {ListUsuariosComponent} from '@app/components/usuario/list-usuarios/list-usuarios.component';
import {UpdateUsuarioComponent} from '@app/components/usuario/update-usuario/update-usuario.component';
import {AddUsuarioComponent} from '@app/components/usuario/add-usuario/add-usuario.component';
import {PagesUsuarioComponent} from '@app/components/usuario/pages-usuario.component';
import {ListUsuarioComponent} from '@app/components/usuario/list-usuario/list-usuario.component';

export const usuarioRoutes: Routes = [
	{
		path: "usuario",
		component: PagesUsuarioComponent,
		canLoad: [LoginGuardService],
		data: {
			titulo: "Usuario"
		},
		children: [
			{
				path: "",
				redirectTo: "list-usuarios",
				pathMatch: "full"
			},
			{
				path: "list-usuarios",
				component: ListUsuariosComponent,
				data: {
					titulo: "Usuarios"
				}
			},
			{
				path: "add",
				component: AddUsuarioComponent,
				data: {
					titulo: "Agregar usuario"
				}
			},
			{
				path: "update/:id",
				component: UpdateUsuarioComponent,
				data: {
					titulo: "Actualizar usuario"
				}
			},
			{
				path: "view",
				component: ListUsuarioComponent,
				data: {
					titulo: "Ver usuario"
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(usuarioRoutes)],
	exports: [RouterModule]
})
export class UsuarioRoutingModule {}
