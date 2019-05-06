import { NgModule } from "@angular/core";
import { AddTrabajadorComponent } from "./add-trabajador/add-trabajador.component";
import { ListTrabajadorComponent } from "./list-trabajador/list-trabajador.component";
import { UpdateTrabajadorComponent } from "./update-trabajador/update-trabajador.component";
import { SharedModule } from "../shared-module/shared.module";
import { TrabajadorRoutingModule } from "@app/components/trabajador/trabajador.routing.module";
import { PagesTrabajadorComponent } from "@app/components/trabajador/pages-trabajador.component";

@NgModule({
	imports: [SharedModule, TrabajadorRoutingModule],
	declarations: [PagesTrabajadorComponent, AddTrabajadorComponent, ListTrabajadorComponent, UpdateTrabajadorComponent]
})
export class TrabajadorModule {}
