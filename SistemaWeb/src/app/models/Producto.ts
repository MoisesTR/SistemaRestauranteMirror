export class Producto{

  public IdProducto: number;
  public IdProveedor : number;
  public IdCategoria: number;
  public IdSubClasificacion: number;
  public IdEstado: number;
  public IdEnvase : number;
  public IdEmpaque : number;
  public IdUnidadMedida : number;
  public ValorUnidadMedida : number;
  public NombreProducto: string
  public Descripcion: string;
  public Imagen: string;
  public Habilitado: number;
  public NombreClasificacion?:string;
  public NombreSubclasificacion?:string;
  public IdClasificacion?: number;
  public DiasCaducidad?: number;
  public Costo : number;
  public CantidadEmpaque : number;
  public valorUnidadMedida : number;
  public Visualizar : boolean = true;
  public CreatedAt: string;
  public UpdateAt: string;

  constructor(){}

}
