import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { AddProductoComponent } from "./add-producto/add-producto.component";
import { ListProductosComponent } from "./list-productos/list-productos.component";
import { UpdateProductoComponent } from "./update-producto/update-producto.component";
import { ProductoRoutingModule } from "./producto.routing.module";
import { ModalModule } from "@app/components/modales/modal.module";
import { PagesProductoComponent } from "@app/components/producto/pages-producto.component";

@NgModule({
	imports: [ModalModule, ProductoRoutingModule],
	declarations: [PagesProductoComponent, AddProductoComponent, ListProductosComponent, UpdateProductoComponent],
	exports: [],
	schemas: [NO_ERRORS_SCHEMA]
})
export class ProductoModule {}
