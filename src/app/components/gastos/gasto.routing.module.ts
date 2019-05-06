import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginGuardService } from "@app/core/services/auth/login-guard.service";
import { SummaryGastosComponent } from "@app/components/gastos/summary-gastos/summary-gastos.component";
import { GastosComponent } from "@app/components/gastos/add-gasto/gastos.component";
import { PagesGastoComponent } from "@app/components/gastos/pages-gasto.component";

export const gastoRoutes: Routes = [
	{
		path: "gasto",
		component: PagesGastoComponent,
		canLoad: [LoginGuardService],
		data: {
			titulo: "Gasto"
		},
		children: [
			{
				path: "",
				redirectTo: "summary-gastos",
				pathMatch: "full"
			},
			{
				path: "summary-gastos",
				component: SummaryGastosComponent,
				data: {
					titulo: "Busqueda gastos"
				}
			},
			{
				path: "gastos",
				component: GastosComponent,
				data: {
					titulo: "Agregar gasto"
				}
			}
		]
	}
];
@NgModule({
	imports: [RouterModule.forChild(gastoRoutes)],
	exports: [RouterModule]
})
export class GastoRoutingModule {}
