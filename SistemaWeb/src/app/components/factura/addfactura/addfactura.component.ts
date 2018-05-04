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
  public subtotalFactura : number = 0;
  public usuario : Usuario;
  public factura : Factura;
  public valorIva : number;
  public formatoComaDinero;
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
  }

  ngOnInit() {

    $(document).ready(()=>{
      $('.dropify').dropify();
    });

    this.getProveedores();
    this.initFormDetailProductoFactura();
    this.initFormAddFactura();
    this.initFormDetailFactura();
    this.initFormDescuentoGeneral();
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
     this.productoEditar.Cantidad = this.formEditarDetalleProducto.value.cantidadProducto;
     this.productoEditar.Costo = this.formEditarDetalleProducto.value.precioProducto;
     this.productoEditar.Descuento = this.formEditarDetalleProducto.value.descuentoTotalProducto;
     this.productoEditar.GravadoIva = this.formEditarDetalleProducto.value.gravadoIva ? 1 : 0;
  }

  getValueFromFormFactura() {
      this.factura.CodFactura = this.formAddFactura.value.codigoFactura;
      this.factura.FechaIngreso = this.formAddFactura.value.fechaFactura;
      this.factura.IdTrabajador = this.usuario.IdTrabajador;
      this.factura.NombVendedor = this.usuario.Nombres;
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

     this.calcularSubtotalFactura(this.productoEditar,'SUMA');
     this.modalAgregarDetalleProducto.hide();
  }

  onChangeProveedor(event){

    if(isNull(event)) {
      this.proveedor.IdProveedor = null;
      this.factura.IdProveedor = null;
      this.productos = null;
      this.productosFactura = [];
      this.subtotalFactura = 0;
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

      console.log(this.formDetallesFactura.value.retencion);
      // this.factura.aplicaRetencion = this.formDetallesFactura.value.retencion == true ? 1 ;
  }

  deleteProductoOfFactura(productoFactura : ProductoProveedor) {
    this.productos.push(productoFactura);
    this.calcularSubtotalFactura(productoFactura,'RESTA');
    this.productosFactura = this.productosFactura.filter(item => item.IdProducto != productoFactura.IdProducto);

  }

  aplicarDescuentoGeneral () {
        this.descuentoGeneralFactura = this.formDescuentoGeneral.value.descuentoGeneral;
        this.modalAddDescuento.hide();
  }

  descuentoGeneralSeleccion(event) {
      if(this.formDetallesFactura.value.checkDescuentoGeneral == false) {
          this.modalAddDescuento.show();
      } else {
          this.descuentoGeneralFactura = 0;
      }
  }
  showModalDetalleProducto(productoFactura : ProductoProveedor) {

      this.formEditarDetalleProducto.reset();
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
  calcularSubtotalFactura(productoFactura : ProductoProveedor, operacion : string) {

      if (operacion == 'SUMA') {
          if(productoFactura.GravadoIva) {
              this.subtotalFactura+= (productoFactura.Costo * productoFactura.Cantidad) + (productoFactura.Costo * productoFactura.Cantidad * 0.15);
          } else {
              this.subtotalFactura+= productoFactura.Costo * productoFactura.Cantidad;
          }
      } else {
          if(productoFactura.GravadoIva) {
              this.subtotalFactura-= (productoFactura.Costo * productoFactura.Cantidad) + (productoFactura.Costo * productoFactura.Cantidad * 0.15);
          } else {
              this.subtotalFactura-= productoFactura.Costo * productoFactura.Cantidad;
          }
      }
  }

}
