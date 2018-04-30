import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductoService} from '../../../services/producto.service';
import {Producto} from '../../../models/Producto';
import {ProveedorService} from '../../../services/proveedor.service';
import {Proveedor} from '../../../models/Proveedor';
import {IMyOptions} from '../../../typescripts/pro/date-picker/interfaces';
import {ProductoProveedorService} from '../../../services/producto-proveedor.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {opcionesDatePicker} from '../../../services/global';
import {isNull} from 'util';
import {ModalDirective} from '../../../typescripts/free/modals';

declare var $:any;

@Component({
  selector: 'app-addfactura',
  templateUrl: './addfactura.component.html',
  styleUrls: ['./addfactura.component.css']
})
export class AddfacturaComponent implements OnInit {

  public productos : Producto[];
  public productoSeleccionado : Producto;
  public proveedores : Proveedor[];
  public proveedor : Proveedor;
  public formAddFactura : FormGroup;
  public productosFactura : Producto[];


  @ViewChild('modalVerProducto') modalVerProducto : ModalDirective;

  public myDatePickerOptions: IMyOptions = opcionesDatePicker;

  constructor(
      private _route: ActivatedRoute
      , private _router: Router
      , private _productoService : ProductoService
      , private _proveedorService : ProveedorService
      , private _productoProveedorService : ProductoProveedorService
      , private _formBuilderFactura : FormBuilder
  ) {
      this.proveedor = new Proveedor();
      this.productoSeleccionado = new Producto();
      this.productosFactura = [];

  }

  ngOnInit() {

    $(document).ready(()=>{
      $('.dropify').dropify();
    });

    this.getProveedores();
    this.initFormFactura();

  }

  initFormFactura() {
    this.formAddFactura = this._formBuilderFactura.group({
        'cantidadProducto' : new FormControl([

        ]),
        'precioProducto' : new FormControl([

        ]),
        'descuentoTotalProducto' : new FormControl([

        ]),
        'descuentoFactura' : new FormControl([

        ])
    })
  }


  getProveedores(){
      this._proveedorService.getProveedores().subscribe(
          response =>{
              if(response.proveedores) {
                  this.proveedores = response.proveedores;
              }
          }, error =>{

          }, ()=>{

          }
      )
  }

  crearFactura() {

  }

  onChangeProveedor(event){

    if(isNull(event)) {
      this.proveedor.IdProveedor = null;
      this.productos = null;
    } else {
      this.proveedor.IdProveedor = event.IdProveedor;
      this.getProductosOfProveedor(event.IdProveedor);
    }

  }

  mostrarProducto(producto : Producto) {
    this.productoSeleccionado = producto;
    this.modalVerProducto.show();
  }

  seleccionarProducto(producto : Producto){
      this.productoSeleccionado = producto;
      this.productos = this.productos.filter(item => item.IdProducto != producto.IdProducto);
      this.productosFactura.push(this.productoSeleccionado);
  }

  getProductosOfProveedor(IdProveedor) {
      this._productoProveedorService.getProductosOfProveedor(IdProveedor).subscribe(
          response => {
            if(response.productos) {
              this.productos = response.productos;
            }
          }, error =>{

          }, () => {

          }
      )
  }

}
