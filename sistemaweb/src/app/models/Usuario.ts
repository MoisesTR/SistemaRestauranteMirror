export class Usuario {

  constructor(
    public IdUsuario: number,
    public RolUsuario: string,
    public UsuarioNombre: string,
    public Estatus: string,
    public Contrasenia: string,
    public Correo: string
  ) {}

}