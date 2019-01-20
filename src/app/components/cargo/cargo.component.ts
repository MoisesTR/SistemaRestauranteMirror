import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Cargo } from "@app/models/Cargo";
import { Subject } from "rxjs/Subject";
import { ActivatedRoute, Router } from "@angular/router";
import { CargoService } from "@app/core/service.index";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import swal from "sweetalert2";
import { DataTableDirective } from "angular-datatables";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { idioma_espanol } from "@app/core/services/shared/global";
import { Utils } from "../Utils";
import { ModalDirective } from "ng-uikit-pro-standard";

declare var $: any;

@Component({
	selector: "app-cargo",
	templateUrl: "./cargo.component.html",
	styleUrls: ["./cargo.component.css"],
	providers: [CargoService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CargoComponent implements OnInit, InvocarFormulario, OnDestroy {
	public cargo: Cargo;
	public cargos: Cargo[];
	public formAddCargo: FormGroup;
	public formUpdateCargo: FormGroup;
	public tituloPantalla = "Cargo";

	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

	@ViewChild("modalAddCargo") modalAddCargo: ModalDirective;
	@ViewChild("modalUpdateCargo") modalUpdateCargo: ModalDirective;

	@ViewChild(DataTableDirective) dtElement: DataTableDirective;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _cargoServicio: CargoService,
		private _formBuilderCargo: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.cargo = new Cargo();
	}

	ngOnInit() {
		$(document).ready(() => {
			$(".letras").keypress(function(key) {
				if (
					(key.charCode < 97 || key.charCode > 122) && // letras mayusculas
					(key.charCode < 65 || key.charCode > 90) && // letras minusculas
					key.charCode !== 241 && // ñ
					key.charCode !== 209 && // Ñ
					key.charCode !== 32 && // espacio
					key.charCode !== 225 && // á
					key.charCode !== 233 && // é
					key.charCode !== 237 && // í
					key.charCode !== 243 && // ó
					key.charCode !== 250 && // ú
					key.charCode !== 193 && // Á
					key.charCode !== 201 && // É
					key.charCode !== 205 && // Í
					key.charCode !== 211 && // Ó
					key.charCode !== 218 // Ú
				) {
					return false;
				}
			});
		});
		this.settingsDatatable();
		this.getCargo();
		this.initFormAddCargo();
		this.initFormUpdateCargo();
	}

	settingsDatatable() {
		/*PROPIEDADES GENERALES DE LA DATATABLE*/
		this.dtOptions = <DataTables.Settings>{
			pagingType: "full_numbers",
			pageLength: 10,
			language: idioma_espanol,
			lengthChange: false,
			responsive: true,
			dom: "Bfrtip",
			buttons: [
				{
					text: "Agregar",
					key: "1",
					className: "btn orange-chang float-right-dt",
					action: (e, dt, node, config) => {
						this.InvocarModal(this.modalAddCargo, this.formAddCargo);
					}
				}
			]
		};
	}

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			// Destroy the table first
			dtInstance.destroy();
			// Call the dtTrigger to rerender again
			this.dtTrigger.next();
			this.cdr.detectChanges();
		});
	}

	getCargo() {
		this._cargoServicio.getCargos().subscribe(
			response => {
				if (response.cargos) {
					this.cargos = response.cargos;
					this.dtTrigger.next();
					this.cdr.markForCheck();
				}
			},
			error => {}
		);
	}

	getCargosRender() {
		this._cargoServicio.getCargos().subscribe(
			response => {
				if (response.cargos) {
					this.cargos = response.cargos;
					this.rerender();
				}
			},
			error => {}
		);
	}

	/*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
	initFormAddCargo() {
		this.formAddCargo = this._formBuilderCargo.group({
			nombreCargo: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			descripcionCargo: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			])
		});
	}

	initFormUpdateCargo() {
		this.formUpdateCargo = this._formBuilderCargo.group({
			nombreCargo: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			descripcionCargo: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			])
		});
	}

	getValuesFormAddCargo() {
		this.cargo.NombreCargo = this.formAddCargo.value.nombreCargo;
		this.cargo.DescripcionCargo = this.formAddCargo.value.descripcionCargo;
	}

	getValuesFormUpdateCargo() {
		this.cargo.NombreCargo = this.formUpdateCargo.value.nombreCargo;
		this.cargo.DescripcionCargo = this.formUpdateCargo.value.descripcionCargo;
	}

	createCargoUsuario() {
		this.getValuesFormAddCargo();

		this._cargoServicio.createCargo(this.cargo).subscribe(
			response => {
				if (response) {
					swal("Cargo", "El Cargo ha sido creado exitosamente!", "success").then(() => {
						this.modalAddCargo.hide();
						this.formAddCargo.reset();
						this.cargo = new Cargo();
						this.getCargosRender();
					});
				} else {
					Utils.showMsgInfo("Ha ocurrido un error al insertar el cargo, intentalo nuevamente", this.tituloPantalla);
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	updateCargo() {
		this.getValuesFormUpdateCargo();

		this._cargoServicio.updateCargo(this.cargo).subscribe(
			response => {
				if (response.success) {
					swal("Cargo", "El cargo ha sido actualizado exitosamente!", "success").then(() => {
						this.modalUpdateCargo.hide();
						this.formUpdateCargo.reset();
						this.getCargosRender();
					});
				} else {
					Utils.showMsgInfo("Ha ocurrido un error inesperado en la actualización", this.tituloPantalla);
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
		this.cargo = new Cargo();
	}

	deleteCargo(IdCargo) {
		swal({
			title: "Estas seguro(a)?",
			text: "El cargo sera eliminado permanentemente!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, Eliminalo!",
			cancelButtonText: "Cancelar"
		}).then(result => {
			if (result.value) {
				this._cargoServicio.deleteCargo(IdCargo).subscribe(
					response => {
						if (response.success) {
							swal(this.tituloPantalla, "El cargo ha sido eliminado exitosamente", "success").then(() => {
								this.getCargosRender();
							});
						} else {
							Utils.showMsgInfo("Ha ocurrido un error al eliminar", this.tituloPantalla);
						}
					},
					error => {
						Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
					}
				);
			} else if (result.dismiss === swal.DismissReason.cancel) {
			}
		});
	}

	InvocarModal(Modal, Formulario) {
		Utils.invocacionModal(Modal, Formulario);
	}

	invocarModalUpdate(Modal, cargo: Cargo) {
		this.cargo.IdCargo = cargo.IdCargo;
		this.cargo.NombreCargo = cargo.NombreCargo;
		this.cargo.DescripcionCargo = cargo.DescripcionCargo;

		this.formUpdateCargo.reset();
		this.formUpdateCargo.setValue({
			nombreCargo: cargo.NombreCargo,
			descripcionCargo: cargo.DescripcionCargo
		});
		Modal.show();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}
}
