export class Factura {
  constructor(
    public IdFactura : number
    , public CodFactura : string
    , public IdProveedor : number
    , public IdTrabajador : number
    , public IdEstadoFactura : number
    , public NombVendedor : string
    , public FechaIngreso : string
    , public SubTotal : number
    , public TotalIva : number
    , public CambioActual : number
    , public TotalDescuento : number
    , public TotalCordobas : number
    , public Habilitado : number
    , public CreatedAt : string
    , public UpdateAt : string
  ){

  }
}
