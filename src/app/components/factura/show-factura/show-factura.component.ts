import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FacturaService, ProveedorService} from '@app/core/service.index';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Factura} from '@app/models/Factura';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Proveedor} from '@app/models/Proveedor';

@Component({
	selector: "app-show-factura",
	templateUrl: "./show-factura.component.html",
	styleUrls: ["./show-factura.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowFacturaComponent implements OnInit {
	public factura: Factura;
	public proveedores: Proveedor[];
	public formFactura: FormGroup;
	public formDetallesFactura: FormGroup;
	public IdMonedaSeleccionada: number;
	public IdFormaPagoSeleccionado: number;

	Moneda = [{ Id: 1, Moneda: "Córdobas" }, { Id: 2, Moneda: "Dólares" }];

	FormaPago = [{ Id: 1, FormaPago: "Contado" }, { Id: 2, FormaPago: "Crédito" }];
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
			hora: new FormControl("", []),
			totalImpreso: new FormControl("", []),
			descuentoTotal: new FormControl("", []),
			fechaRecepcion: new FormControl("", [])
		});
	}

	initFormDetalleFactura() {
		this.formDetallesFactura = this._formBuilderFactura.group({});
	}

	setDataFormFactura() {
		this.formFactura.controls["mumeroFactura"].setValue(this.factura.NumRefFactura);
		this.formFactura.controls["fechaFactura"].setValue(this.factura.FechaIngreso);
		this.formFactura.controls["usuario"].setValue(this.factura.TrabajadorIngreso);
		this.formFactura.controls["nombrevendedor"].setValue(this.factura.NombVendedor);
		this.formFactura.controls["FormaPago"].setValue(this.IdFormaPagoSeleccionado);
		this.formFactura.controls["Moneda"].setValue(this.IdMonedaSeleccionada);
		this.formFactura.controls["Proveedor"].setValue(this.factura.IdProveedor);
		this.formFactura.controls["totalImpreso"].setValue(this.factura.TotalOrigenFactura + " C$");
		this.formFactura.controls["descuentoTotal"].setValue(this.factura.TotalDescuento + " C$");
		this.formFactura.controls["fechaFactura"].setValue(this.factura.FechaFactura);
		this.formFactura.controls["fechaRecepcion"].setValue(this.factura.FechaRecepcion);
		this.formFactura.controls["hora"].setValue(this.factura.HoraIngreso);
	}

	setDataFormDetailFactura() {}

	getFacturaById() {
		this._route.params.forEach((params: Params) => {
			const idFactura = params["id"];

			this._facturaService.getFacturaById(idFactura).subscribe(response => {
				if (response.factura) {
					this.factura = response.factura;
					this.setDataFormFactura();
					this.setDataFormDetailFactura();
					this.cdr.markForCheck();
				}
			});
		});
	}

	getProveedores() {
		this._proveedorService.getProveedores(1).subscribe(response => {
			if (response.proveedores) {
				this.proveedores = response.proveedores;
				this.cdr.markForCheck();
			}
		});
	}
}
