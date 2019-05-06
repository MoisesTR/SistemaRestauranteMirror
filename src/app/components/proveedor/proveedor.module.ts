import { NgModule } from "@angular/core";
import { AddProveedorComponent } from "./add-proveedor/add-proveedor.component";
import { UpdateProveedorComponent } from "./update-proveedor/update-proveedor.component";
import { ListProveedorComponent } from "./list-proveedor/list-proveedor.component";
import { SharedModule } from "../shared-module/shared.module";
import { ProveedorRoutingModule } from "./proveedor.routing.module";
import { PagesProveedorComponent } from "@app/components/proveedor/pages-proveedor.component";

@NgModule({
	imports: [SharedModule, ProveedorRoutingModule],
	declarations: [PagesProveedorComponent, AddProveedorComponent, UpdateProveedorComponent, ListProveedorComponent]
})
export class ProveedorModule {}
