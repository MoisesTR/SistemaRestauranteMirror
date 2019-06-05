import { Producto } from "./Producto";
import {FormGroup} from '@angular/forms';

export class DetalleFactura extends Producto {
	public IdDetalle: number;
	public IdFactura: number;
	public IdProducto: number;
	public PrecioUnitario: number;
	public Cantidad: number;
	public GravadoIva: number;
	public SubTotal: number;
	public Iva: number;
	public Descuento: number;
	public TotalDetalle: number;
	public Bonificacion: number;
	public IsDescuentoPorcentual: boolean;
	public IdTipDesc: number;
	public PorcentajeDescuento: number;
	public EfectivoDescuento: number;

	public NombProducto: string;
	public NombUnidad: string;

	constructor() {
		super();
	}

    guardarDatosProducto(formProducto: FormGroup) {
    }

	validarProducto() {}

}
