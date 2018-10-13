import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClasificacionProducto} from '../../models/ClasificacionProducto';
import {ClasificacionProductoService} from '../../services/shared/clasificacion-producto.service';
import {ProductoService} from '../../services/shared/producto.service';
import {Producto} from '../../models/Producto';
import {Global} from '../../services/shared/global';
import {ProductoProveedorService, ProveedorService} from '../../services/service.index';
import {Proveedor} from '../../models/Proveedor';
import {Utils} from '../Utils';

declare var $: any;

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  public clasificaciones: ClasificacionProducto[];
  public proveedores: Proveedor[];
  public productos: Producto[];
  public url: string;
  public idProveedorSeleccionado: number;
  public buscando;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _clasificaionService: ClasificacionProductoService
    , private _productoService: ProductoService
    , private _proveedorService: ProveedorService
    , private _productoProveedorService: ProductoProveedorService
  ) {


  }

  ngOnInit() {

    this.url = Global.url;
    this.getProveedores();
  }

  getProveedores() {
    this._proveedorService.getProveedores(1).subscribe(
        response => {
          if (response.proveedores) {
            this.proveedores = response.proveedores;
          } else {
              Utils.showMsgInfo('Ha ocurrido un error al obtener los proveedores', 'Busqueda productos proveedor');
          }
        }, error => {
          Utils.showMsgError(error, 'Busqueda productos proveedor');
        }, () => {

        }
    );
  }

  onChangeProveedor(event) {

    if (event === null || event === undefined) {
      this.idProveedorSeleccionado = null;
    } else {
        this.idProveedorSeleccionado = event.IdProveedor;
        this.getProducosOfProveedor();
    }
  }
  getProducosOfProveedor() {
    this._productoProveedorService.getProductosOfProveedor(this.idProveedorSeleccionado).subscribe(
        response => {
          if (response.productos) {
            this.productos = response.productos;
            if (this.productos.length === 0) {
                Utils.showMsgInfo('No se han encontrado productos!', 'Busqueda productos proveedor');
            }
          } else {
            Utils.showMsgInfo('Ha ocurrido un error al obtener los productos', 'Busqueda productos proveedor');
          }
        }, error => {
            Utils.showMsgError(error, 'Busqueda productos proveedor');
        }, () => {

        }
    );
  }
}
