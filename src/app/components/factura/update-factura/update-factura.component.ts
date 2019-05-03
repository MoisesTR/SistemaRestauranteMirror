import { Component, OnInit, ViewChild } from "@angular/core";
import { IMyOptions, ModalDirective } from "ng-uikit-pro-standard";
import { Global, opcionesDatePicker } from "@app/core/services/shared/global";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {
	FacturaService,
	ProductoProveedorService,
	ProductoService,
	ProveedorService,
	UsuarioService
} from "@app/core/service.index";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { DetalleFactura } from "@app/models/DetalleFactura";
import { Proveedor } from "@app/models/Proveedor";
import { Usuario } from "@app/models/Usuario";
import { Factura } from "@app/models/Factura";
import { ProductoProveedor } from "@app/models/ProductoProveedor";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { Utils } from "../../Utils";
import { Producto } from "@app/models/Producto";

@Component({
	selector: "app-update-factura",
	templateUrl: "./update-factura.component.html",
	styleUrls: ["./update-factura.component.scss"]
})
export class UpdateFacturaComponent implements OnInit {
	public myDatePickerOptions: IMyOptions = opcionesDatePicker;
	public productos: ProductoProveedor[];
	public productoSeleccionado: ProductoProveedor;
	public proveedores: Proveedor[];
	public proveedor: Proveedor;
	public detalleFactura: DetalleFactura;
	public formUpdateDetalleFactura: FormGroup;
	public formUpdateFactura: FormGroup;
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
	public usuario: Usuario;
	public factura: Factura;
	public valorIva: number;
	public totalFactura = 0;
	public formatoComaDinero;
	public url: string;
	public IdMonedaSeleccionada: number;
	public IdFormaPagoSeleccionado: number;
	public simboloMonedaUtilizado: string;
	public mostrarComboPlazoPagos = false;
	public mostrarComboTipoMoneda = false;
	public productoTemp;
	public productosTemp: ProductoProveedor[];
	Moneda = [{ Id: 1, Moneda: "Córdobas" }, { Id: 2, Moneda: "Dólares" }];

	FormaPago = [{ Id: 1, FormaPago: "Contado" }, { Id: 2, FormaPago: "Crédito" }];

