import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductoService} from '../../../services/producto.service';
import {ProveedorService} from '../../../services/proveedor.service';
import {Proveedor} from '../../../models/Proveedor';
import {IMyOptions} from '../../../typescripts/pro/date-picker/interfaces';
import {ProductoProveedorService} from '../../../services/producto-proveedor.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {opcionesDatePicker} from '../../../services/global';
import {isNull} from 'util';
import {ModalDirective} from '../../../typescripts/free/modals';
import {ProductoProveedor} from '../../../models/ProductoProveedor';
import {CustomValidators} from '../../../validadores/CustomValidators';

declare var $:any;

@Component({
  selector: 'app-addfactura',
  templateUrl: './addfactura.component.html',
  styleUrls: ['./addfactura.component.css']
})
export class AddfacturaComponent implements OnInit {

  public productos : ProductoProveedor[];
  public productoSeleccionado : ProductoProveedor;
  public proveedores : Proveedor[];
  public proveedor : Proveedor;
  public formEditarDetalleProducto : FormGroup;
  public formAddFactura : FormGroup;
  public productosFactura : ProductoProveedor[];
  public productoEditar : ProductoProveedor;
  public buscando;

  @ViewChild('modalVerProducto') modalVerProducto : ModalDirective;
  @ViewChild('modalAgregarDetalleProducto') modalAgregarDetalleProducto : ModalDirective;

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
      this.productoSeleccionado = new ProductoProveedor();
      this.productosFactura = [];
      this.productoEditar = new ProductoProveedor();

  }

  ngOnInit() {

    $(document).ready(()=>{
      $('.dropify').dropify();
    });

    this.getProveedores();
    this.initFormDetailProductoFactura();
    this.initFormAddFactura();

  }

  initFormDetailProductoFactura() {
    this.formEditarDetalleProducto = this._formBuilderFactura.group({
        'cantidadProducto' : new FormControl('',[
            Validators.required
            , CustomValidators.rangeNumber(1,300)
        ]),
        'precioProducto' : new FormControl('',[
            Validators.required
            , CustomValidators.rangeNumber(1,20000)
        ]),
        'descuentoTotalProducto' : new FormControl('',[
            Validators.required
                , CustomValidators.rangeNumber(0,100)
        ]),
        'gravadoIva' : new FormControl(1,[
        ])
    })
  }

  initFormAddFactura() {
      this.formAddFactura = this._formBuilderFactura.group({
          'proveedor' : new FormControl('',Validators.required)
          , 'numeroFactura' : new FormControl('',Validators.required)
          , 'fechaFactura' : new FormControl('',Validators.required)
          , 'horaLlegada' : new FormControl('',Validators.required)
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

  getValueFromModalEditarDatosProducto() {
     this.productoEditar.Cantidad = this.formEditarDetalleProducto.value.cantidadProducto;
     this.productoEditar.Costo = this.formEditarDetalleProducto.value.precioProducto;
     this.productoEditar.Descuento = this.formEditarDetalleProducto.value.descuentoTotalProducto;
     this.productoEditar.GravadoIva = this.formEditarDetalleProducto.value.gravadoIva ? 1 : 0;
  }
  editarDatosProducto() {

    this.getValueFromModalEditarDatosProducto();

    this.productosFactura.forEach( (producto,index)=>{
         if(this.productosFactura[index].IdProducto == this.productoEditar.IdProducto){
             this.productosFactura[index].Cantidad = this.productoEditar.Cantidad;
             this.productosFactura[index].Costo = this.productoEditar.Costo;
             this.productosFactura[index].Descuento = this.productoEditar.Descuento;
             this.productosFactura[index].GravadoIva = this.productoEditar.GravadoIva;
         }
     });

     this.modalAgregarDetalleProducto.hide();
  }

  onChangeProveedor(event){

    if(isNull(event)) {
      this.proveedor.IdProveedor = null;
      this.productos = null;
      this.productosFactura = [];
    } else {
      this.proveedor.IdProveedor = event.IdProveedor;
      this.productosFactura = [];
      this.getProductosOfProveedor(event.IdProveedor);
    }

  }

  mostrarProducto(producto : ProductoProveedor) {
    this.productoSeleccionado = producto;
    this.modalVerProducto.show();
  }

  seleccionarProducto(producto : ProductoProveedor){
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

  createFactura() {
      console.log('Crear factura');
  }

  deleteProductoOfFactura(productoFactura : ProductoProveedor) {
    this.productos.push(productoFactura);
    this.productosFactura = this.productosFactura.filter(item => item.IdProducto != productoFactura.IdProducto);

  }

  showModalDetalleProducto(productoFactura : ProductoProveedor) {

      this.productoEditar = productoFactura;
      this.productoEditar.GravadoIva = productoFactura.GravadoIva;
      this.formEditarDetalleProducto.setValue({
          cantidadProducto : this.productoEditar.Cantidad
          , precioProducto : this.productoEditar.Costo
          , descuentoTotalProducto : this.productoEditar.Descuento
          , gravadoIva : this.productoEditar.GravadoIva
      });

      this.modalAgregarDetalleProducto.show();
  }

}
