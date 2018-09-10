import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductoService} from '../../../services/shared/producto.service';
import {ProveedorService} from '../../../services/shared/proveedor.service';
import {Proveedor} from '../../../models/Proveedor';
import {ProductoProveedorService} from '../../../services/shared/producto-proveedor.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Global, opcionesDatePicker} from '../../../services/shared/global';
import {IMyOptions, ModalDirective} from 'ng-uikit-pro-standard';
import {ProductoProveedor} from '../../../models/ProductoProveedor';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {Usuario} from '../../../models/Usuario';
import {UsuarioService} from '../../../services/shared/usuario.service';
import {Factura} from '../../../models/Factura';
import {FacturaService} from '../../../services/shared/factura.service';
import {Utils} from '../../Utils';
import {DetalleFactura} from '../../../models/DetalleFactura';

declare var $: any;

@Component({
    selector: 'app-addfactura',
    templateUrl: './addfactura.component.html',
    styleUrls: ['./addfactura.component.css']
})
export class AddfacturaComponent implements OnInit {

    public productos: ProductoProveedor[];
    public productoSeleccionado: ProductoProveedor;
    public proveedores: Proveedor[];
    public proveedor: Proveedor;
    public detalleFactura: DetalleFactura;
    public formEditarDetalleProducto: FormGroup;
    public formAddFactura: FormGroup;
    public formDetallesFactura: FormGroup;
    public formDescuentoGeneral: FormGroup;
    public productosFactura: ProductoProveedor[];
    public productoEditar: ProductoProveedor;
    public buscando;
    public descuentoGeneralFactura = 0;
    public subtotalFacturaConDescuento = 0;
    public subTotalConIvaFactura = 0;
    public subTotalFactura = 0;
    public ivaCalculoFactura = 0;
    public descuentoCalculoFactura = 0;
    public retencionCalculoFactura = 0;
    public usuario: Usuario;
    public factura: Factura;
    public valorIva: number;
    public valorRetencion = 0.02;
    public totalFactura = 0;
    public formatoComaDinero;
    public aplicaRetencion = false;
    public url: string;
    public tieneRetencion = false;
    public IdMonedaSeleccionada: number;
    public IdFormaPagoSeleccionado: number;
    public simboloMonedaUtilizado: string;
    public mostrarComboPlazoPagos = false;
    public mostrarComboTipoMoneda = false;
    Moneda = [
        {Id: 1, Moneda: 'Córdobas'}
        , {Id: 2, Moneda: 'Dólares'},
    ];

    FormaPago = [
        {Id: 1, FormaPago: 'Contado'}
        , {Id: 2, FormaPago: 'Crédito'},
    ];

    @ViewChild('modalVerProducto') modalVerProducto: ModalDirective;
    @ViewChild('modalAgregarDetalleProducto') modalAgregarDetalleProducto: ModalDirective;
    @ViewChild('modalAddDescuento') modalAddDescuento: ModalDirective;

    public myDatePickerOptions: IMyOptions = opcionesDatePicker;

    constructor(
        private _route: ActivatedRoute
        , private _router: Router
        , private _productoService: ProductoService
        , private _proveedorService: ProveedorService
        , private _productoProveedorService: ProductoProveedorService
        , private _formBuilderFactura: FormBuilder
        , private _usuarioService: UsuarioService
        , private _facturaService: FacturaService
    ) {
        this.proveedor = new Proveedor();
        this.productoSeleccionado = new ProductoProveedor();
        this.productosFactura = [];
        this.productoEditar = new ProductoProveedor();
        this.usuario = new Usuario();
        this.factura = new Factura();
        this.url = Global.url;
        this.IdMonedaSeleccionada = 1;
        this.IdFormaPagoSeleccionado = 1;
        this.simboloMonedaUtilizado = 'C$';
    }

    ngOnInit() {
        this.getProveedores();
        this.initFormDetailProductoFactura();
        this.initFormAddFactura();
        this.initFormDetailFactura();

        this.usuario = this._usuarioService.getIdentity();
        this.valorIva = 0.15;

    }

    initFormDetailProductoFactura() {
        this.formEditarDetalleProducto = this._formBuilderFactura.group({
            'cantidadProducto': new FormControl('', [
                Validators.required
                , CustomValidators.rangeNumber(1, 300)
            ]),
            'precioProducto': new FormControl('', [
                Validators.required
                , CustomValidators.rangeNumber(1, 20000)
            ]),
            'descuentoTotalProducto': new FormControl(0, []),
            'gravadoIva': new FormControl(1, [])
        });
    }

