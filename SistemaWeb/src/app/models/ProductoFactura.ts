import {Producto} from './Producto';

export class ProductoFactura extends Producto {

    public PrecioUnitario: number;
    public Cantidad: number;
    public ExentoIva: number;
    public TipoDescuento: number;
    public Descuento: number;
    public GravadoIva: number;
    public FechaVencimiento: string;
    public TotalDetalle: number;

    constructor() {
        super();
        this.FechaVencimiento = '';
    }
}
