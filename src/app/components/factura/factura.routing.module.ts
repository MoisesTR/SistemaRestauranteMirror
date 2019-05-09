import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SummaryFacturasComponent } from "@app/components/factura/summary-facturas/summary-facturas.component";
import { ShowFacturaComponent } from "@app/components/factura/show-factura/show-factura.component";
import { UpdateFacturaComponent } from "@app/components/factura/update-factura/update-factura.component";
import { LoginGuardService } from "@app/core/services/auth/login-guard.service";
import { PagesFacturaComponent } from "@app/components/factura/pages-factura.component";
import { AddfacturaComponent } from "@app/components/factura/addfactura/addfactura.component";

export const facturaRoutes: Routes = [
	{
		path: "factura",
		component: PagesFacturaComponent,
		canLoad: [LoginGuardService],
		data: {
			titulo: "Factura"
		},
		children: [
			{
				path: "",
				redirectTo: "summaryFactura",
				pathMatch: "full"
			},
			// {
			// 	path: "busquedafacturas",
			// 	component: BusquedafacturasComponent,
			// 	data: {
			// 		titulo: "Busqueda facturas"
			// 	}
			// },
			{
				path: "showFactura/:id",
				component: ShowFacturaComponent,
				data: {
					titulo: "Mostrar factura"
				}
			},
			{
				path: "add",
				component: AddfacturaComponent,
				data: {
					titulo: "Agregar factura"
				}
			},
			{
				path: "update/:id",
				component: UpdateFacturaComponent,
				data: {
					titulo: "Editar factura"
				}
			},
			{
				path: "summaryFactura",
				component: SummaryFacturasComponent,
				data: {
					titulo: "Busqueda factura"
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(facturaRoutes)],
	exports: [RouterModule]
})
export class FacturaRoutingModule {}
