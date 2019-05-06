export class Usuario {
	public IdUsuario: number;
	public IdRol: number;
	public Username: string;
	public Imagen: string;
	public Estatus: string;
	public Password: string;
	public Email: string;
	public Habilitado: number;
	public NombRol: string;
	public NombCargo: string;
	public CreateAt: string;
	public UpdateAt: string;
	public IdTrabajador?: number;
	public Nombres?: string;
	public DescRol?: string;

	constructor() {}
}
