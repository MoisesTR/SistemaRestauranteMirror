import {TelefonoSucursal} from './TelefonoSucursal';

export class Sucursal {

  public IdSucursal: number
  public IdBodega: number
  public Principal: number
  public NombreSucursal: string
  public Direccion: string
  public NumeroTelefono: number
  public Habilitado: number
  public Telefono : TelefonoSucursal[];

  constructor(){}
}
