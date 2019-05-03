import {Producto} from '@app/models/Producto';
import {Utils} from '@app/components/Utils';
import {FormGroup} from '@angular/forms';
import {EstadoProductoEnum} from '@app/Enums/EstadoProductoEnum';
import {TipoProductoEnum} from '@app/Enums/TipoProductoEnum';

export class ProductoAlimenticio extends Producto {

    constructor() {
		super();
	}

    guardarDatosProducto(formProducto: FormGroup) {
        this.IdTipInsumo = TipoProductoEnum.Alimento;
        this.NombProducto = formProducto.value.nombreProducto;
        this.DescProducto = formProducto.value.descripcionProducto
            ? formProducto.value.descripcionProducto
            : "Ninguna";
        this.IdEstado = EstadoProductoEnum.SinProcesar;
        this.CantidadEmpaque = formProducto.value.cantidadEmpaque ? formProducto.value.cantidadEmpaque : null;
        this.ValorUnidadMedida = formProducto.value.valorunidadmedida ? formProducto.value.valorunidadmedida : null;
        this.DiasRotacion = formProducto.value.diasRotacion ? formProducto.value.diasRotacion : 0;
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

		if (this.IdUnidadMedida && !this.ValorUnidadMedida) {
			Utils.showMsgInfo("El valor de la unidad de medida es requerida!");
			return false;
		}

		if (!this.IdUnidadMedida && this.ValorUnidadMedida) {
			Utils.showMsgInfo("La unidad de medida es requerida!");
			return false;
		}

		return true;
	}
}
