import { DetalleFactura } from "./DetalleFactura";
import { ProductoFactura } from "./ProductoFactura";

export class Factura {
	public IdPaginacion: number;
	public IdFactura: number;
	public NumRefFactura: string;
	public CodFactura: string;
	public IdProveedor: number;
	public IdTrabajador: number;
	public IdEstadoFactura: number;
	public NombVendedor: string;
	public NombProveedor: string;
	public FechaIngreso: Date;
	public SubTotal: number = 0;
	public TotalIva: number = 0;
	public CambioActual: number = 0;
	public TrabajadorIngreso: string;
	public TotalDescuento: number = 0;
	public TotalCordobas: number = 0;
	public TotalOrigenFactura: number = 0;
	public Habilitado: number;
	public productos: DetalleFactura[];
	public Detalle: DetalleFactura[];
	public HoraIngreso: string;
	public FechaRecepcion: string;
	public FechaFactura: string;
	public ProductoFactura: ProductoFactura[];
	public respaldoFactura: string;
	public IdClasificacionGasto: number;
	public IdFormaPago: number;
	public IdTipoMoneda: number;
	public FormaPago: string;
	public Moneda: string;
	public TipoCambio: number;
	public PlazoPagos: number;
	public CreatedAt: string;
	public UpdateAt: string;
	public IvaCalculoFactura?: number = 0;
	public SubTotalConIvaFactura?: number = 0;
	public DescuentoCalculoFactura?: number = 0;
	public SubtotalFacturaConDescuento?: number = 0;
	public TotalFactura: number = 0;

	constructor() {}
}
