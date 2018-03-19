export class SubClasificacionProducto{

  constructor(
    public IdSubClasificacion: number
    , public IdClasificacion: number
    , public NombreSubClasificacion: string
    , public DescripcionSubClasificacion: string
    , public Habilitado: string
  ){}
}
