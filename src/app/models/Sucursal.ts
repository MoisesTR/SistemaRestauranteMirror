import { TelefonoSucursal } from "./TelefonoSucursal";

export class Sucursal {
	public IdSucursal: number;
	public IdBodega: number;
	public Principal: number;
	public NombSucursal: string;
	public NombRestaurante: string;
	public IdRestaurante: number;
	public Direccion: string;
	public Telefono1: string;
	public Telefono2: string;
	public NumeroTelefono: number;
	public Habilitado: number;
	public Telefono: TelefonoSucursal[];
	public disabled: number;

	constructor() {}
}
