export class Usuario {

  constructor(
    public IdUsuario: number,
    public IdRol: number,
    public Username: string,
    public Estatus: string,
    public Password: string,
    public Email: string,
    public Habilitado: number,
    public CreateAt: string,
    public UpdateAt: string,
    public IdTrabajador?:number,
    public Nombres ? : string,
    public DescripcionRol ? : string
  ) {}

}
