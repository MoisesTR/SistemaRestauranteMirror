import { Producto } from "./Producto";
import { FormGroup } from "@angular/forms";

export class ProductoFactura extends Producto {
	public PrecioUnitario: number;
	public Cantidad: number;
	public ExentoIva: number;
	public Descuento: number;
	public Iva: number;
	public CalculoIva: number;
	public DetalleMenosDescuento: number;
	public GravadoIva: number;
	public FechaVencimiento: string;
	public DescuentoIngresado: number;
	public PorcentajeDescuento: number;
	public Subtotal: number;
	public IsDescuentoPorcentual: boolean;
	public TotalDetalle: number;

	constructor() {
		super();
		this.FechaVencimiento = "";
		this.Subtotal = 0;
		this.PorcentajeDescuento = 0;
		this.Iva = 0;
		this.DetalleMenosDescuento = 0;
		this.IsDescuentoPorcentual = true;
	}

	guardarDatosProducto(formProducto: FormGroup) {}

	validarProducto() {}
}
