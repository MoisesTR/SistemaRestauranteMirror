import { Component, OnInit, ViewChild } from '@angular/core';
import { IMyOptions, ModalDirective } from 'ng-uikit-pro-standard';
import { opcionesDatePicker } from '@app/core/services/shared/global';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturaService, ProveedorService } from '@app/core/service.index';
import { Proveedor } from '@app/models/Proveedor';
import { Utils } from '../../Utils';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Factura } from '@app/models/Factura';
import { Cambio } from '@app/models/Cambio';

@Component({
	selector: 'app-busquedafacturas',
	templateUrl: './busquedafacturas.component.html',
	styleUrls: ['./busquedafacturas.component.scss']
})
export class BusquedafacturasComponent implements OnInit {
	public startDate: IMyOptions = opcionesDatePicker;
	public finalDate: IMyOptions = opcionesDatePicker;
	public proveedores: Proveedor[];
	public formBusquedaFactura: FormGroup;
	public fechaInicio: string = null;
	public fechaFin: string = null;
	public idProveedor: number = null;
	public facturas: Factura[];
	public cambios: Cambio[];

	@ViewChild('modalCambiosFactura') modalCambiosFactura: ModalDirective;
	nativeWindow: any;
	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _proveedorService: ProveedorService,
		private _formBuilderBusquedaFactura: FormBuilder,
		private _facturaService: FacturaService
	) {
		this.getProveedores();
	}

	ngOnInit() {
		this.initFormBusquedaFactura();
	}

	initFormBusquedaFactura() {
		this.formBusquedaFactura = this._formBuilderBusquedaFactura.group({
			proveedor: new FormControl('', Validators.required),
			fechaInicio: new FormControl('', Validators.required),
			fechaFin: new FormControl('', Validators.required)
		});
	}

	mostrarFactura(idFactura: number) {
		this._router.navigate(['factura/showFactura/' + idFactura]);
	}

	editarFactura(idFactura: number) {
		this._router.navigate(['factura/updateFactura/' + idFactura]);
	}

	getProveedores() {
		this._proveedorService.getProveedores(1).subscribe(
			response => {
				if (response.proveedores) {
					this.proveedores = response.proveedores;
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), 'Busqueda facturas');
			}
		);
	}

	onChangeProveedor(event) {
		if (event === null || event === undefined) {
			this.idProveedor = null;
		} else {
			this.idProveedor = event.IdProveedor;
		}
	}

	findFacturas() {
		this.getDataFactura();

		if (this.idProveedor === null && this.fechaInicio === null && this.fechaFin === null) {
			Utils.showMsgInfo('Debes digitar al menos uno de los parametros de busqueda', 'Busqueda Facturas');
		} else if (this.fechaInicio !== null && this.fechaFin === null) {
			Utils.showMsgInfo('Debes digitar la fecha fin', 'Busqueda Facturas');
		} else if (this.fechaInicio === null && this.fechaFin !== null) {
			Utils.showMsgInfo('Debes digitar la fecha inicio', 'Busqueda Facturas');
		} else {
			this._facturaService
				.getFacturas(null, true, this.fechaInicio, this.fechaFin, this.idProveedor, 2, null)
				.subscribe(
					response => {
						this.facturas = response.facturas;

						if (this.facturas.length === 0) {
							Utils.showMsgInfo('No se encontraron facturas con los parametros digitados', 'Busqueda Facturas');
						}
					},
					error => {
						Utils.showMsgError(Utils.msgError(error));
					}
				);
		}
	}

	mostrarModalCambiosFactura(IdFactura: number) {
		this.modalCambiosFactura.show();

		this._facturaService.getCambiosFacturaById(IdFactura).subscribe(
			response => {
				if (response.cambios) {
					this.cambios = response.cambios;
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), 'Busqueda Factura');
			},
			() => {}
		);
	}

	getDataFactura() {
		this.fechaInicio =
			this.formBusquedaFactura.value.fechaInicio === '' ? null : this.formBusquedaFactura.value.fechaInicio;
		this.fechaFin = this.formBusquedaFactura.value.fechaFin === '' ? null : this.formBusquedaFactura.value.fechaFin;
	}

	imprimirFactura(idFactura) {}
}
