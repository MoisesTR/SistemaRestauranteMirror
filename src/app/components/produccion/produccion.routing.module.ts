import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginGuardService } from "@app/core/services/auth/login-guard.service";
import { AreaProduccionComponent } from "@app/components/produccion/area-produccion/area-produccion.component";
import { PagesProduccionComponent } from "@app/components/produccion/pages-produccion.component";
import { BodegaAreaProduccionComponent } from "@app/components/produccion/bodega-area-produccion/bodega-area-produccion.component";

const produccionRoutes: Routes = [
	{
		path: "produccion",
		component: PagesProduccionComponent,
		canLoad: [LoginGuardService],
		data: {
			titulo: "Producción"
		},
		children: [
			{
				path: "",
				redirectTo: "area-produccion",
				pathMatch: "full"
			},
			{
				path: "area-produccion",
				component: AreaProduccionComponent,
				data: {
					titulo: "Area de produccion"
				}
			},
			{
				path: "bodega-area-produccion",
				component: BodegaAreaProduccionComponent,
				data: {
					titulo: "Bodega area de produccion"
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(produccionRoutes)],
	exports: [RouterModule]
})
export class ProduccionRoutingModule {}
