import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
	FacturaService,
	ProductoProveedorService,
	ProductoService,
	ProveedorService,
	UploadService,
	UsuarioService
} from "@app/core/service.index";
import { Proveedor } from "@app/models/Proveedor";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CARPETA_FACTURA, Global } from "@app/core/services/shared/global";
import { ModalDirective, ToastService } from "ng-uikit-pro-standard";
import { Usuario } from "@app/models/Usuario";
import { Factura } from "@app/models/Factura";
import { Utils } from "../../Utils";
import { DetalleFactura } from "@app/models/DetalleFactura";
import { ProductoFactura } from "@app/models/ProductoFactura";
import swal from "sweetalert2";

declare var $: any;

@Component({
	selector: "app-addfactura",
	templateUrl: "./addfactura.component.html",
	styleUrls: ["./addfactura.component.scss"],
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
	public buscando = "";
	public subtotalFacturaConDescuento = 0;
	public subTotalConIvaFactura = 0;
	public subTotalFactura = 0;
	public ivaCalculoFactura = 0;
	public descuentoCalculoFactura = 0;
	public usuario: Usuario;
	public factura: Factura;
	public valorIva: number;
	public totalFactura = 0;
	public totalFacturaOrigen = 0;
	public formatoComaDinero;
	public url: string;
	public IdMonedaSeleccionada: number;
	public IdFormaPagoSeleccionado: number;
	public simboloMonedaUtilizado: string;
	public mostrarComboPlazoPagos = false;
	public mostrarComboTipoMoneda = false;
	public tituloPantalla: "Factura";
	public fechaVencimiento: string;
	public filesToUpload: Array<File>;
	public deshabilitarDescuentoXItem = false;
	public descuentoGlobalHabilitado = false;
	public EstadoCheckTipoDescuento: boolean = true;
	public SeleccionarFechaFactura = new Date();
	public fechaActual = new Date();

	Moneda = [{ Id: 1, Moneda: "Córdobas" }, { Id: 2, Moneda: "Dólares" }];

	FormaPago = [{ Id: 1, FormaPago: "Contado" }, { Id: 2, FormaPago: "Crédito" }];

	@ViewChild("modalVerProducto") modalVerProducto: ModalDirective;
	@ViewChild("modalAgregarDetalleProducto")
	modalAgregarDetalleProducto: ModalDirective;
	@ViewChild("modalAddDescuento") modalAddDescuento: ModalDirective;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _productoService: ProductoService,
		private _proveedorService: ProveedorService,
		private _productoProveedorService: ProductoProveedorService,
		private _formBuilderFactura: FormBuilder,
		private _usuarioService: UsuarioService,
		private _facturaService: FacturaService,
		private toastrService: ToastService,
		private _uploadService: UploadService,
		private cdr: ChangeDetectorRef
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
		this.simboloMonedaUtilizado = "C$";
		this.valorIva = 0.15;
	}

	ngOnInit() {
		$(document).ready(() => {
			$(".dropify").dropify();
		});

		this.getProveedores();
		this.initFormDetailProductoFactura();
		this.initFormAddFactura();
		this.subscribeValueDescuentoGlobal();
		this.initFormDetailFactura();
		this.usuario = this._usuarioService.getIdentity();
	}

	initFormDetailProductoFactura() {
		this.formEditarDetalleProducto = this._formBuilderFactura.group({
			cantidadProducto: new FormControl("", [Validators.required]),
			precioProducto: new FormControl("", [Validators.required]),
			descuentoTotalProducto: new FormControl(0, []),
			gravadoIva: new FormControl(1, []),
			tipoDescuento: new FormControl("", [Validators.required])
		});
	}

	initFormAddFactura() {
		this.formAddFactura = this._formBuilderFactura.group({
			proveedor: new FormControl("", Validators.required),
			codigoFactura: new FormControl("", Validators.required),
			totalFacturaOrigen: new FormControl(0, Validators.required),
			descuentoGlobal: new FormControl(0),
			fechaFactura: new FormControl("", [Validators.required]),
			fechaRecepcion: new FormControl("", [Validators.required]),
			Moneda: new FormControl("", Validators.required),
			FormaPago: new FormControl("", Validators.required),
			TipoCambio: new FormControl(""),
			PlazoPagos: new FormControl("")
		});
	}

	initFormDetailFactura() {
		this.formDetallesFactura = this._formBuilderFactura.group({
			checkDescuentoGeneral: new FormControl("", [])
		});
	}

	getProveedores() {
		this._proveedorService.getProveedores().subscribe(
			response => {
				if (response.proveedores) {
					this.proveedores = response.proveedores;
					this.cdr.markForCheck();
				} else {
					Utils.showMsgInfo("No se han logrado obtener los proveedores", "Factura");
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), "Factura");
			},
			() => {}
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
		this.factura.TotalOrigenFactura = this.formAddFactura.value.totalFacturaOrigen;
		this.factura.Retencion = 0;
		this.factura.IdTipoMoneda = this.IdMonedaSeleccionada;
		this.factura.FormaPago = "Contado";
		this.factura.IdFormaPago = 1;
		this.factura.NombVendedor = this.proveedores.filter(
			item => item.IdProveedor === this.proveedor.IdProveedor
		)[0].NombreRepresentante;
	}

	onChangeProveedor(event) {
		if (event === null || event === undefined) {
			this.proveedor.IdProveedor = null;
			this.factura.IdProveedor = null;
			this.productos = null;
			this.productosFactura = [];
			this.productosFiltrados = [];
			this.buscando = "";
			this.subtotalFacturaConDescuento = 0;
		} else {
			this.buscando = "";
			this.productosFiltrados = [];
			this.productosFactura = [];
			this.proveedor.IdProveedor = event.IdProveedor;
			this.factura.IdProveedor = event.IdProveedor;
			this.getProductosOfProveedor(event.IdProveedor);
		}
	}

	changeMoneda(event) {
		if (event === null || event === undefined) {
			this.IdMonedaSeleccionada = null;
			this.simboloMonedaUtilizado = "C$";
			this.mostrarComboTipoMoneda = false;
		} else {
			this.IdMonedaSeleccionada = event.Id;
			this.simboloMonedaUtilizado = event.Id === 1 ? "C$" : "$";
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

	subscribeValueDescuentoGlobal() {
		this.formAddFactura.controls["descuentoGlobal"].valueChanges.subscribe(value => {
			if (value === "" || value === 0) {
				this.descuentoCalculoFactura = 0;
				this.deshabilitarDescuentoXItem = false;
				this.descuentoGlobalHabilitado = false;
				this.calcularDescuentoGlobalFactura();
				this.calcularTotalFactura();
			} else {
				this.descuentoCalculoFactura = value;
				this.descuentoGlobalHabilitado = true;
				this.deshabilitarDescuentoXItem = true;
				this.calcularDescuentoGlobalFactura();
				this.calcularTotalFactura();
			}
		});
	}

	existeProductoConDescuento() {
		if (
			this.descuentoCalculoFactura > 0 &&
			(this.formAddFactura.controls["descuentoGlobal"].value === 0 ||
				this.formAddFactura.controls["descuentoGlobal"].value === "")
		) {
			return "";
		}
		return null;
	}

	deshabilitarCampos() {
		return this.formAddFactura.controls["proveedor"].value ? null : true;
	}

	mostrarProducto(producto: ProductoFactura) {
		this.productoSeleccionado = producto;
		if (this.productoSeleccionado.Imagen === "") {
			this.productoSeleccionado.Imagen = "vacio";
		}
		this.modalVerProducto.show();
	}

	agregarProductoAFactura(producto: ProductoFactura) {
		console.log("El estado del CheckBox es: " + producto.IsDescuentoPorcentual);
		let productoFiltrado: ProductoFactura = new ProductoFactura();
		productoFiltrado = Object.assign({}, producto);

		if (this.productoValido(productoFiltrado)) {
			this.calculoProducto(productoFiltrado);
			this.productosFactura.push(productoFiltrado);
			this.calculoValoresFactura(productoFiltrado, "SUMA");
			this.resetProductoFiltrado(producto);
			this.showSuccess();
		}
	}

	productoValido(producto: ProductoFactura): boolean {
		let productoFiltrado: ProductoFactura = new ProductoFactura();
		productoFiltrado = Object.assign({}, producto);

		if (
			productoFiltrado.Costo > 0 &&
			productoFiltrado.Cantidad > 0 &&
			((productoFiltrado.IsDescuentoPorcentual && productoFiltrado.DescuentoIngresado <= 100) ||
				(!productoFiltrado.IsDescuentoPorcentual &&
					productoFiltrado.DescuentoIngresado <= productoFiltrado.Cantidad * productoFiltrado.Costo))
		) {
			if (this.descuentoGlobalHabilitado && productoFiltrado.DescuentoIngresado > 0) {
				Utils.showMsgInfo("No puede agregar productos con descuento, cuando ya existe un descuento total por factura!");
				return false;
			}
			return true;
		} else {
			if (productoFiltrado.Cantidad <= 0) {
				Utils.showMsgInfo("La cantidad debe ser mayor a cero!");
				return false;
			} else if (productoFiltrado.Costo <= 0) {
				Utils.showMsgInfo("El precio debe ser mayor a cero!");
				return false;
			} else if (productoFiltrado.DescuentoIngresado > 100 && productoFiltrado.IsDescuentoPorcentual) {
				Utils.showMsgInfo("El porcentaje de descuento debe ser menor o igual a 100!");
				return false;
			} else if (
				productoFiltrado.DescuentoIngresado > productoFiltrado.Cantidad * productoFiltrado.Costo &&
				!productoFiltrado.IsDescuentoPorcentual
			) {
				Utils.showMsgInfo("El descuento no puede ser mayor al precio neto del producto!");
				return false;
			}
		}
	}

	calculoProducto(productoFiltrado: ProductoFactura) {
		productoFiltrado.Cantidad = Utils.round(productoFiltrado.Cantidad, 2);
		productoFiltrado.Costo = Utils.round(productoFiltrado.Costo, 2);
		productoFiltrado.Subtotal = Utils.round(productoFiltrado.Cantidad * productoFiltrado.Costo, 2);

		if (productoFiltrado.IsDescuentoPorcentual) {
			productoFiltrado.PorcentajeDescuento = Utils.round(productoFiltrado.DescuentoIngresado / 100, 2);
			productoFiltrado.Descuento = Utils.round(productoFiltrado.Subtotal * productoFiltrado.PorcentajeDescuento, 2);
		} else {
			productoFiltrado.Descuento = Utils.round(productoFiltrado.DescuentoIngresado, 2);
		}

		productoFiltrado.DetalleMenosDescuento = productoFiltrado.Subtotal - productoFiltrado.Descuento;

		if (productoFiltrado.GravadoIva === 1) {
			productoFiltrado.CalculoIva = Utils.round(productoFiltrado.DetalleMenosDescuento * this.valorIva, 2);
			productoFiltrado.Iva = productoFiltrado.DetalleMenosDescuento + productoFiltrado.CalculoIva;
			productoFiltrado.TotalDetalle = productoFiltrado.Iva;
		} else {
			productoFiltrado.CalculoIva = 0;
			productoFiltrado.Iva = 0;
			productoFiltrado.TotalDetalle = productoFiltrado.Subtotal - productoFiltrado.Descuento;
		}
	}

	resetProductoFiltrado(producto: ProductoFactura) {
		producto.Costo = 0;
		producto.Cantidad = 0;
		producto.DescuentoIngresado = 0;
		producto.IsDescuentoPorcentual = true;
		producto.GravadoIva = 0;
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
						this.productosFiltrados[index].FechaVencimiento = "";
						this.productosFiltrados[index].Descuento = 0;
						this.productosFiltrados[index].DescuentoIngresado = 0;
						this.productosFiltrados[index].PorcentajeDescuento = 0;
						this.productosFiltrados[index].Subtotal = 0;
						this.productosFiltrados[index].Iva = 0;
						this.productosFiltrados[index].CalculoIva = 0;
						this.productosFiltrados[index].IsDescuentoPorcentual = true;
						this.productosFiltrados[index].DescripcionInsumo =
							this.productosFiltrados[index].IdTipoInsumo === 1 ? "Alimento" : "Limpieza";
					});
					this.cdr.detectChanges();
				}
			},
			error => {},
			() => {}
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
			Utils.showMsgInfo("Selecciona al menos un producto para crear la factura", "Factura");
		} else if (this.totalFactura === 0) {
			Utils.showMsgInfo("El total de la factura no puede ser igual a cero!", "Factura");
		} else if (this.descuentoCalculoFactura > this.subTotalFactura) {
			Utils.showMsgInfo("El descuento no puede ser mayor al subtotal de la factura!", "Factura");
		} else if (this.existenMontosMenorIgualaCero()) {
			Utils.showMsgInfo("El costo total de cada producto en la factura debe ser mayor cero", "Factura");
		} else if (this.factura.FechaRecepcion < this.factura.FechaFactura) {
			Utils.showMsgInfo("La fecha de recepción no puede ser menor a la fecha de la factura!", "Factura");
		} else {
			this._facturaService.createFactura(this.factura).subscribe(
				response => {
					if (response.IdFactura) {
						this.crearDetalleFactura(response.IdFactura);
					} else {
						Utils.showMsgInfo("Ha ocurrido un error al crear la factura");
					}
				},
				error => {
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
			this.detalleFactura.TotalDetalle = value.TotalDetalle;

			if (this.descuentoCalculoFactura === 0) {
				this.detalleFactura.IdTipoDescuento = null;
			} else if (value.IsDescuentoPorcentual) {
				this.detalleFactura.IdTipoDescuento = 1;
			} else {
				this.detalleFactura.IdTipoDescuento = 2;
			}

			this.detalleFactura.Descuento = value.Descuento;
			this.detalleFactura.IsDescuentoPorcentual = value.IsDescuentoPorcentual;
			this.detalleFactura.PorcentajeDescuento = value.IsDescuentoPorcentual ? value.PorcentajeDescuento : null;
			this.detalleFactura.EfectivoDescuento = value.IsDescuentoPorcentual ? null : value.DescuentoIngresado;
			this.detalleFactura.Bonificacion = 0;

			this._facturaService.createDetailFactura(this.detalleFactura).subscribe(
				response => {
					if (response.IdDetalle) {
					} else {
						Utils.showMsgInfo("Ha ocurrido un error al insertar el detalle del producto" + value.IdProducto);
					}
				},
				error => {
					Utils.showMsgError(Utils.msgError(error));
				}
			);

			if (index === this.productosFactura.length - 1) {
				this.agregarOtraFactura();
			}
		});
	}

	eliminarProductoDeFactura(productoFactura: ProductoFactura, index) {
		this.calculoValoresFactura(productoFactura, "RESTA");
		this.productosFactura.splice(index, 1);
		this.calcularDescuentoGlobalFactura();
	}

	agregarProveedor() {
		this._router.navigate(["proveedor/add"]);
	}

	guardarRespaldoFactura() {
		if (this.filesToUpload != null) {
			this._uploadService
				.makeFileRequest(
					this.url + "uploadImage/",
					CARPETA_FACTURA,
					"",
					false,
					[],
					this.filesToUpload,
					"token",
					"image"
				)
				.then(
					(result: any) => {
						this.factura.respaldoFactura = result.image;
						this.crearFactura();
					},
					error => {
						Utils.msgErrorImage(error);
					}
				);
		} else {
			this.factura.respaldoFactura = "vacio";
			this.crearFactura();
		}
	}

	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	showModalDetalleProducto(productoFactura: ProductoFactura) {
		this.formEditarDetalleProducto.reset();
		this.productoEditar = productoFactura;

		this.formEditarDetalleProducto.controls["cantidadProducto"].setValue(productoFactura.Cantidad);
		this.formEditarDetalleProducto.controls["precioProducto"].setValue(productoFactura.Costo);
		this.formEditarDetalleProducto.controls["descuentoTotalProducto"].setValue(productoFactura.DescuentoIngresado);
		this.formEditarDetalleProducto.controls["gravadoIva"].setValue(productoFactura.GravadoIva);
		this.formEditarDetalleProducto.controls["tipoDescuento"].setValue(productoFactura.IsDescuentoPorcentual);
		this.modalAgregarDetalleProducto.show();
	}

	editarDatosProducto() {
		const productoEditarValorAnterior = Object.assign({}, this.productoEditar);
		const productoEditarTemp = Object.assign({}, this.productoEditar);
		this.asignarValoresEditarProducto(productoEditarTemp);

		if (this.productoValido(productoEditarTemp)) {
			this.asignarValoresEditarProducto(this.productoEditar);
			this.calculoValoresFactura(productoEditarValorAnterior, "RESTA");
			this.calculoProducto(this.productoEditar);
			this.calculoValoresFactura(this.productoEditar, "SUMA");
			this.modalAgregarDetalleProducto.hide();
		}
	}

	asignarValoresEditarProducto(productoFactura: ProductoFactura) {
		productoFactura.Costo = this.formEditarDetalleProducto.value.precioProducto;
		productoFactura.Cantidad = this.formEditarDetalleProducto.value.cantidadProducto;
		productoFactura.DescuentoIngresado = this.formEditarDetalleProducto.value.descuentoTotalProducto;
		productoFactura.GravadoIva = this.formEditarDetalleProducto.value.gravadoIva ? 1 : 0;
		productoFactura.IsDescuentoPorcentual = this.formEditarDetalleProducto.value.tipoDescuento;
	}

	calculoValoresFactura(productoFactura: ProductoFactura, operacion: string) {
		if (operacion === "SUMA") {
			this.subTotalFactura += productoFactura.Subtotal;
			this.ivaCalculoFactura += productoFactura.CalculoIva;
			this.subTotalConIvaFactura += productoFactura.TotalDetalle;

			if (!this.deshabilitarDescuentoXItem) {
				this.descuentoCalculoFactura += productoFactura.Descuento;
				this.subtotalFacturaConDescuento += productoFactura.DetalleMenosDescuento;
			}
		} else {
			this.subTotalFactura -= productoFactura.Subtotal;
			this.ivaCalculoFactura -= productoFactura.CalculoIva;
			this.subTotalConIvaFactura -= productoFactura.TotalDetalle;

			if (!this.deshabilitarDescuentoXItem) {
				this.descuentoCalculoFactura -= productoFactura.Descuento;
				this.subtotalFacturaConDescuento -= productoFactura.DetalleMenosDescuento;
			}
		}

		if (this.deshabilitarDescuentoXItem) {
			this.calcularDescuentoGlobalFactura();
		}

		this.calcularTotalFactura();
	}

	calcularDescuentoGlobalFactura() {
		let sumaProductos = 0;
		this.productosFactura.forEach((value, index) => {
			sumaProductos += value.Subtotal;
		});

		this.subtotalFacturaConDescuento = sumaProductos - this.descuentoCalculoFactura;
	}

	calcularTotalFactura() {
		this.totalFactura = this.subTotalFactura + this.ivaCalculoFactura - this.descuentoCalculoFactura;
	}

	fechaVencimientoInputFieldChanged(event, producto: ProductoFactura) {
		producto.FechaVencimiento = event.value;
	}

	onSearchChangePrecioProducto(precioProducto, producto: ProductoFactura) {
		producto.Costo = precioProducto;
	}

	onSearchChangeCantidadProducto(cantidadProducto, producto: ProductoFactura) {
		producto.Cantidad = cantidadProducto;
	}

	onSearchChangeDescuentoProducto(descuento, producto) {
		producto.DescuentoIngresado = descuento;
	}

	changeIva(event, producto: ProductoFactura) {
		producto.GravadoIva = event.checked === true ? 1 : 0;
	}

	changeTipoDescuento(event, producto: ProductoFactura) {
		producto.IsDescuentoPorcentual = event.path[0].checked;

		this.EstadoCheckTipoDescuento = producto.IsDescuentoPorcentual;
	}

	showSuccess() {
		const options = {
			enableHtml: false,
			positionClass: "toast-top-right",
			toastClass: "opacity"
		};
		this.toastrService.success("El producto ha sido agregado a la factura", "Factura", options);
	}

	showActualizacionProductos(nuevos: number) {
		const options = {
			enableHtml: false,
			positionClass: "toast-top-right",
			toastClass: "opacity"
		};
		this.toastrService.success("Se han encontrado un total de: " + nuevos + " productos nuevos!", "Factura", options);
	}

	ingresoFechaRecepcion(evento) {
		this.SeleccionarFechaFactura = evento;
	}

	trackById(index, producto: ProductoFactura) {
		return producto.CodigoProducto;
	}

	agregarNuevoProducto() {
		window.open("http://localhost:4200/producto/add", "_blank");
	}

	actualizarListaProductos() {
		if (this.factura.IdProveedor === null || this.factura.IdProveedor === undefined) {
			Utils.showMsgInfo("Selecciona un proveedor");
		} else {
			const totalAnterior = this.productosFiltrados.length;
			this.getProductosOfProveedor(this.factura.IdProveedor);
			const totalActual = this.productosFiltrados.length;
			const encontrados = totalActual - totalAnterior;
			this.showActualizacionProductos(encontrados);
		}
	}

	agregarOtraFactura() {
		swal({
			title: "La factura se ha creado correctamente!",
			text: "Deseas crear otra factura?",
			type: "success",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "SI",
			cancelButtonText: "NO"
		}).then(result => {
			if (result.value) {
				this.resetFormAddFactura();
				this.factura = new Factura();
				this.proveedor = new Proveedor();
				this.productoSeleccionado = new ProductoFactura();
				this.productosFactura = [];
				this.productosFiltrados = [];
				this.productosProveedor = [];
				this.productoEditar = new ProductoFactura();
				this.subtotalFacturaConDescuento = 0;
				this.subTotalConIvaFactura = 0;
				this.subTotalFactura = 0;
				this.ivaCalculoFactura = 0;
				this.descuentoCalculoFactura = 0;
				this.totalFactura = 0;
				this.totalFacturaOrigen = 0;
				this.deshabilitarDescuentoXItem = false;
				this.descuentoGlobalHabilitado = false;
				window.scrollTo(0, 0);
			} else if (result.dismiss === swal.DismissReason.cancel) {
				this._router.navigate(["factura/summaryFactura"]);
			}
		});
	}

	resetFormAddFactura() {
		Object.keys(this.formAddFactura.controls).forEach((value, index) => {
			if (value !== "Moneda" && value !== "FormaPago") {
				this.formAddFactura.controls[value].reset();
			}
		});
	}
}
