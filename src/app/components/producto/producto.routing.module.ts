import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginGuardService } from "@app/core/services/auth/login-guard.service";
import { PagesProductoComponent } from "@app/components/producto/pages-producto.component";
import { ListProductosComponent } from "@app/components/producto/list-productos/list-productos.component";
import { AddProductoComponent } from "@app/components/producto/add-producto/add-producto.component";
import { UpdateProductoComponent } from "@app/components/producto/update-producto/update-producto.component";
import {ConsumoInternoComponent} from '@app/components/consumo-interno/consumo-interno.component';
import {GaleriaProductosProveedoresComponent} from '@app/components/reporte/galeria-productos-proveedores.component';

export const productRoutes: Routes = [
	{
		path: "producto",
		component: PagesProductoComponent,
		canLoad: [LoginGuardService],
		data: {
			titulo: "Producto"
		},
		children: [
			{
				path: "",
				redirectTo: "list-productos",
				pathMatch: "full"
			},
			{
				path: "list-productos",
				component: ListProductosComponent,
				data: {
					titulo: "Productos"
				}
			},
			{
				path: "add",
				component: AddProductoComponent,
				data: {
					titulo: "Agregar Producto"
				}
			},
			{
				path: "update/:id",
				component: UpdateProductoComponent,
				data: {
					titulo: "Editar producto"
				}
			},
            {
                path: "busqueda-productos",
                component: GaleriaProductosProveedoresComponent,
                data: { titulo: "Busqueda Productos" }
            }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(productRoutes)],
	exports: [RouterModule]
})
export class ProductoRoutingModule {}
