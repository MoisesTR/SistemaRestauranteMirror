export class Factura {

  public IdFactura : number;
  public NumRefFactura : string;
  public CodFactura : string;
  public IdProveedor : number;
  public IdTrabajador : number;
  public IdEstadoFactura : number;
  public NombVendedor : string;
  public FechaIngreso : string;
  public SubTotal : number;
  public TotalIva : number;
  public aplicaRetencion : number;
  public Retencion : number;
  public CambioActual : number;
  public TrabajadorIngreso : string;
  public TotalDescuento : number;
  public TotalCordobas : number;
  public Habilitado : number;
  public CreatedAt : string;
  public UpdateAt : string;

  constructor(){}
}
