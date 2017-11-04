export class Trabajador{
	constructor(
		public IdTrabajador : number
		,public Imagen: string
		,public IdSucursal: number
		,public IdCargo: number
		,public Nombres: string
		,public Apellidos: string
		,public NumeroCedula: string
		,public FechaNacimiento: string
		,public Direccion: string
		,public FechaIngreso: number
		,public Habilitado: number
		){

	}
}
