import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginGuardService } from "@app/core/services/auth/login-guard.service";
import { UpdateProveedorComponent } from "@app/components/proveedor/update-proveedor/update-proveedor.component";
import { ListProveedorComponent } from "@app/components/proveedor/list-proveedor/list-proveedor.component";
import { AddProveedorComponent } from "@app/components/proveedor/add-proveedor/add-proveedor.component";
import { PagesProveedorComponent } from "@app/components/proveedor/pages-proveedor.component";

export const proveedorRoutes: Routes = [
	{
		path: "proveedor",
		component: PagesProveedorComponent,
		canLoad: [LoginGuardService],
		data: {
			titulo: "Proveedor"
		},
		children: [
			{
				path: "",
				redirectTo: "list-proveedores",
				pathMatch: "full"
			},
			{
				path: "list-proveedores",
				component: ListProveedorComponent,
				data: {
					titulo: "Proveedores"
				}
			},
			{
				path: "add",
				component: AddProveedorComponent,
				data: {
					titulo: "Agregar proveedor"
				}
			},
			{
				path: "update/:id",
				component: UpdateProveedorComponent,
				data: {
					titulo: "Editar proveedor"
				}
			}
		]
	}
];
@NgModule({
	imports: [RouterModule.forChild(proveedorRoutes)],
	exports: [RouterModule]
})
export class ProveedorRoutingModule {}
