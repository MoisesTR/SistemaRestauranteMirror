export class SubClasificacionProducto{

  constructor(
    public IdSubclasificacion: number
    , public IdClasificacion: number
    , public NombreSubclasificacion: string
    , public DescripcionSubclasificacion: string
    , public Habilitado: string
  ){}
}
