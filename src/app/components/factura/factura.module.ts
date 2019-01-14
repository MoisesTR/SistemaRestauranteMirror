import { NgModule } from "@angular/core";
import { AddfacturaComponent } from "./addfactura/addfactura.component";
import { DeleteFacturaComponent } from "./delete-factura/delete-factura.component";
import { ListFacturaComponent } from "./list-factura/list-factura.component";
import { BusquedafacturasComponent } from "./busquedafacturas/busquedafacturas.component";
import { FacturaRoutingModule } from "./factura.routing.module";
import { SharedModule } from "../shared-module/shared.module";
import { UpdateFacturaComponent } from "./update-factura/update-factura.component";
import { ShowFacturaComponent } from "./show-factura/show-factura.component";
import { SummaryFacturasComponent } from "./summary-facturas/summary-facturas.component";

@NgModule({
	imports: [SharedModule, FacturaRoutingModule],
	declarations: [
		AddfacturaComponent,
		DeleteFacturaComponent,
		ListFacturaComponent,
		ShowFacturaComponent,
		UpdateFacturaComponent,
		BusquedafacturasComponent,
		SummaryFacturasComponent
	],
	exports: []
})
export class FacturaModule {}
