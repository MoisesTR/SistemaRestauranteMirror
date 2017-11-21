export class Producto{

  constructor(
    public IdProducto: number
      , public IdCategoria: number
      , public IdSubclasificacion: number
      , public IdEstado: number
      , public NombreProducto: string
      , public Descripcion: string
      , public Imagen: string
      , public Habilitado: number
      , public NombreClasificacion?:string
      , public NombreSubclasificacion?:string
      , public IdClasificacion?: number
  ){}

}