	@ViewChild("modalVerProducto") modalVerProducto: ModalDirective;
	@ViewChild("modalUpdateDetalleProducto") modalUpdateDetalleProducto: ModalDirective;
	@ViewChild("modalAddDescuento") modalAddDescuento: ModalDirective;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _productoService: ProductoService,
		private _proveedorService: ProveedorService,
		private _productoProveedorService: ProductoProveedorService,
		private _formBuilderFactura: FormBuilder,
		private _usuarioService: UsuarioService,
		private _facturaService: FacturaService
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
		this.simboloMonedaUtilizado = "C$";
	}

	ngOnInit() {
		this.getFactura();
		this.getProveedores();
		this.initFormDetailProductoFactura();
		this.initFormUpdateFactura();
		this.initFormUpdateDetailFactura();

		this.usuario = this._usuarioService.getIdentity();
		this.factura.NombVendedor = "Vendedor Test";
		this.valorIva = 0.15;
	}

	getFactura() {
		this._route.params.forEach((params: Params) => {
			const idFactura = params["id"];

			this._facturaService.getFacturaById(idFactura).subscribe(response => {
				if (response.factura) {
					this.factura = response.factura;
					this.setDataFormUpdateFactura();
					this.setDataFormUpdateDetailFactura();
					this.setearProductosFactura();
				}
			});
		});
	}

	setearProductosFactura() {
		this.getProductosOfProveedor(this.factura.IdProveedor);
	}

	setDataFormUpdateFactura() {
		this.formUpdateFactura.controls["codigoFactura"].setValue(this.factura.NumRefFactura);
		this.formUpdateFactura.controls["fechaFactura"].setValue(this.factura.FechaIngreso);

		// Cantidades generales de la factura
		this.subTotalFactura = this.factura.SubTotal;
		this.descuentoCalculoFactura = this.factura.TotalDescuento;
		this.subtotalFacturaConDescuento = this.factura.SubTotal + this.factura.TotalDescuento;
		this.ivaCalculoFactura = this.factura.TotalIva;
		this.totalFactura = this.factura.TotalCordobas;
	}

	setDataFormUpdateDetailFactura() {}

	getProveedores() {
		this._proveedorService.getProveedores(1).subscribe(response => {
			if (response.proveedores) {
				this.proveedores = response.proveedores;
			}
		});
	}
	initFormDetailProductoFactura() {
		this.formUpdateDetalleFactura = this._formBuilderFactura.group({
			cantidadProducto: new FormControl("", [Validators.required, CustomValidators.rangeNumber(1, 300)]),
			precioProducto: new FormControl("", [Validators.required, CustomValidators.rangeNumber(1, 20000)]),
			descuentoTotalProducto: new FormControl(0, []),
			gravadoIva: new FormControl(1, [])
		});
	}

	initFormUpdateFactura() {
		this.formUpdateFactura = this._formBuilderFactura.group({
			proveedor: new FormControl("", Validators.required),
			codigoFactura: new FormControl("", Validators.required),
			fechaFactura: new FormControl("", [Validators.required]),
			Moneda: new FormControl("", Validators.required),
			FormaPago: new FormControl("", Validators.required),
			TipoCambio: new FormControl(""),
			PlazoPagos: new FormControl("")
		});
	}

	initFormUpdateDetailFactura() {
		this.formDetallesFactura = this._formBuilderFactura.group({
			checkDescuentoGeneral: new FormControl("", [])
		});
	}

	initFormDescuentoGeneral() {
		this.formDescuentoGeneral = this._formBuilderFactura.group({
			descuentoGeneral: new FormControl("", [CustomValidators.rangeNumber(0, 100)])
		});
	}

	getValueFromFormFactura() {
		this.factura.NumRefFactura = this.formUpdateFactura.value.codigoFactura;
		this.factura.IdTrabajador = this.usuario.IdTrabajador;
		this.factura.NombVendedor = this.usuario.Nombres;
		this.factura.FechaIngreso = this.formUpdateFactura.value.fechaFactura;
		this.factura.SubTotal = this.subTotalFactura;
		this.factura.TotalIva = this.ivaCalculoFactura;
		this.factura.CambioActual = 31.5;
		this.factura.TotalDescuento = this.descuentoCalculoFactura;
		this.factura.TotalCordobas = this.totalFactura;
	}

	editarDatosProducto() {
		this.productosFactura.forEach((producto, i) => {
			if (this.productosFactura[i].IdProducto === this.productoEditar.IdProducto) {
				// Hacer la operacion de resta en la factura solamente si ya ingreso previamente los datos de un producto
				if (this.totalFactura > 0 && this.productosFactura[i].Costo > 0) {
					this.calcularSubtotalFactura(producto, "RESTA");
				}
				// Actualizar los datos del producto editado en la factura
				this.productosFactura[i].Cantidad = this.formUpdateDetalleFactura.value.cantidadProducto;
				this.productosFactura[i].Costo = this.formUpdateDetalleFactura.value.precioProducto;
				this.productosFactura[i].Descuento = this.formUpdateDetalleFactura.value.descuentoTotalProducto;
				this.productosFactura[i].GravadoIva = this.formUpdateDetalleFactura.value.gravadoIva ? 1 : 0;
				this.productosFactura[i].TotalDetalle = this.calcularPrecioTotalxProducto(this.productoEditar);
			}
		});

		// Hacer el calculo con el producto editado
		this.calcularSubtotalFactura(this.productoEditar, "SUMA");

		this.modalUpdateDetalleProducto.hide();
	}

	onChangeProveedor(event) {
		if (event === null || event === undefined) {
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
		this._productoProveedorService
			.getProductosOfProveedorFiltrado(IdProveedor, this.factura.IdFactura)
			.subscribe(response => {
				if (response.productos) {
					this.productos = response.productos;
					this.productos.forEach((value, indice) => {
						this.productos[indice].Costo = 0;
						this.productos[indice].TotalDetalle = 0;
					});

					this.factura.Detalle.forEach((value, i) => {
						this.productoTemp = new Producto();
						this.productoTemp = value;
						this.productosFactura.push(this.productoTemp);
					});
				}
			});
	}

	existenMontosMenorIgualaCero() {
		let menorIgualCero = false;
		this.productosFactura.forEach((value, i) => {
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
			Utils.showMsgInfo("Selecciona al menos un producto para crear la factura", "Factura");
		} else if (this.totalFactura === 0) {
			Utils.showMsgInfo("El total de la factura no puede ser igual a cero!", "Factura");
		} else if (this.existenMontosMenorIgualaCero()) {
			Utils.showMsgInfo("El costo total de cada producto en la factura debe ser mayor cero", "Factura");
		} else {
			this.getValueFromFormFactura();
			this._facturaService.createFactura(this.factura).subscribe(response => {
				if (response.IdFactura) {
					this.crearDetalleFactura(response.IdFactura);
				}
			});
		}
	}

	crearDetalleFactura(IdFactura: number) {
		this.productosFactura.forEach((value, i) => {
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

			this._facturaService.createDetailFactura(this.detalleFactura).subscribe(response => {
				if (response.IdDetalle) {
				}
			});

			if (i === this.productosFactura.length - 1) {
				Utils.showMsgSucces("La factura se ha creado exitosamente");
				this._router.navigate(["/factura/busquedafacturas"]);
			}
		});
	}

	eliminarProductoDeFactura(productoFactura: ProductoProveedor) {
		this.productos.push(productoFactura);
		this.calcularSubtotalFactura(productoFactura, "RESTA");
		this.productosFactura = this.productosFactura.filter(item => item.IdProducto !== productoFactura.IdProducto);
	}

	agregarProveedor() {
		this._router.navigate(["proveedor/add"]);
	}

	agregarProducto() {
		this._router.navigate(["producto/add"]);
	}

	showModalDetalleProducto(productoFactura) {
		this.formUpdateDetalleFactura.reset();
		this.productoEditar = productoFactura;
		this.productoEditar.GravadoIva = productoFactura.GravadoIva;
		this.productoEditar.Costo = productoFactura.PrecioUnitario;
		this.formUpdateDetalleFactura.setValue({
			cantidadProducto: undefined === this.productoEditar.Cantidad ? 1 : this.productoEditar.Cantidad,
			precioProducto: undefined === this.productoEditar.Costo ? 0 : this.productoEditar.Costo,
			descuentoTotalProducto: undefined === this.productoEditar.Descuento ? 0 : this.productoEditar.Descuento,
			gravadoIva: undefined === this.productoEditar.GravadoIva ? 0 : this.productoEditar.GravadoIva
		});

		this.modalUpdateDetalleProducto.show();
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

		if (operacion === "SUMA") {
			if (productoFactura.GravadoIva) {
				productoConIva = costoProducto + costoProducto * this.valorIva;
				productoConDescuento = productoConIva - costoProducto * (productoFactura.Descuento / 100);
				this.subTotalFactura += costoProducto;
				this.subtotalFacturaConDescuento += costoProducto - costoProducto * (productoFactura.Descuento / 100);
				this.ivaCalculoFactura += ivaDelProducto;
				this.descuentoCalculoFactura += descuentoProducto;
				this.subTotalConIvaFactura += productoConDescuento;
			} else {
				productoConDescuento = costoProducto - costoProducto * (productoFactura.Descuento / 100);
				this.descuentoCalculoFactura += descuentoProducto;
				this.subTotalFactura += costoProducto;
				this.subtotalFacturaConDescuento += productoConDescuento;
				this.subTotalConIvaFactura += productoConDescuento;
			}
		} else {
			if (productoFactura.GravadoIva) {
				productoConIva = costoProducto + costoProducto * this.valorIva;
				productoConDescuento = productoConIva - costoProducto * (productoFactura.Descuento / 100);
				this.subtotalFacturaConDescuento -= costoProducto - costoProducto * (productoFactura.Descuento / 100);
				this.subTotalFactura -= costoProducto;
				this.descuentoCalculoFactura -= descuentoProducto;
				this.ivaCalculoFactura -= ivaDelProducto;
				this.subTotalConIvaFactura -= productoConDescuento;
			} else {
				productoConDescuento = costoProducto - costoProducto * (productoFactura.Descuento / 100);
				this.subTotalFactura -= costoProducto;
				this.subTotalConIvaFactura -= productoConDescuento;
				this.descuentoCalculoFactura -= descuentoProducto;
				this.subtotalFacturaConDescuento -= productoConDescuento;
			}
		}

	}
}
