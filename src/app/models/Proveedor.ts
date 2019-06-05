import { TelefonoProveedor } from "./TelefonoProveedor";

export class Proveedor {
	public IdProductoProveedor: number;
	public IdProducto: number;
	public IdProveedor: number;
	public NombProveedor: string;
	public NombProveedorAbreviatura: string;
	public Direccion: string;
	public Email: string;
	public DescProveedor: string;
	public numeroRuc: string;
	public NombRepresentante: string;
	public Documento: string;
	public Telefono1: string;
	public Telefono2: string;
	public Habilitado: boolean;
	public disabled: number;
	public IdPais: number;
	public IsMercado: boolean;
	public IsProvServicio: boolean;
	public Abreviatura: string;
	public IdTipDoc: number;
	public Telefonos: TelefonoProveedor[] = [];
	public HasSucursales: boolean;

	constructor() {}
}