    initFormAddFactura() {
        this.formAddFactura = this._formBuilderFactura.group({
            'proveedor': new FormControl('', Validators.required)
            , 'codigoFactura': new FormControl('', Validators.required)
            , 'fechaFactura': new FormControl('', [
                Validators.required
            ])
            , 'Moneda': new FormControl('', Validators.required)
            , 'FormaPago': new FormControl('', Validators.required)
            , 'TipoCambio': new FormControl('')
            , 'PlazoPagos': new FormControl('')
        });
    }

    initFormDetailFactura() {
        this.formDetallesFactura = this._formBuilderFactura.group({
            'checkDescuentoGeneral': new FormControl('', []),
            'retencion': new FormControl(false, [])
        });
    }

    initFormDescuentoGeneral() {
        this.formDescuentoGeneral = this._formBuilderFactura.group({
            'descuentoGeneral': new FormControl('', [
                CustomValidators.rangeNumber(0, 100)
            ])
        });
    }


    getProveedores() {
        this._proveedorService.getProveedores().subscribe(
            response => {
                if (response.proveedores) {
                    this.proveedores = response.proveedores;
                }
            }, error => {

            }, () => {

            }
        );
    }

    getValueFromFormFactura() {
        this.factura.NumRefFactura = this.formAddFactura.value.codigoFactura;
        this.factura.IdTrabajador = this.usuario.IdTrabajador;
        this.factura.NombVendedor = this.usuario.Nombres;
        this.factura.FechaIngreso = this.formAddFactura.value.fechaFactura;
        this.factura.SubTotal = this.subTotalFactura;
        this.factura.TotalIva = this.ivaCalculoFactura;
        this.factura.CambioActual = 31.50;
        this.factura.TotalDescuento = this.descuentoCalculoFactura;
        this.factura.TotalCordobas = this.totalFactura;
        this.factura.Retencion = this.tieneRetencion === true ? 1 : 0;
        this.factura.NombVendedor = this.proveedores.filter(
            item => item.IdProveedor === this.proveedor.IdProveedor)[0].NombreRepresentante;
        console.log(this.factura.NombVendedor);
    }

    editarDatosProducto() {
        this.productosFactura.forEach((producto, index) => {
            if (this.productosFactura[index].IdProducto === this.productoEditar.IdProducto) {

                // Hacer la operacion de resta en la factura solamente si ya ingreso previamente los datos de un producto
                if (this.totalFactura > 0 && this.productosFactura[index].Costo > 0) {
                    this.calcularSubtotalFactura(producto, 'RESTA');
                }
                // Actualizar los datos del producto editado en la factura
                this.productosFactura[index].Cantidad = this.formEditarDetalleProducto.value.cantidadProducto;
                this.productosFactura[index].Costo = this.formEditarDetalleProducto.value.precioProducto;
                this.productosFactura[index].Descuento = this.formEditarDetalleProducto.value.descuentoTotalProducto;
                this.productosFactura[index].GravadoIva = this.formEditarDetalleProducto.value.gravadoIva ? 1 : 0;
                this.productosFactura[index].TotalDetalle = this.calcularPrecioTotalxProducto(this.productoEditar);
            }
        });

        // Hacer el calculo con el producto editado
        this.calcularSubtotalFactura(this.productoEditar, 'SUMA');

        this.modalAgregarDetalleProducto.hide();
    }

    onChangeProveedor(event) {

        if (event === null || event === undefined) {
            this.proveedor.IdProveedor = null;
            this.factura.IdProveedor = null;
            this.productos = null;
            this.productosFactura = [];
            this.subtotalFacturaConDescuento = 0;
            this.tieneRetencion = false;
        } else {
            this.proveedor.IdProveedor = event.IdProveedor;
            this.factura.IdProveedor = event.IdProveedor;
            this.productosFactura = [];
            this.getProductosOfProveedor(event.IdProveedor);
            this.tieneRetencion = event.Retencion2;
        }

    }

    changeMoneda(event) {

        if (event === null || event === undefined) {
            this.IdMonedaSeleccionada = null;
            this.simboloMonedaUtilizado =  'C$';
            this.mostrarComboTipoMoneda = false;
        } else {
            this.IdMonedaSeleccionada = event.Id;
            this.simboloMonedaUtilizado = event.Id === 1 ? 'C$' : '$';
            this.mostrarComboTipoMoneda = event.Id === 2;
        }
    }

    changeFormaPlazoPago(event) {
        if (event === null || event === undefined) {
            this.mostrarComboPlazoPagos = false;
        } else {
            if (event.Id === 2) {
                this.mostrarComboPlazoPagos = true;
            } else {
                this.mostrarComboPlazoPagos = false;
            }
        }
    }

