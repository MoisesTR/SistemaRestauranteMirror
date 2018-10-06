import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductoService} from '../../../services/shared/producto.service';
import {Proveedor} from '../../../models/Proveedor';
import {ProductoProveedorService} from '../../../services/shared/producto-proveedor.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CARPETA_FACTURA, Global, opcionesDatePicker} from '../../../services/shared/global';
import {IMyOptions, ModalDirective, ToastService} from 'ng-uikit-pro-standard';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {Usuario} from '../../../models/Usuario';
import {UsuarioService} from '../../../services/shared/usuario.service';
import {Factura} from '../../../models/Factura';
import {FacturaService} from '../../../services/shared/factura.service';
import {Utils} from '../../Utils';
import {DetalleFactura} from '../../../models/DetalleFactura';
import {ProductoFactura} from '../../../models/ProductoFactura';
import {ProveedorService, UploadService} from '../../../services/service.index';

declare var $: any;

@Component({
    selector: 'app-addfactura',
    templateUrl: './addfactura.component.html',
    styleUrls: ['./addfactura.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddfacturaComponent implements OnInit {

    public productos: ProductoFactura[];
    public productoSeleccionado: ProductoFactura;
    public proveedores: Proveedor[];
    public proveedor: Proveedor;
    public detalleFactura: DetalleFactura;
    public formEditarDetalleProducto: FormGroup;
    public formAddFactura: FormGroup;
    public formDetallesFactura: FormGroup;
    public formDescuentoGeneral: FormGroup;
    public productosFactura: ProductoFactura[];
    public productosFiltrados: ProductoFactura[];
    public productosProveedor: ProductoFactura[];
    public productoEditar: ProductoFactura;
    public buscando = '';
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
    public tituloPantalla: 'Factura';
    public fechaVencimiento: string;
    public filesToUpload: Array<File>;

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
        , private toastrService: ToastService
        , private _uploadService: UploadService
        , private cdr: ChangeDetectorRef
    ) {
        this.proveedor = new Proveedor();
        this.productoSeleccionado = new ProductoFactura();
        this.productosFactura = [];
        this.productosFiltrados = [];
        this.productosProveedor = [];
        this.productoEditar = new ProductoFactura();
        this.usuario = new Usuario();
        this.factura = new Factura();
        this.url = Global.url;
        this.IdMonedaSeleccionada = 1;
        this.IdFormaPagoSeleccionado = 1;
        this.simboloMonedaUtilizado = 'C$';
    }

    ngOnInit() {
        $(document).ready(() => {
            $('.dropify').dropify();
        });

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
            , 'fechaRecepcion': new FormControl('', [
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
        this.factura.FechaFactura = this.formAddFactura.value.fechaFactura;
        this.factura.FechaRecepcion = this.formAddFactura.value.fechaRecepcion;
        this.factura.SubTotal = this.subTotalFactura;
        this.factura.TotalIva = this.ivaCalculoFactura;
        this.factura.CambioActual = 32;
        this.factura.TotalDescuento = this.descuentoCalculoFactura;
        this.factura.TotalCordobas = this.totalFactura;
        this.factura.Retencion = this.tieneRetencion === true ? 1 : 0;
        this.factura.IdTipoMoneda = this.IdMonedaSeleccionada;
        this.factura.FormaPago = 'Contado';
        this.factura.IdFormaPago = 1;
        this.factura.NombVendedor = this.proveedores.filter(
            item => item.IdProveedor === this.proveedor.IdProveedor)[0].NombreRepresentante;
    }

    onChangeProveedor(event) {

        if (event === null || event === undefined) {
            this.proveedor.IdProveedor = null;
            this.factura.IdProveedor = null;
            this.productos = null;
            this.productosFactura = [];
            this.productosFiltrados = [];
            this.buscando = '';
            this.subtotalFacturaConDescuento = 0;
            this.tieneRetencion = false;
        } else {
            this.buscando = '';
            this.productosFiltrados = [];
            this.productosFactura = [];
            this.proveedor.IdProveedor = event.IdProveedor;
            this.factura.IdProveedor = event.IdProveedor;
            this.getProductosOfProveedor(event.IdProveedor);
            this.tieneRetencion = event.Retencion2;
        }

    }

    changeMoneda(event) {

        if (event === null || event === undefined) {
            this.IdMonedaSeleccionada = null;
            this.simboloMonedaUtilizado = 'C$';
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

    mostrarProducto(producto: ProductoFactura) {
        this.productoSeleccionado = producto;
        if (this.productoSeleccionado.Imagen === '') {
            this.productoSeleccionado.Imagen = 'vacio';
        }
        this.modalVerProducto.show();
    }

    agregarProductoAFactura(producto: ProductoFactura) {
        let productoFiltrado: ProductoFactura = new ProductoFactura();
        productoFiltrado = Object.assign({}, producto);

        if (productoFiltrado.Costo > 0 && productoFiltrado.Cantidad > 0
            && (productoFiltrado.FechaVencimiento !== '' && productoFiltrado.FechaVencimiento !== undefined)) {

            productoFiltrado.Subtotal = productoFiltrado.Cantidad * productoFiltrado.Costo;
            productoFiltrado.Descuento = productoFiltrado.Subtotal * productoFiltrado.PorcentajeDescuento;
            productoFiltrado.DetalleMenosDescuento = productoFiltrado.Subtotal - productoFiltrado.Descuento;

            if (productoFiltrado.GravadoIva === 1) {
                productoFiltrado.CalculoIva = productoFiltrado.Subtotal * this.valorIva;
                productoFiltrado.Iva = productoFiltrado.Subtotal + productoFiltrado.CalculoIva;
                productoFiltrado.TotalDetalle = productoFiltrado.Iva - productoFiltrado.Descuento;
            } else {
                productoFiltrado.TotalDetalle = productoFiltrado.Subtotal - productoFiltrado.Descuento;
            }

            this.productosFactura.push(productoFiltrado);
            this.calcularSubtotalFactura(productoFiltrado, 'SUMA');
            this.showSuccess();
        } else {
            if (productoFiltrado.Cantidad <= 0) {
                Utils.showMsgInfo('La cantidad debe ser mayor a cero!');
            } else if (productoFiltrado.Costo <= 0) {
                Utils.showMsgInfo('El precio debe ser mayor a cero!');
            } else if (productoFiltrado.FechaVencimiento === '') {
                Utils.showMsgInfo('La fecha de vencimiento es requerida!');
            }
        }
    }

    getProductosOfProveedor(IdProveedor) {
        this._productoProveedorService.getProductosOfProveedor(IdProveedor).subscribe(
            response => {
                if (response.productos) {
                    this.productosFiltrados = response.productos;
                    this.productosFiltrados.forEach((value, index) => {
                        this.productosFiltrados[index].Costo = 0;
                        this.productosFiltrados[index].TotalDetalle = 0;
                        this.productosFiltrados[index].GravadoIva = 0;
                        this.productosFiltrados[index].ExentoIva = 0;
                        this.productosFiltrados[index].Cantidad = 0;
                        this.productosFiltrados[index].FechaVencimiento = '';
                        this.productosFiltrados[index].Descuento = 0;
                        this.productosFiltrados[index].PorcentajeDescuento = 0;
                        this.productosFiltrados[index].Subtotal = 0;
                        this.productosFiltrados[index].Iva = 0;
                        this.productosFiltrados[index].CalculoIva = 0;
                    });
                    this.cdr.detectChanges();
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
        this.getValueFromFormFactura();
        if (this.productosFactura.length < 1) {
            Utils.showMsgInfo('Selecciona al menos un producto para crear la factura', 'Factura');
        } else if (this.totalFactura === 0) {
            Utils.showMsgInfo('El total de la factura no puede ser igual a cero!', 'Factura');
        } else if (this.existenMontosMenorIgualaCero()) {
            Utils.showMsgInfo('El costo total de cada producto en la factura debe ser mayor cero', 'Factura');
        } else if (this.factura.FechaRecepcion < this.factura.FechaFactura) {
            Utils.showMsgInfo('La fecha de recepción no puede ser menor a la fecha de la factura!', 'Factura');
        } else {
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
            this.detalleFactura.SubTotal = value.Subtotal;
            this.detalleFactura.Iva = value.Iva;
            this.detalleFactura.Descuento = value.PorcentajeDescuento;
            this.detalleFactura.TotalDetalle = value.TotalDetalle;
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
                this._router.navigate(['factura/summaryFactura']);
            }
        });
    }

    calcularPrecioTotalxProducto(producto: ProductoFactura) {
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

    eliminarProductoDeFactura(productoFactura: ProductoFactura, index) {
        this.calcularSubtotalFactura(productoFactura, 'RESTA');
        this.productosFactura.splice(index, 1);
    }

    agregarProveedor() {
        this._router.navigate(['proveedor/add']);
    }

    guardarRespaldoFactura() {

        if (this.filesToUpload != null) {
            this._uploadService.makeFileRequest(
                this.url + 'uploadImage/',
                CARPETA_FACTURA,
                '',
                false,
                [],
                this.filesToUpload,
                'token',
                'image').then((result: any) => {
                this.factura.respaldoFactura = result.image;
                this.crearFactura();
            }, error => {
                Utils.msgErrorImage(error);
            });
        } else {
            this.factura.respaldoFactura = 'vacio';
            this.crearFactura();
        }
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    showModalDetalleProducto(productoFactura: ProductoFactura) {
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

    calcularSubtotalFactura(productoFactura: ProductoFactura, operacion: string) {
        if (operacion === 'SUMA') {
            this.subTotalFactura += productoFactura.Subtotal;
            this.descuentoCalculoFactura += productoFactura.Descuento;
            this.ivaCalculoFactura += productoFactura.CalculoIva;
            this.subTotalConIvaFactura += productoFactura.TotalDetalle;
            this.subtotalFacturaConDescuento += productoFactura.DetalleMenosDescuento;
        } else {
            this.subTotalFactura -= productoFactura.Subtotal;
            this.descuentoCalculoFactura -= productoFactura.Descuento;
            this.ivaCalculoFactura -= productoFactura.CalculoIva;
            this.subTotalConIvaFactura -= productoFactura.TotalDetalle;
            this.subtotalFacturaConDescuento -= productoFactura.DetalleMenosDescuento;
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

    fechaVencimientoInputFieldChanged (event, producto: ProductoFactura) {
        producto.FechaVencimiento = event.value;
    }

    onSearchChangePrecioProducto(precioProducto, producto: ProductoFactura) {
        producto.Costo = precioProducto;
    }

    onSearchChangeCantidadProducto(cantidadProducto, producto: ProductoFactura) {
        producto.Cantidad = cantidadProducto;
    }

    onSearchChangeDescuentoProducto(descuento, producto) {
        producto.PorcentajeDescuento = descuento / 100;
    }

    changeIva(event, producto: ProductoFactura) {
        producto.GravadoIva = event.path[0].checked === true ? 1 : 0;
    }

    showSuccess() {
        const options = { enableHtml: false,  positionClass: 'toast-top-right', toastClass: 'opacity'};
        this.toastrService.success('El producto ha sido agregado a la factura', 'Factura', options);
    }

    trackById(index, producto: ProductoFactura) {
        return producto.CodigoProducto;
    }

}
