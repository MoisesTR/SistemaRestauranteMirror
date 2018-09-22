import {TelefonoProveedor} from './TelefonoProveedor';

export class Proveedor {

    public IdProductoProveedor: number;
    public IdProducto: number;
    public IdProveedor: number;
    public NombreProveedor: string;
    public Direccion: string;
    public Email: string;
    public Descripcion: string;
    public numeroRuc: string;
    public NombreRepresentante: string;
    public Documento: string;
    public Telefono1: string;
    public Telefono2: string;
    public Retencion2: number;
    public Habilitado: boolean;
    public IsMercado: number;
    public disabled: number;
    public TelefonosProveedor: TelefonoProveedor[];

    constructor() {}
}
