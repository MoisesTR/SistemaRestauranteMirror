export class Usuario {

  constructor(
    public Imagen: string,
    public IdUsuario: number,
    public IdRol: number,
    public Username : string,
    public Estatus: string,
    public Password: string,
    public Email: string
    , public IdTrabajador : number
    , public NombreCargo?: string
  ) {}

}


