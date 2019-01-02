import {DetalleFactura} from './DetalleFactura';
import {ProductoFactura} from './ProductoFactura';

export class Factura {

  public IdPaginacion: number;
  public IdFactura: number;
  public NumRefFactura: string;
  public CodFactura: string;
  public IdProveedor: number;
  public IdTrabajador: number;
  public IdEstadoFactura: number;
  public NombVendedor: string;
  public NombreProveedor: string;
  public FechaIngreso: Date;
  public SubTotal: number;
  public TotalIva: number;
  public aplicaRetencion: number;
  public Retencion2: boolean;
  public Retencion: number;
  public CambioActual: number;
  public TrabajadorIngreso: string;
  public TotalDescuento: number;
  public TotalCordobas: number;
  public TotalOrigenFactura: number;
  public Habilitado: number;
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

  constructor() {}
}