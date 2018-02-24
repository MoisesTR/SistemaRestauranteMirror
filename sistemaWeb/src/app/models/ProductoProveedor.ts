export class ProductoProveedor{

	constructor(
		 public IdProductoProvedor:number
		,public IdProducto:number
		,public IdProveedor:number
		,public IdEnvase:number
		,public IdEmpaque:number
		,public IdUnidadMedida
		,public CantidadEmpaque:number
		,public ValorUnidadMedida:number
     , public Caducidad
		,public Costo:number
		,public Habilitado:number

		){


	}
}
