import { NgModule } from "@angular/core";
import { SharedModule } from "@app/components/shared-module/shared.module";
import { SummaryGastosComponent } from "@app/components/gastos/summary-gastos/summary-gastos.component";
import { GastosComponent } from "@app/components/gastos/add-gasto/gastos.component";
import { PagesGastoComponent } from "@app/components/gastos/pages-gasto.component";
import { GastoRoutingModule } from "@app/components/gastos/gasto.routing.module";

@NgModule({
	imports: [SharedModule, GastoRoutingModule],
	declarations: [PagesGastoComponent, GastosComponent, SummaryGastosComponent]
})
export class GastoModule {}
