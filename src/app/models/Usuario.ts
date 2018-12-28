import {Pantalla} from './Pantalla';

export class Usuario {

  public IdUsuario: number;
  public IdRol: number;
  public Username: string;
  public Imagen: string;
  public Estatus: string;
  public Password: string;
  public Email: string;
  public Habilitado: number;
  public NombreRol: string;
  public CreateAt: string;
  public UpdateAt: string;
  public IdTrabajador?: number;
  public Nombres ?: string;
  public DescripcionRol ?: string;
  public Pantallas: Pantalla[];

  constructor() {}

}
