import {Producto} from './Producto';

export class ProductoFactura extends Producto {

    public PrecioUnitario: number;
    public Cantidad: number;
    public ExentoIva: number;
    public TipoDescuento: number;
    public Descuento: number;
    public Iva: number;
    public CalculoIva: number;
    public DetalleMenosDescuento: number;
    public GravadoIva: number;
    public FechaVencimiento: string;
    public PorcentajeDescuento: number;
    public Subtotal: number;
    public TotalDetalle: number;

    constructor() {
        super();
        this.FechaVencimiento = '';
        this.Subtotal = 0;
        this.PorcentajeDescuento = 0;
        this.Iva = 0;
        this.DetalleMenosDescuento = 0;
    }
}
