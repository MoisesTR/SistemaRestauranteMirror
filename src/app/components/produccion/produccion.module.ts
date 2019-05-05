import { NgModule } from "@angular/core";
import { AreaProduccionComponent } from "./area-produccion/area-produccion.component";
import { BodegaAreaProduccionComponent } from "./bodega-area-produccion/bodega-area-produccion.component";
import {ModalModule} from "@app/components/modales/modal.module";


@NgModule({
	imports: [ModalModule],
	declarations: [AreaProduccionComponent, BodegaAreaProduccionComponent]
})
export class ProduccionModule {}
