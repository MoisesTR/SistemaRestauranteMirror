import { Proveedor } from "./Proveedor";
import { FormGroup } from "@angular/forms";
import { TipoProductoEnum } from "@app/Enums/TipoProductoEnum";
import { EstadoProductoEnum } from "@app/Enums/EstadoProductoEnum";

export abstract class Producto {
	public IdProducto: number;
	public IdProveedor: number;
	public IdCategoria: number;
	public IdSubClasificacion: number;
	public IdEstado: number;
	public IdEnvase: number;
	public IdEmpaque: number;
	public IdUnidadMedida: number;
	public ValorUnidadMedida: number;
	public NombProducto: string;
	public DescProducto: string;
	public Imagen: string;
	public Habilitado: number;
	public NombCategoria: string;
	public NombClasificacion?: string;
	public NombSubClasificacion?: string;
	public NombEmpaque: string;
	public NombEnvase: string;
	public IdClasificacion?: number;
	public Costo: number;
	public CantidadEmpaque: number;
	public CreatedAt: string;
	public UpdateAt: string;
	public IdTipInsumo: number;
	public DescTipInsumo: string;
	public Proveedores: Proveedor[];
	public CodBarra: string;
	public CodProd: string;
	public CodOriginal: string;
	public DiasRotacion: number;
	public ConsumoDirecto: boolean;
	public IsGranel: boolean;
    public NombTipInsumo: string;

	constructor() {
		this.CodBarra = null;
		this.CodProd = null;
		this.CodOriginal = null;
		this.DescTipInsumo = "";
		this.ConsumoDirecto = false;
		this.IsGranel = false;
	}

	abstract guardarDatosProducto(formProducto: FormGroup);
	abstract validarProducto();
}
