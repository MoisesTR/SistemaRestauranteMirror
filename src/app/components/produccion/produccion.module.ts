import { NgModule } from "@angular/core";
import { AreaProduccionComponent } from "./area-produccion/area-produccion.component";
import { BodegaAreaProduccionComponent } from "./bodega-area-produccion/bodega-area-produccion.component";
import { PagesProduccionComponent } from "@app/components/produccion/pages-produccion.component";
import { SharedModule } from "@app/components/shared-module/shared.module";
import { ProduccionRoutingModule } from "@app/components/produccion/produccion.routing.module";

@NgModule({
	imports: [SharedModule, ProduccionRoutingModule],
	declarations: [PagesProduccionComponent, AreaProduccionComponent, BodegaAreaProduccionComponent]
})
export class ProduccionModule {}
