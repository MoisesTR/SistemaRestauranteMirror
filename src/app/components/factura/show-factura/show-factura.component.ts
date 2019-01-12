import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { IMyOptions } from "ng-uikit-pro-standard";
import { opcionesDatePicker } from "@app/core/services/shared/global";
import { FacturaService, ProveedorService } from "@app/core/service.index";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Factura } from "@app/models/Factura";
import { Utils } from "../../Utils";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Proveedor } from "@app/models/Proveedor";

@Component({
	selector: "app-show-factura",
	templateUrl: "./show-factura.component.html",
	styleUrls: ["./show-factura.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowFacturaComponent implements OnInit {
	public myDatePickerOptions: IMyOptions = opcionesDatePicker;
	public factura: Factura;
	public proveedores: Proveedor[];
	public formFactura: FormGroup;
	public formDetallesFactura: FormGroup;
	public IdMonedaSeleccionada: number;
	public IdFormaPagoSeleccionado: number;
	public IdProveedorSeleccionado: number;
	public horaFactura: string;
	public tieneRetencion = 0;

	Moneda = [{ Id: 1, Moneda: "Córdobas" }, { Id: 2, Moneda: "Dólares" }];

	FormaPago = [{ Id: 1, FormaPago: "Contado" }, { Id: 2, FormaPago: "Crédito" }];
	nativeWindow: any;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _facturaService: FacturaService,
		private _proveedorService: ProveedorService,
		private _formBuilderFactura: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.factura = new Factura();
		this.IdMonedaSeleccionada = 1;
		this.IdFormaPagoSeleccionado = 1;
	}

	ngOnInit() {
		this.initFormFactura();
		this.initFormDetalleFactura();
		this.getFacturaById();
		this.getProveedores();
	}

	initFormFactura() {
		this.formFactura = this._formBuilderFactura.group({
			mumeroFactura: new FormControl("", []),
			fechaFactura: new FormControl("", []),
			Moneda: new FormControl("", []),
			FormaPago: new FormControl("", []),
			Proveedor: new FormControl("", []),
			usuario: new FormControl("", []),
			nombrevendedor: new FormControl(""),
			hora: new FormControl("", [])
		});
	}

	initFormDetalleFactura() {
		this.formDetallesFactura = this._formBuilderFactura.group({
			aplicaRetencion: new FormControl("", [])
		});
	}

	setDataFormFactura() {
		this.IdProveedorSeleccionado = this.factura.IdProveedor;
		this.formFactura.controls["mumeroFactura"].setValue(this.factura.NumRefFactura);
		this.formFactura.controls["hora"].setValue(this.factura.HoraIngreso);
		this.formFactura.controls["fechaFactura"].setValue(this.factura.FechaIngreso);
		this.formFactura.controls["usuario"].setValue(this.factura.TrabajadorIngreso);
		this.formFactura.controls["nombrevendedor"].setValue("Vendedor no registrado");
	}

	setDataFormDetailFactura() {
		this.tieneRetencion = this.factura.Retencion;
	}

	getFacturaById() {
		this._route.params.forEach((params: Params) => {
			const idFactura = params["id"];

			this._facturaService.getFacturaById(idFactura).subscribe(
				response => {
					if (response.factura) {
						this.factura = response.factura;
						this.setDataFormFactura();
						this.setDataFormDetailFactura();
						this.cdr.markForCheck();
					} else {
						Utils.showMsgInfo("No se logro obtener algun registro", "Mostrar factura");
					}
				},
				error => {
					Utils.showMsgError(Utils.msgError(error), "Mostrar Factura");
				},
				() => {}
			);
		});
	}

	getProveedores() {
		this._proveedorService.getProveedores(1).subscribe(
			response => {
				if (response.proveedores) {
					this.proveedores = response.proveedores;
				} else {
					Utils.showMsgInfo("No se logro cargar los proveedores", "Mostrar Factura");
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), "Mostrar Factura");
			}
		);
	}
}
