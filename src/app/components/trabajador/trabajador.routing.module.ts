import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuardService} from '@app/core/services/auth/login-guard.service';
import {ListTrabajadorComponent} from '@app/components/trabajador/list-trabajador/list-trabajador.component';
import {AddTrabajadorComponent} from '@app/components/trabajador/add-trabajador/add-trabajador.component';
import {UpdateTrabajadorComponent} from '@app/components/trabajador/update-trabajador/update-trabajador.component';
import {PagesTrabajadorComponent} from '@app/components/trabajador/pages-trabajador.component';

export const trabajadorRoutes: Routes = [
	{
		path: "trabajador",
		component: PagesTrabajadorComponent,
		canLoad: [LoginGuardService],
		data: {
			titulo: "Trabajador"
		},
		children: [
			{
				path: "",
				redirectTo: "list-trabajadores",
				pathMatch: "full"
			},
			{
				path: "list-trabajadores",
				component: ListTrabajadorComponent,
				data: {
					titulo: "Trabajadores"
				}
			},
			{
				path: "add",
				component: AddTrabajadorComponent,
				data: {
					titulo: "Agregar trabajador"
				}
			},
			{
				path: "update/:id",
				component: UpdateTrabajadorComponent,
				data: {
					titulo: "Editar trabajador"
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(trabajadorRoutes)],
	exports: [RouterModule]
})
export class TrabajadorRoutingModule {}
