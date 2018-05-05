import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductoService} from '../../../services/producto.service';
import {ProveedorService} from '../../../services/proveedor.service';
import {Proveedor} from '../../../models/Proveedor';
import {IMyOptions} from '../../../typescripts/pro/date-picker/interfaces';
import {ProductoProveedorService} from '../../../services/producto-proveedor.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Global, opcionesDatePicker} from '../../../services/global';
import {isNull} from 'util';
import {ModalDirective} from '../../../typescripts/free/modals';
import {ProductoProveedor} from '../../../models/ProductoProveedor';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {Usuario} from '../../../models/Usuario';
import {UsuarioService} from '../../../services/usuario.service';
import {Factura} from '../../../models/Factura';

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
  public formDetallesFactura : FormGroup;
  public formDescuentoGeneral : FormGroup;
  public productosFactura : ProductoProveedor[];
  public productoEditar : ProductoProveedor;
  public buscando;
  public descuentoGeneralFactura : number = 0;
  public subtotalFacturaConDescuento : number = 0;
  public subTotalConIvaFactura : number = 0;
  public subTotalFactura : number = 0;
  public ivaCalculoFactura : number = 0;
  public descuentoCalculoFactura : number = 0;
  public retencionCalculoFactura : number = 0;
  public usuario : Usuario;
  public factura : Factura;
  public valorIva : number;
  public valorRetencion : number = 0.02;
  public totalFactura : number = 0;
  public formatoComaDinero;
  public aplicaRetencion : boolean = false;
  public url : string;
  @ViewChild('modalVerProducto') modalVerProducto : ModalDirective;
  @ViewChild('modalAgregarDetalleProducto') modalAgregarDetalleProducto : ModalDirective;
  @ViewChild('modalAddDescuento') modalAddDescuento : ModalDirective;

  public myDatePickerOptions: IMyOptions = opcionesDatePicker;

  constructor(
      private _route: ActivatedRoute
      , private _router: Router
      , private _productoService : ProductoService
      , private _proveedorService : ProveedorService
      , private _productoProveedorService : ProductoProveedorService
      , private _formBuilderFactura : FormBuilder
      , private _usuarioService : UsuarioService
  ) {
      this.proveedor = new Proveedor();
      this.productoSeleccionado = new ProductoProveedor();
      this.productosFactura = [];
      this.productoEditar = new ProductoProveedor();
      this.usuario = new Usuario();
      this.factura = new Factura();
      this.url = Global.url;
  }

  ngOnInit() {

    $(document).ready(()=>{
      $('.dropify').dropify();
    });

    this.getProveedores();
    this.initFormDetailProductoFactura();
    this.initFormAddFactura();
    this.initFormDetailFactura();
   // this.initFormDescuentoGeneral();
    this.usuario = this._usuarioService.getIdentity();
    this.factura.NombVendedor = this.usuario.Nombres;
    this.valorIva = 0.15;

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
          , 'codigoFactura' : new FormControl('',Validators.required)
          , 'fechaFactura' : new FormControl('',[
              Validators.required
              , CustomValidators.mayorFechaActual
          ])
          , 'horaLlegada' : new FormControl('',Validators.required)
      })
  }

  initFormDetailFactura() {
      this.formDetallesFactura = this._formBuilderFactura.group({
          'checkDescuentoGeneral' : new FormControl('',[

          ]),
          'retencion' : new FormControl('',[

          ])
      })
  }

  initFormDescuentoGeneral() {
      this.formDescuentoGeneral = this._formBuilderFactura.group({
          'descuentoGeneral' : new FormControl('',[
              CustomValidators.rangeNumber(0,100)
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

  getValueFromModalEditarDatosProducto() {

  }

  getValueFromFormFactura() {
      this.factura.CodFactura = this.formAddFactura.value.codigoFactura;
      this.factura.FechaIngreso = this.formAddFactura.value.fechaFactura;
      this.factura.IdTrabajador = this.usuario.IdTrabajador;
      this.factura.NombVendedor = this.usuario.Nombres;
  }
  editarDatosProducto() {

    this.productosFactura.forEach( (producto,index)=>{
         if(this.productosFactura[index].IdProducto == this.productoEditar.IdProducto){
             this.calcularSubtotalFactura(producto,'RESTA');

             this.productosFactura[index].Cantidad =  this.formEditarDetalleProducto.value.cantidadProducto;
             this.productosFactura[index].Costo =  this.formEditarDetalleProducto.value.precioProducto;
             this.productosFactura[index].Descuento =  this.formEditarDetalleProducto.value.descuentoTotalProducto;
             this.productosFactura[index].GravadoIva =  this.formEditarDetalleProducto.value.gravadoIva ? 1 : 0;;
         }
     });


     this.calcularSubtotalFactura(this.productoEditar,'SUMA');

     this.modalAgregarDetalleProducto.hide();
  }

  onChangeProveedor(event){

    if(isNull(event)) {
      this.proveedor.IdProveedor = null;
      this.factura.IdProveedor = null;
      this.productos = null;
      this.productosFactura = [];
      this.subtotalFacturaConDescuento = 0;
    } else {
      this.proveedor.IdProveedor = event.IdProveedor;
      this.factura.IdProveedor = event.IdProveedor;
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
      this.calcularSubtotalFactura(this.productoSeleccionado,'SUMA');
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
      this.getValueFromFormFactura();
  }

  aplicarRetencion() {
      var retencion = 0;
      this.factura.aplicaRetencion = this.formDetallesFactura.value.retencion == false ? 1 : 0;

      if(this.factura.aplicaRetencion && this.subTotalFactura > 1000) {
          retencion = this.subTotalFactura * this.valorRetencion;
          this.retencionCalculoFactura = retencion;
          this.totalFactura = (this.subTotalFactura + this.ivaCalculoFactura) - this.descuentoCalculoFactura - retencion;
      } else {
          this.retencionCalculoFactura = 0;
          this.totalFactura = (this.subTotalFactura + this.ivaCalculoFactura) - this.descuentoCalculoFactura;
      }
  }

  deleteProductoOfFactura(productoFactura : ProductoProveedor) {
    this.productos.push(productoFactura);
    this.calcularSubtotalFactura(productoFactura,'RESTA');
    this.productosFactura = this.productosFactura.filter(item => item.IdProducto != productoFactura.IdProducto);

  }

  showModalDetalleProducto(productoFactura : ProductoProveedor) {
      this.formEditarDetalleProducto.reset();
      console.log(productoFactura);
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

  calculoTotalxProducto(producto : ProductoProveedor) : number{

      var cantidadxPrecio = producto.Cantidad * producto.Costo;
      var productoConIva = cantidadxPrecio + (cantidadxPrecio * this.valorIva * producto.GravadoIva)
      var productoConDescuento = productoConIva - (productoConIva * (producto.Descuento / 100));

      return productoConDescuento;

  }

  calcularPrecioTotalxProducto(producto : ProductoProveedor) {
      var precioTotal = 0;
      var precioProducto = producto.Cantidad * producto.Costo;
      var ivaProducto = precioProducto * this.valorIva;
      var descuentoProducto = precioProducto * (producto.Descuento / 100)

      if(producto.GravadoIva) {
          precioTotal = precioProducto + ivaProducto - descuentoProducto;
      } else {
          precioTotal = precioProducto - descuentoProducto;
      }

      return precioTotal;
  }

  calcularSubtotalFactura(productoFactura : ProductoProveedor, operacion : string) {
      var productoConIva = 0;
      var productoConDescuento = 0;
      var costoProducto = productoFactura.Costo * productoFactura.Cantidad;
      var ivaDelProducto  = costoProducto * this.valorIva;
      var descuentoProducto = costoProducto * (productoFactura.Descuento / 100);

      if (operacion == 'SUMA') {

          if(productoFactura.GravadoIva) {
              productoConIva = costoProducto + costoProducto * this.valorIva;
              productoConDescuento = productoConIva - (costoProducto  * (productoFactura.Descuento / 100));
              this.subTotalFactura+= costoProducto;
              this.subtotalFacturaConDescuento+= costoProducto - (costoProducto  * (productoFactura.Descuento / 100));
              this.ivaCalculoFactura += ivaDelProducto;
              this.descuentoCalculoFactura += descuentoProducto;
              this.subTotalConIvaFactura += productoConDescuento;
          } else {
              productoConDescuento = costoProducto  - (costoProducto  * (productoFactura.Descuento / 100));
              this.descuentoCalculoFactura += descuentoProducto;
              this.subTotalFactura+= costoProducto;
              this.subtotalFacturaConDescuento+= productoConDescuento;
              this.subTotalConIvaFactura += productoConDescuento;
          }
      } else {
          if(productoFactura.GravadoIva) {
              productoConIva = costoProducto + costoProducto * this.valorIva;
              productoConDescuento = productoConIva - (costoProducto  * (productoFactura.Descuento / 100));
              this.subtotalFacturaConDescuento-= costoProducto - (costoProducto  * (productoFactura.Descuento / 100));
              this.subTotalFactura-= costoProducto;
              this.descuentoCalculoFactura -= descuentoProducto;
              this.ivaCalculoFactura -= ivaDelProducto;
              this.subTotalConIvaFactura -= productoConDescuento;
          } else {
              productoConDescuento = costoProducto - (costoProducto  * (productoFactura.Descuento / 100))
              this.subTotalFactura-= costoProducto;
              this.subTotalConIvaFactura -= productoConDescuento;
              this.descuentoCalculoFactura -= descuentoProducto;
              this.subtotalFacturaConDescuento-= productoConDescuento;
          }
      }

      var retencion = 0;

      if(this.factura.aplicaRetencion && this.subTotalFactura > 1000) {
          retencion = this.subTotalFactura * this.valorRetencion;
          this.retencionCalculoFactura = retencion;
          this.totalFactura = (this.subTotalFactura + this.ivaCalculoFactura) - this.descuentoCalculoFactura - retencion;
      } else {
          this.totalFactura = (this.subTotalFactura + this.ivaCalculoFactura) - this.descuentoCalculoFactura;
      }
  }

}
