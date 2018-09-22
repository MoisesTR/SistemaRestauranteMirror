import {Proveedor} from './Proveedor';

export class Producto {

  public IdProducto: number;
  public IdProveedor: number;
  public IdCategoria: number;
  public IdSubClasificacion: number;
  public IdEstado: number;
  public IdEnvase: number;
  public IdEmpaque: number;
  public IdUnidadMedida: number;
  public ValorUnidadMedida: number;
  public NombreProducto: string;
  public Descripcion: string;
  public Imagen: string;
  public Habilitado: number;
  public NombreClasificacion?: string;
  public NombreSubClasificacion?: string;
  public IdClasificacion?: number;
  public DiasCaducidad?: number;
  public DiasDeUso: number;
  public Costo: number;
  public CantidadEmpaque: number;
  public Visualizar: boolean;
  public CreatedAt: string;
  public UpdateAt: string;
  public Proveedores: Proveedor[];
  public CodigoProducto: string;
  public CodigoBarra: string;
  public CodigoAlterno: string;
  public diasRotacion: number;

  constructor() {}

}
