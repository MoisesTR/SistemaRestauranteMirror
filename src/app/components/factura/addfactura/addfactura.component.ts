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
import { CARPETA_FACTURA, Global, RESTA, SUMA } from "@app/core/services/shared/global";
import { ModalDirective, ToastService } from "ng-uikit-pro-standard";
import { Usuario } from "@app/models/Usuario";
import { Factura } from "@app/models/Factura";
import { Utils } from "../../Utils";
import { ProductoFactura } from "@app/models/ProductoFactura";
import swal from "sweetalert2";
import { FormaPagoEnum } from "@app/Enums/FormaPagoEnum";
import { MonedaEnum } from "@app/Enums/MonedaEnum";
import { environment } from "@env/environment";

declare var $: any;

@Component({
	selector: "app-addfactura",
	templateUrl: "./addfactura.component.html",
	styleUrls: ["./addfactura.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddfacturaComponent implements OnInit {
	@ViewChild("modalVerProducto") modalVerProducto: ModalDirective;
	@ViewChild("modalAgregarDetalleProducto")
	modalAgregarDetalleProducto: ModalDirective;
	@ViewChild("modalAddDescuento") modalAddDescuento: ModalDirective;

	public productos: ProductoFactura[];
	public productoSeleccionado: ProductoFactura;
	public proveedores: Proveedor[];
	public proveedor: Proveedor;
	public formEditarDetalleProducto: FormGroup;
	public formAddFactura: FormGroup;
	public formDetallesFactura: FormGroup;
	public productosFactura: ProductoFactura[];
	public productosFiltrados: ProductoFactura[];
	public productosProveedor: ProductoFactura[];
	public productoEditar: ProductoFactura;
	public buscando = "";
	public usuario: Usuario;
	public factura: Factura;
	public formatoComaDinero;
	public url: string;
	public IdMonedaSeleccionada: number;
	public IdFormaPagoSeleccionado: number;
	public simboloMonedaUtilizado: string;
	public mostrarComboPlazoPagos = false;
	public mostrarComboTipoMoneda = false;
	public tituloPantalla: "Factura";
	public filesToUpload: Array<File>;
	public deshabilitarDescuentoXItem = false;
	public descuentoGlobalHabilitado = false;
	public estadoCheckTipoDescuento: boolean = true;
	public seleccionarFechaFactura = new Date();
	public fechaActual = new Date();

	Moneda = [{ Id: 1, Moneda: "Córdobas" }, { Id: 2, Moneda: "Dólares" }];

	FormaPago = [{ Id: 1, FormaPago: "Contado" }, { Id: 2, FormaPago: "Crédito" }];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productoService: ProductoService,
		private proveedorService: ProveedorService,
		private productoProveedorService: ProductoProveedorService,
		private formBuilderFactura: FormBuilder,
		private usuarioService: UsuarioService,
		private facturaService: FacturaService,
		private toastService: ToastService,
		private uploadService: UploadService,
		private cdr: ChangeDetectorRef
	) {
		this.usuario = new Usuario();
		this.usuario = this.usuarioService.getIdentity();
		this.proveedor = new Proveedor();
		this.productoSeleccionado = new ProductoFactura();
		this.productosFactura = [];
		this.productosFiltrados = [];
		this.productosProveedor = [];
		this.productoEditar = new ProductoFactura();
		this.factura = new Factura();
		this.factura.IdUsuario = this.usuario.IdUsuario;
		this.factura.IdTrabajador = this.usuario.IdTrabajador;
		this.url = Global.url;
		this.IdMonedaSeleccionada = MonedaEnum.Cordobas;
		this.IdFormaPagoSeleccionado = FormaPagoEnum.Contado;
		this.simboloMonedaUtilizado = "C$";
	}

	ngOnInit() {
		$(document).ready(() => {
			$(".dropify").dropify();
		});

		this.getProveedores();
		this.initFormDetailProductoFactura();
		this.initFormAddFactura();
		this.subscribeValueDescuentoGlobal();
		this.subscribeTotalFacturaOrigen();
		this.initFormDetailFactura();
		this.initDefaultValues();
	}

	initFormDetailProductoFactura() {
		this.formEditarDetalleProducto = this.formBuilderFactura.group({
			cantidadProducto: new FormControl("", [Validators.required]),
			precioProducto: new FormControl("", [Validators.required]),
			descuentoTotalProducto: new FormControl(0, []),
			gravadoIva: new FormControl(1, []),
			tipoDescuento: new FormControl("", [Validators.required])
		});
	}

	initFormAddFactura() {
		this.formAddFactura = this.formBuilderFactura.group({
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
		this.formDetallesFactura = this.formBuilderFactura.group({
			checkDescuentoGeneral: new FormControl("", [])
		});
	}

	getProveedores() {
		this.proveedorService.getProveedores(1).subscribe(response => {
			if (response.proveedores) {
				this.proveedores = response.proveedores;
				this.cdr.markForCheck();
			}
		});
	}

	initDefaultValues() {
		this.formAddFactura.controls["Moneda"].setValue(this.IdMonedaSeleccionada);
		this.formAddFactura.controls["FormaPago"].setValue(this.IdFormaPagoSeleccionado);
	}

	getValuesFromFactura() {
		this.factura.NumRefFactura = this.formAddFactura.value.codigoFactura;
		this.factura.IdTrabajador = this.usuario.IdTrabajador;
		this.factura.NombVendedor = this.usuario.Nombres;
		this.factura.FechaIngreso = this.formAddFactura.value.fechaFactura;
		this.factura.FechaFactura = this.formAddFactura.value.fechaFactura;
		this.factura.FechaRecepcion = this.formAddFactura.value.fechaRecepcion;
		this.factura.TotalIva = this.factura.IvaCalculoFactura;
		this.factura.CambioActual = 33.42;
		this.factura.TotalDescuento = this.factura.DescuentoCalculoFactura;
		this.factura.TotalCordobas = this.factura.TotalFactura;
		this.factura.TotalOrigenFactura = this.formAddFactura.value.totalFacturaOrigen;
		this.factura.IdTipoMoneda = this.IdMonedaSeleccionada;
		this.factura.FormaPago = "Contado";
		this.factura.IdFormaPago = FormaPagoEnum.Contado;
		this.factura.NombVendedor = this.proveedor.NombRepresentante || "Este proveedor no posee representante";
	}

	onChangeProveedor(event) {
		if (event) {
			this.buscando = "";
			this.productosFiltrados = [];
			this.productosFactura = [];
			this.proveedor.IdProveedor = event.IdProveedor;
			this.factura.IdProveedor = event.IdProveedor;
			this.getProductosOfProveedor(event.IdProveedor);
		} else {
			this.proveedor.IdProveedor = null;
			this.factura.IdProveedor = null;
			this.productos = null;
			this.productosFactura = [];
			this.productosFiltrados = [];
			this.buscando = "";
			this.factura.SubtotalFacturaConDescuento = 0;
		}
		this.cdr.markForCheck();
	}

	changeMoneda(event) {
		if (event) {
			this.IdMonedaSeleccionada = event.Id;
			this.simboloMonedaUtilizado = event.Id === MonedaEnum.Cordobas ? "C$" : "$";
			this.mostrarComboTipoMoneda = event.Id === MonedaEnum.Dolares;
		} else {
			this.IdMonedaSeleccionada = null;
			this.simboloMonedaUtilizado = "C$";
			this.mostrarComboTipoMoneda = false;
		}
	}

	changeFormaPlazoPago(event) {
		if (event) {
			this.mostrarComboPlazoPagos = event.Id === MonedaEnum.Dolares;
		} else {
			this.mostrarComboPlazoPagos = false;
		}
	}

	subscribeValueDescuentoGlobal() {
		this.formAddFactura.controls["descuentoGlobal"].valueChanges.subscribe(value => {
			if (value === "" || value === 0) {
				this.factura.DescuentoCalculoFactura = 0;
				this.deshabilitarDescuentoXItem = false;
				this.descuentoGlobalHabilitado = false;
			} else {
				this.factura.DescuentoCalculoFactura = value;
				this.descuentoGlobalHabilitado = true;
				this.deshabilitarDescuentoXItem = true;
			}

			this.facturaService.calcularDescuentoGlobalFactura(this.factura, this.productosFactura);
			this.facturaService.calcularTotalFactura(this.factura);
			this.cdr.markForCheck();
		});
	}

	subscribeTotalFacturaOrigen() {
		this.formAddFactura.controls["totalFacturaOrigen"].valueChanges.subscribe(value => {
			if (value === "" || value === 0) {
				this.factura.TotalOrigenFactura = 0;
			} else {
				this.factura.TotalOrigenFactura = value;
			}
			this.cdr.markForCheck();
		});
	}

	existeProductoConDescuento() {
		if (
			this.factura.DescuentoCalculoFactura > 0 &&
			(this.formAddFactura.controls["descuentoGlobal"].value === 0 || this.formAddFactura.controls["descuentoGlobal"].value === "")
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

	getProductosOfProveedor(IdProveedor) {
		this.productoProveedorService.getProductosOfProveedor(IdProveedor).subscribe(response => {
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
				});
				this.cdr.markForCheck();
			}
		});
	}

	crearFactura() {
		this.getValuesFromFactura();
		if (this.facturaService.validarCrearFactura(this.productosFactura, this.factura)) {
			this.factura.productos = this.facturaService.crearDetalleFactura(this.productosFactura, this.factura.DescuentoCalculoFactura, this.descuentoGlobalHabilitado);
			this.facturaService.createFactura(this.factura).subscribe(response => {
				if (response.IdFactura) {
					this.agregarOtraFactura();
				}
			});
		}
	}

	eliminarProductoFactura(productoFactura: ProductoFactura, index) {
		this.facturaService.calculoValoresFactura(this.factura, productoFactura, this.productosFactura, RESTA, this.deshabilitarDescuentoXItem);
		this.productosFactura.splice(index, 1);
		this.facturaService.calcularDescuentoGlobalFactura(this.factura, this.productosFactura);
		this.cdr.markForCheck();
	}

	agregarProveedor() {
		this.router.navigate(["proveedor/add"]);
	}

	agregarProductoAFactura(producto: ProductoFactura) {
		this.facturaService.agregarProductoAFactura(
			this.factura,
			producto,
			this.productosFactura,
			this.descuentoGlobalHabilitado,
			this.deshabilitarDescuentoXItem
		);

		this.cdr.markForCheck();
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
		this.facturaService.asignarValoresEditarProducto(productoEditarTemp, this.formEditarDetalleProducto);

		if (this.facturaService.productoValido(productoEditarTemp, this.descuentoGlobalHabilitado)) {
			this.facturaService.asignarValoresEditarProducto(this.productoEditar, this.formEditarDetalleProducto);
			this.facturaService.calculoValoresFactura(
				this.factura,
				productoEditarValorAnterior,
				this.productosFactura,
				RESTA,
				this.deshabilitarDescuentoXItem
			);
			this.facturaService.calculoProducto(this.productoEditar);
			this.facturaService.calculoValoresFactura(
				this.factura,
				this.productoEditar,
				this.productosFactura,
				SUMA,
				this.deshabilitarDescuentoXItem
			);
			this.modalAgregarDetalleProducto.hide();
		}
		this.cdr.markForCheck();
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

		this.estadoCheckTipoDescuento = producto.IsDescuentoPorcentual;
	}

	showActualizacionProductos(nuevos: number) {
		const options = {
			enableHtml: false,
			positionClass: "toast-top-right",
			toastClass: "opacity"
		};
		this.toastService.success("Se han encontrado un total de: " + nuevos + " productos nuevos!", "Factura", options);
	}

	ingresoFechaRecepcion(evento) {
		this.seleccionarFechaFactura = evento;
	}

	trackById(index, producto: ProductoFactura) {
		return producto.IdProducto;
	}

	agregarNuevoProducto() {
		if (environment.production) {
			window.open("https://restaurante-atomic.herokuapp.com/producto/add", "_blank");
		} else {
			window.open("http://localhost:4200/producto/add", "_blank");
		}
	}

	agregarNuevoProductoLimpieza() {
		if (environment.production) {
			window.open("https://restaurante-atomic.herokuapp.com/consumo-interno", "_blank");
		} else {
			window.open("http://localhost:4200/consumo-interno", "_blank");
		}
	}

	actualizarListaProductos() {
		if (this.factura.IdProveedor) {
			const totalAnterior = this.productosFiltrados.length;
			this.getProductosOfProveedor(this.factura.IdProveedor);
			const totalActual = this.productosFiltrados.length;
			const encontrados = totalActual - totalAnterior;
			this.showActualizacionProductos(encontrados);
		} else {
			Utils.showMsgInfo("Selecciona un proveedor");
		}
	}

	agregarOtraFactura() {
		swal
			.fire({
				title: "La factura se ha creado correctamente!",
				text: "Deseas crear otra factura?",
				type: "success",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "SI",
				cancelButtonText: "NO"
			})
			.then(result => {
				if (result.value) {
					this.resetFormAddFactura();
					this.factura = new Factura();
					this.factura.IdUsuario = this.usuario.IdUsuario;
					this.factura.IdTrabajador = this.usuario.IdTrabajador;
					this.proveedor = new Proveedor();
					this.productoSeleccionado = new ProductoFactura();
					this.productosFactura = [];
					this.productosFiltrados = [];
					this.productosProveedor = [];
					this.productoEditar = new ProductoFactura();
					this.deshabilitarDescuentoXItem = false;
					this.descuentoGlobalHabilitado = false;
					this.cdr.markForCheck();
					window.scrollTo(0, 0);
				} else if (result.dismiss === swal.DismissReason.cancel) {
					this.router.navigate(["factura/summaryFactura"]);
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
