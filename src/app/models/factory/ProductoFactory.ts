import { ProductoAlimenticio } from "@app/models/ProductoAlimenticio";
import { ProductoLimpieza } from "@app/models/ProductoLimpieza";
import { Producto } from "@app/models/Producto";
import { TipoProductoEnum } from "@app/Enums/TipoProductoEnum";
import { ProductoFactura } from "@app/models/ProductoFactura";

export class ProductoFactory {
	public static createProducto(tipoInsumoEnum: TipoProductoEnum): Producto {
		if (TipoProductoEnum.Alimento === tipoInsumoEnum.valueOf()) return new ProductoAlimenticio();
		else if (TipoProductoEnum.Limpieza === tipoInsumoEnum.valueOf()) return new ProductoLimpieza();
		else if (TipoProductoEnum.ProductoFactura === tipoInsumoEnum.valueOf()) return new ProductoFactura();
	}
}
