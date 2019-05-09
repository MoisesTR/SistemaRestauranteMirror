import { NgModule } from "@angular/core";
import { BuscarPipe } from "@app/pipe/buscar.pipe";
import { BuscarProductoNombrePipe } from "@app/pipe/buscar-nombre-producto.pipe";
import { BuscarProveedorPipe } from "@app/pipe/buscar-proveedor.pipe";
import { BuscarTrabajadorPipe } from "@app/pipe/buscar-trabajador.pipe";
import { FormatoComaDineroPipe } from "@app/pipe/formato-coma-dinero.pipe";
import { ImagenPipe } from "./imagen.pipe";
import { TipoDescuentoPipe } from "@app/pipe/tipo-descuento.pipe";

@NgModule({
	imports: [],
	declarations: [
		BuscarPipe,
		BuscarProductoNombrePipe,
		BuscarProveedorPipe,
		BuscarTrabajadorPipe,
		FormatoComaDineroPipe,
		ImagenPipe,
		TipoDescuentoPipe
	],
	exports: [
		BuscarPipe,
		BuscarProductoNombrePipe,
		BuscarProveedorPipe,
		BuscarTrabajadorPipe,
		FormatoComaDineroPipe,
		TipoDescuentoPipe,
		ImagenPipe
	]
})
export class PipesModule {}
