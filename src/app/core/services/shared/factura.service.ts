import { Injectable } from "@angular/core";
import { Global } from "./global";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ProductoFactura } from "@app/models/ProductoFactura";
import { Utils } from "@app/components/Utils";
import { DetalleFactura } from "@app/models/DetalleFactura";
import { Factura } from "@app/models/Factura";
import { FormGroup } from "@angular/forms";
import { SUMA } from "@app/core/services/shared/global";
import { ToastService } from "ng-uikit-pro-standard";
import { TipoDescuentoEnum } from "@app/Enums/TipoDescuentoEnum";

@Injectable()
export class FacturaService {
	public url: string;
	public valorIva = 0.15;

	constructor(private _http: HttpClient, private toastService: ToastService) {
		this.url = Global.url;
	}

	getFacturaById(idFactura: number): Observable<any> {
		return this._http.get(this.url + "getFactura?IdFactura=" + idFactura);
	}

	getCambiosFacturaById(idFactura: number): Observable<any> {
		return this._http.get(this.url + "getCambiosFactura?IdFactura=" + idFactura);
	}

	getFacturas(
		IdFechaFiltro = null,
		Habilitado = true,
		FechaInicio = null,
		FechaFin = null,
		IdProveedor,
		IdEstadoFactura,
		CodFactura
	): Observable<any> {
		let params = new HttpParams().set("IdProveedor", IdProveedor).set("IdEstadoFactura", IdEstadoFactura);

		if (CodFactura) params = params.set("CodFactura", CodFactura);
		if (FechaInicio) params = params.set("FechaInicio", FechaInicio);
		if (FechaFin) params = params.set("FechaFin", FechaFin);
		if (IdFechaFiltro) params = params.set("IdFechaFiltro", IdFechaFiltro);

		return this._http.get(this.url + "listarfacturas?Habilitado=" + Habilitado, { params: params });
	}

	getFacturasIngresadas(): Observable<any> {
		return this._http.get(this.url + "getFacturas");
	}

	createFactura(factura: Factura): Observable<any> {
		const params = JSON.stringify(factura);
		const headers = new HttpHeaders({ "Content-type": "application/json" });

		return this._http.post(this.url + "bulk/factComp", params, { headers: headers });
	}

	createDetailFactura(facturaDetalle): Observable<any> {
		const params = JSON.stringify(facturaDetalle);
		const headers = new HttpHeaders({ "Content-type": "application/json" });

		return this._http.post(this.url + "detalleFactComp/", params, { headers: headers });
	}

	getTop5ProductosMasCompradosFacturas(): Observable<any> {
		return this._http.get(this.url + "top5Productos/");
	}

	updateDetailFactura(FacturaDetalle): Observable<any> {
		const params = JSON.stringify(FacturaDetalle);
		const headers = new HttpHeaders({ "Content-type": "application/json" });

		return this._http.post(this.url + "detalleFactComp/", params, { headers: headers });
	}

	updateFactura(factura): Observable<any> {
		const params = JSON.stringify(factura);
		const headers = new HttpHeaders({ "Content-type": "application/json" });

		return this._http.post(this.url + "updateFactComp/", params, { headers: headers });
	}

	/**
	 * Factura Reglas
	 */
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

	existenMontosMenorIgualaCero(productosFactura: ProductoFactura[]) {
		let menorIgualCero = false;
		productosFactura.forEach((value, index) => {
			if (value.TotalDetalle === undefined) {
				menorIgualCero = true;
			} else if (value.TotalDetalle <= 0) {
				menorIgualCero = true;
			}
		});

		return menorIgualCero;
	}

	validarCrearFactura(productosFactura: ProductoFactura[], factura: Factura): boolean {
		if (productosFactura.length < 1) {
			Utils.showMsgInfo("Selecciona al menos un producto para crear la factura", "Factura");
			return false;
		}
		if (factura.TotalFactura === 0) {
			Utils.showMsgInfo("El total de la factura no puede ser igual a cero!", "Factura");
			return false;
		}
		if (factura.TotalOrigenFactura === 0) {
			Utils.showMsgInfo("El total origen factura no puede ser menor o igual a cero!", "Factura");
			return false;
		}
		if (factura.DescuentoCalculoFactura > factura.SubTotal) {
			Utils.showMsgInfo("El descuento no puede ser mayor al subtotal de la factura!", "Factura");
			return false;
		}
		if (this.existenMontosMenorIgualaCero(productosFactura)) {
			Utils.showMsgInfo("El costo total de cada producto en la factura debe ser mayor cero", "Factura");
			return false;
		}
		if (factura.FechaRecepcion < factura.FechaFactura) {
			Utils.showMsgInfo("La fecha de recepción no puede ser menor a la fecha de la factura!", "Factura");
			return false;
		}

		const diferencia = Utils.round(factura.TotalFactura - factura.TotalOrigenFactura, 2);
		if (Math.abs(diferencia) >= 100) {
			Utils.showMsgInfo("Existe una diferencia de: " + diferencia + 'C$ entre el monto calculado y monto origen de la factura, revisa los calculos!', "Factura");
			return false;
		}

		return true;
	}

