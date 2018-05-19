export class ProductoProveedor{

    public IdProducto : number;
    public NombreProducto : string;
    public Costo : number;
    public Descripcion : string;
    public IdCategoria : number;
    public NombreCategoria : string;
    public IdSubClasificacion : number;
    public NombreSubClasificacion : string;
    public IdClasificacion : number;
    public NombreClasificacion : string;
    public IdEnvase : number;
    public IdEmpaque;
    public NombreEmpaque : string;
    public CantidadEmpaque : number;
    public Imagen : string;
    public IdUnidadMedida : number;
    public NombreUnidad : string;
    public ValorUnidadMedida : number;
    public IdEstado : number;
    public Nombre : string;
    public IdProveedor : number;
    public NombreProveedor : string;
    public Habilitado : boolean;
    public DiasCaducidad : number;
    public GravadoIva : number;
    public createdAt : string;
    public UpdateAt : string;
    public Cantidad : number = 1;
    public Descuento : number = 0;
    public Retencion2 : number;

	constructor(
    ){}
}
