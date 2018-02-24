export class Trabajador{
	constructor(
		public IdTrabajador : number
		,public IdSucursal: number
		,public IdCargo: number
		,public Nombres: string
		,public Apellidos: string
		,public NumeroCedula: string
		,public FechaNacimiento: string
		,public Direccion: string
		,public FechaIngreso: number
    ,public Telefono1 : string
    ,public Telefono2: string
		,public Habilitado: number
    , public Imagen : string
		){

	}
}
