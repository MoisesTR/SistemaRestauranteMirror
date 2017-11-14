export class Producto{

  constructor(
  public IdProducto: number
, public IdCategoria: number
, public IdSubclasificacion: number
, public IdEnvase: number
, public IdEmpaque: number
, public IdEstado: number
, public IdProveedor: number
, public NombreProducto: string
, public Costo: number
, public Descripcion: string
, public CantidadEmpaque : number
, public Imagen: string
, public IdUnidadMedida: number
, public ValorUnidadMedida: number
, public Habilitado: number

  ){

  }

}