    mostrarProducto(producto: ProductoProveedor) {
        this.productoSeleccionado = producto;
        this.modalVerProducto.show();
    }

    seleccionarProducto(producto: ProductoProveedor) {
        this.productoSeleccionado = producto;
        this.productos = this.productos.filter(item => item.IdProducto !== producto.IdProducto);
        this.productosFactura.push(this.productoSeleccionado);
    }

    getProductosOfProveedor(IdProveedor) {
        this._productoProveedorService.getProductosOfProveedor(IdProveedor).subscribe(
            response => {
                if (response.productos) {
                    this.productos = response.productos;
                    this.productos.forEach( (value, index) => {
                       this.productos[index].Costo = 0;
                       this.productos[index].TotalDetalle = 0;
                    });
                }
            }, error => {

            }, () => {

            }
        );
    }

    existenMontosMenorIgualaCero() {
        let menorIgualCero = false;
        this.productosFactura.forEach((value, index) => {
            if (value.TotalDetalle === undefined) {
                menorIgualCero = true;
            } else if (value.TotalDetalle <= 0) {
                menorIgualCero = true;
            }
        });

        return menorIgualCero;
    }

    crearFactura() {
        this.existenMontosMenorIgualaCero();

        if (this.productosFactura.length < 1) {
            Utils.showMsgInfo('Selecciona al menos un producto para crear la factura', 'Factura');
        }  else if (this.totalFactura === 0) {
            Utils.showMsgInfo('El total de la factura no puede ser igual a cero!', 'Factura');
        } else if (this.existenMontosMenorIgualaCero()) {
            Utils.showMsgInfo('El costo total de cada producto en la factura debe ser mayor cero', 'Factura');
        } else {
            this.getValueFromFormFactura();
            this._facturaService.createFactura(this.factura).subscribe(
                response => {
                    if (response.IdFactura) {
                        this.crearDetalleFactura(response.IdFactura);
                    } else {
                        Utils.showMsgInfo('Ha ocurrido un error al crear la factura');
                    }
                }, error => {
                    Utils.showMsgError(Utils.msgError(error));
                }
            );
        }
    }

    crearDetalleFactura(IdFactura: number) {

        this.productosFactura.forEach((value, index) => {
            this.detalleFactura = new DetalleFactura();
            this.detalleFactura.IdFactura = IdFactura;
            this.detalleFactura.IdProducto = value.IdProducto;
            this.detalleFactura.PrecioUnitario = value.Costo;
            this.detalleFactura.Cantidad = value.Cantidad;
            this.detalleFactura.GravadoIva = value.GravadoIva;
            this.detalleFactura.SubTotal = value.Costo * value.Cantidad;
            this.detalleFactura.Iva = value.GravadoIva === 1 ? value.Costo * 0.15 : 0;
            this.detalleFactura.Descuento = value.Descuento;
            this.detalleFactura.TotalDetalle = this.calcularPrecioTotalxProducto(value);
            this.detalleFactura.Bonificacion = 0;

            this._facturaService.createDetailFactura(this.detalleFactura).subscribe(
                response => {
                    if (response.IdDetalle) {

                    } else {
                        Utils.showMsgInfo('Ha ocurrido un error al insertar el detalle del producto' + value.IdProducto);
                    }
                }, error => {
                    Utils.showMsgError(Utils.msgError(error));
                }
            );

            if (index === (this.productosFactura.length - 1)) {
                Utils.showMsgSucces('La factura se ha creado exitosamente');
                this._router.navigate(['/factura/busquedafacturas']);
            }
        });
    }

    aplicarRetencion() {
        let retencion = 0;
        this.factura.aplicaRetencion = this.formDetallesFactura.value.retencion === false ? 1 : 0;

        if (this.factura.aplicaRetencion && this.subTotalFactura > 1000) {
            retencion = this.subTotalFactura * this.valorRetencion;
            this.retencionCalculoFactura = retencion;
            this.totalFactura = (this.subTotalFactura + this.ivaCalculoFactura) - this.descuentoCalculoFactura - retencion;
        } else {
            this.retencionCalculoFactura = 0;
            this.totalFactura = (this.subTotalFactura + this.ivaCalculoFactura) - this.descuentoCalculoFactura;
        }
    }

    eliminarProductoDeFactura(productoFactura: ProductoProveedor) {
        this.productos.push(productoFactura);
        this.calcularSubtotalFactura(productoFactura, 'RESTA');
        this.productosFactura = this.productosFactura.filter(item => item.IdProducto !== productoFactura.IdProducto);

    }

    agregarProveedor() {
        this._router.navigate(['proveedor/add']);
    }

