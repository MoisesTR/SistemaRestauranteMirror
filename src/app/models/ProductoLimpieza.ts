import { Producto } from "@app/models/Producto";
import { Utils } from "@app/components/Utils";
import { FormGroup } from "@angular/forms";
import { EstadoProductoEnum } from "@app/Enums/EstadoProductoEnum";
import { TipoProductoEnum } from "@app/Enums/TipoProductoEnum";

export class ProductoLimpieza extends Producto {
	constructor() {
		super();
	}

	guardarDatosProducto(formProducto: FormGroup) {
		this.IdTipInsumo = TipoProductoEnum.Limpieza;
		this.NombProducto = formProducto.value.nombreProducto;
		this.DescProducto = formProducto.value.descripcionProducto ? formProducto.value.descripcionProducto : "Ninguna";
		this.IdEstado = EstadoProductoEnum.SinProcesar;
		this.CantidadEmpaque = formProducto.value.cantidadEmpaque ? formProducto.value.cantidadEmpaque : null;
		this.DiasRotacion = 0;
		this.CodProd = formProducto.value.codigoOriginal;
		this.CodOriginal = formProducto.value.codigoInterno;
		this.CodBarra = this.CodProd;
		this.Imagen = this.Imagen ? this.Imagen : "";
	}

	validarProducto() {
		if (this.IdEmpaque && !this.CantidadEmpaque) {
			Utils.showMsgInfo("La cantidad de empaque es requerida!");
			return false;
		}

		if (!this.IdEmpaque && this.CantidadEmpaque) {
			Utils.showMsgInfo("El empaque es requerido!");
			return false;
		}

		return true;
	}
}