	crearDetalleFactura(productosFactura: ProductoFactura[], descuentoCalculoFactura: number, descuentoGlobalHabilitado: boolean) {
		const detalleFactura: DetalleFactura[] = [];
		productosFactura.forEach((producto, index) => {
			const productoFactura = new DetalleFactura();
			productoFactura.IdProducto = producto.IdProducto;
			productoFactura.PrecioUnitario = producto.Costo;
			productoFactura.Cantidad = producto.Cantidad;
			productoFactura.GravadoIva = producto.GravadoIva;
			productoFactura.SubTotal = producto.Subtotal;
			productoFactura.Iva = producto.Iva;
			productoFactura.TotalDetalle = producto.TotalDetalle;

			if (descuentoCalculoFactura === 0) {
				productoFactura.IdTipDesc = TipoDescuentoEnum.SinDescuentoAplicado;
			} else {
				if (descuentoGlobalHabilitado) {
					productoFactura.IdTipDesc = TipoDescuentoEnum.DescuentoMonetarioSobreTransaccion;
				} else {
					if (producto.IsDescuentoPorcentual) {
						productoFactura.IdTipDesc = TipoDescuentoEnum.DescuentoPorcentualPorItem;
					} else {
						productoFactura.IdTipDesc = TipoDescuentoEnum.DescuentoMonetarioPorItem;
					}
				}
			}

			productoFactura.Descuento = producto.Descuento;
			productoFactura.IsDescuentoPorcentual = producto.IsDescuentoPorcentual;
			productoFactura.PorcentajeDescuento = producto.IsDescuentoPorcentual ? producto.PorcentajeDescuento : null;
			productoFactura.EfectivoDescuento = producto.IsDescuentoPorcentual ? null : producto.DescuentoIngresado;
			productoFactura.Bonificacion = 0;
			detalleFactura.push(productoFactura);
		});

		return detalleFactura;
	}

	asignarValoresEditarProducto(productoFactura: ProductoFactura, formEditarDetalleProducto: FormGroup) {
		productoFactura.Costo = formEditarDetalleProducto.value.precioProducto;
		productoFactura.Cantidad = formEditarDetalleProducto.value.cantidadProducto;
		productoFactura.DescuentoIngresado = formEditarDetalleProducto.value.descuentoTotalProducto;
		productoFactura.GravadoIva = formEditarDetalleProducto.value.gravadoIva ? 1 : 0;
		productoFactura.IsDescuentoPorcentual = formEditarDetalleProducto.value.tipoDescuento;
	}

	productoValido(producto: ProductoFactura, descuentoGlobalHabilitado: boolean): boolean {
		const productoFiltrado = Object.assign({}, producto);

		if (
			productoFiltrado.Costo > 0 &&
			productoFiltrado.Cantidad > 0 &&
			((productoFiltrado.IsDescuentoPorcentual && productoFiltrado.DescuentoIngresado <= 100) ||
				(!productoFiltrado.IsDescuentoPorcentual &&
					productoFiltrado.DescuentoIngresado <= productoFiltrado.Cantidad * productoFiltrado.Costo))
		) {
			if (descuentoGlobalHabilitado && productoFiltrado.DescuentoIngresado > 0) {
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

	calculoValoresFactura(
		factura: Factura,
		productoFactura: ProductoFactura,
		productosFactura: ProductoFactura[],
		operacion: string,
		deshabilitarDescuentoXItem: boolean
	) {
		if (operacion === SUMA) {
			factura.SubTotal += productoFactura.Subtotal;
			factura.IvaCalculoFactura += productoFactura.CalculoIva;
			factura.SubTotalConIvaFactura += productoFactura.TotalDetalle;

			if (!deshabilitarDescuentoXItem) {
				factura.DescuentoCalculoFactura += productoFactura.Descuento;
				factura.SubtotalFacturaConDescuento += productoFactura.DetalleMenosDescuento;
			}
		} else {
			factura.SubTotal -= productoFactura.Subtotal;
			factura.IvaCalculoFactura -= productoFactura.CalculoIva;
			factura.SubTotalConIvaFactura -= productoFactura.TotalDetalle;

			if (!deshabilitarDescuentoXItem) {
				factura.DescuentoCalculoFactura -= productoFactura.Descuento;
				factura.SubtotalFacturaConDescuento -= productoFactura.DetalleMenosDescuento;
			}
		}

		if (deshabilitarDescuentoXItem) {
			this.calcularDescuentoGlobalFactura(factura, productosFactura);
		}

		this.calcularTotalFactura(factura);
	}

	calcularTotalFactura(factura: Factura) {
		factura.TotalFactura = factura.SubTotal + factura.IvaCalculoFactura - factura.DescuentoCalculoFactura;
	}

	calcularDescuentoGlobalFactura(factura: Factura, productosFactura: ProductoFactura[]) {
		let sumaProductos = 0;
		productosFactura.forEach((value, index) => {
			sumaProductos += value.Subtotal;
		});

		factura.SubtotalFacturaConDescuento = sumaProductos - factura.DescuentoCalculoFactura;
	}

	agregarProductoAFactura(
		factura: Factura,
		producto: ProductoFactura,
		productosFactura: ProductoFactura[],
		descuentoGlobalHabilitado: boolean,
		deshabilitarDescuentoXItem: boolean
	) {
		let productoFiltrado: ProductoFactura = new ProductoFactura();
		productoFiltrado = Object.assign({}, producto);

		if (this.productoValido(productoFiltrado, descuentoGlobalHabilitado)) {
			this.calculoProducto(productoFiltrado);
			productosFactura.push(productoFiltrado);
			this.calculoValoresFactura(factura, productoFiltrado, productosFactura, SUMA, deshabilitarDescuentoXItem);
			this.resetProductoFiltrado(producto);
			this.showSuccess();
		}
	}

	showSuccess() {
		const options = {
			enableHtml: false,
			positionClass: "toast-top-right",
			toastClass: "opacity"
		};
		this.toastService.success("El producto ha sido agregado a la factura", "Factura", options);
	}
}