    agregarProducto() {
        this._router.navigate(['producto/add']);
    }

    showModalDetalleProducto(productoFactura: ProductoProveedor) {
        this.formEditarDetalleProducto.reset();
        this.productoEditar = productoFactura;
        this.productoEditar.GravadoIva = productoFactura.GravadoIva;
        this.formEditarDetalleProducto.setValue({
            cantidadProducto: undefined === this.productoEditar.Cantidad ? 1 : this.productoEditar.Cantidad
            , precioProducto: undefined === this.productoEditar.Costo ? 0 : this.productoEditar.Costo
            , descuentoTotalProducto: undefined === this.productoEditar.Descuento ? 0 : this.productoEditar.Descuento
            , gravadoIva: undefined === this.productoEditar.GravadoIva ? 0 : this.productoEditar.GravadoIva
        });

        this.modalAgregarDetalleProducto.show();
    }

    calcularPrecioTotalxProducto(producto: ProductoProveedor) {
        let precioTotal = 0;
        const precioProducto = producto.Cantidad * producto.Costo;
        const ivaProducto = precioProducto * this.valorIva;
        const descuentoProducto = precioProducto * (producto.Descuento / 100);

        if (producto.GravadoIva) {
            precioTotal = precioProducto + ivaProducto - descuentoProducto;
        } else {
            precioTotal = precioProducto - descuentoProducto;
        }

        return isNaN(precioTotal) ? 0 : precioTotal;
    }

    calcularSubtotalFactura(productoFactura: ProductoProveedor, operacion: string) {
        let productoConIva = 0;
        let productoConDescuento = 0;
        const costoProducto = productoFactura.Costo * productoFactura.Cantidad;
        const ivaDelProducto = costoProducto * this.valorIva;
        const descuentoProducto = costoProducto * (productoFactura.Descuento / 100);

        if (operacion === 'SUMA') {

            if (productoFactura.GravadoIva) {
                productoConIva = costoProducto + costoProducto * this.valorIva;
                productoConDescuento = productoConIva - (costoProducto * (productoFactura.Descuento / 100));
                this.subTotalFactura += costoProducto;
                this.subtotalFacturaConDescuento += costoProducto - (costoProducto * (productoFactura.Descuento / 100));
                this.ivaCalculoFactura += ivaDelProducto;
                this.descuentoCalculoFactura += descuentoProducto;
                this.subTotalConIvaFactura += productoConDescuento;
            } else {
                productoConDescuento = costoProducto - (costoProducto * (productoFactura.Descuento / 100));
                this.descuentoCalculoFactura += descuentoProducto;
                this.subTotalFactura += costoProducto;
                this.subtotalFacturaConDescuento += productoConDescuento;
                this.subTotalConIvaFactura += productoConDescuento;
            }
        } else {
            if (productoFactura.GravadoIva) {
                productoConIva = costoProducto + costoProducto * this.valorIva;
                productoConDescuento = productoConIva - (costoProducto * (productoFactura.Descuento / 100));
                this.subtotalFacturaConDescuento -= costoProducto - (costoProducto * (productoFactura.Descuento / 100));
                this.subTotalFactura -= costoProducto;
                this.descuentoCalculoFactura -= descuentoProducto;
                this.ivaCalculoFactura -= ivaDelProducto;
                this.subTotalConIvaFactura -= productoConDescuento;
            } else {
                productoConDescuento = costoProducto - (costoProducto * (productoFactura.Descuento / 100));
                this.subTotalFactura -= costoProducto;
                this.subTotalConIvaFactura -= productoConDescuento;
                this.descuentoCalculoFactura -= descuentoProducto;
                this.subtotalFacturaConDescuento -= productoConDescuento;
            }
        }

        let retencion = 0;

        if (this.factura.aplicaRetencion && this.subTotalFactura > 1000) {
            retencion = this.subTotalFactura * this.valorRetencion;
            this.retencionCalculoFactura = retencion;
            this.totalFactura = (this.subTotalFactura + this.ivaCalculoFactura) - this.descuentoCalculoFactura - retencion;
        } else {
            this.totalFactura = (this.subTotalFactura + this.ivaCalculoFactura) - this.descuentoCalculoFactura;
        }
    }


    eventTipoDescuento(event, i) {

        const porcentual = document.getElementById('span-porcentual' +  i);
        const efectivo = document.getElementById('span-efectivo' + i);

        if ( event.target.checked ) {
            efectivo.style.display = 'block';
            porcentual.style.display = 'none';
        } else {
            efectivo.style.display = 'none';
            porcentual.style.display = 'block';
        }

    }

}
