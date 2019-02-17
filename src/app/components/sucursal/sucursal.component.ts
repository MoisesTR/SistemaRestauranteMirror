import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { SpinnerService, SucursalService, TrabajadorService } from "@app/core/service.index";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { DataTableDirective } from "angular-datatables";
import { ModalDirective } from "ng-uikit-pro-standard";
import { Sucursal } from "@app/models/Sucursal";
import { TelefonoSucursal } from "@app/models/TelefonoSucursal";
import { Utils } from "../Utils";
import { idioma_espanol } from "@app/core/services/shared/global";
import swal from "sweetalert2";
import { Trabajador } from "@app/models/Trabajador";
declare var $: any;

@Component({
	selector: "app-sucursal",
	templateUrl: "./sucursal.component.html",
	styleUrls: ["./sucursal.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SucursalComponent implements OnInit, InvocarFormulario, OnDestroy {
	public sucursal: Sucursal;
	public sucursales: Sucursal[];
	public telefonoPrincipal: TelefonoSucursal;
	public telefonoSecundario: TelefonoSucursal;

	public formAddSucursal: FormGroup;
	public formUpdateSucursal: FormGroup;
	public tituloPantalla = "Sucursal";
	public trabajadores: Trabajador[];

	@ViewChild("modalAddSucursal") modalAddSucursal: ModalDirective;

	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private sucursalService: SucursalService,
		private trabajadorService: TrabajadorService,
		private spinner: SpinnerService,
		private formBuilder: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.sucursal = new Sucursal();
		this.telefonoPrincipal = new TelefonoSucursal();
		this.telefonoSecundario = new TelefonoSucursal();
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
		this.getSucursales();
		this.getTrabajadores();
		this.initFormAddSucursal();
		this.initFormUpdateSucursal();
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
						this.InvocarModal(this.modalAddSucursal, this.formAddSucursal);
					}
				}
			]
		};
	}

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.dtTrigger.next();
			this.cdr.detectChanges();
		});
	}

	getSucursales() {
		this.spinner.display(true);
		this.sucursalService.getSucursales().subscribe(
			response => {
				if (response.sucursales) {
					this.sucursales = response.sucursales;
					this.dtTrigger.next();
					this.cdr.markForCheck();
				} else {
					Utils.showMsgInfo("Ha ocurrido un error al obtener las sucursales", this.tituloPantalla);
				}
			},
			error => {
				this.spinner.display(false);
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			},
			() => {
				this.spinner.display(false);
			}
		);
	}

	getSucursalesRender() {
		this.sucursalService.getSucursales().subscribe(
			response => {
				if (response.sucursales) {
					this.sucursales = response.sucursales;
					this.rerender();
				}
			},
			error => {
				Utils.showMsgInfo("Ha ocurrido un error al obtener las sucursales", this.tituloPantalla);
			},
			() => {}
		);
	}

	/*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
	initFormAddSucursal() {
		this.formAddSucursal = this.formBuilder.group({
			nombreSucursal: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			direccion: new FormControl("", [
				Validators.required,
				Validators.minLength(5),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			telefonoPrincipal: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
			telefonoSecundario: new FormControl("", [Validators.minLength(8), Validators.maxLength(8)]),
			trabajador: new FormControl(null, [])
		});
	}

	initFormUpdateSucursal() {
		this.formUpdateSucursal = this.formBuilder.group({
			nombreSucursal: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			direccion: new FormControl("", [
				Validators.required,
				Validators.minLength(5),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			telefonoPrincipal: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
			telefonoSecundario: new FormControl("", [Validators.minLength(8), Validators.maxLength(8)])
		});
	}

	getValuesFormAddSucursal() {
		this.sucursal.NombSucursal = this.formAddSucursal.value.nombreSucursal;
		this.sucursal.Direccion = this.formAddSucursal.value.direccion;
		this.sucursal.Telefono1 = this.formAddSucursal.value.telefonoPrincipal.toString().replace("-", "");
		this.sucursal.Telefono2 =
			this.formAddSucursal.value.telefonoSecundario != null
				? Utils.replaceCharacter(this.formUpdateSucursal.value.telefonoSecundario.toString())
				: "";
		this.sucursal.IdRestaurante = 1;
	}

	getValuesFormUpdateSucursal() {
		this.sucursal.NombSucursal = this.formUpdateSucursal.value.nombreSucursal;
		this.sucursal.Direccion = this.formUpdateSucursal.value.direccion;
		this.sucursal.Telefono1 = this.formUpdateSucursal.value.telefonoPrincipal.toString().replace("-", "");
		this.sucursal.Telefono2 =
			this.formUpdateSucursal.value.telefonoSecundario != null
				? Utils.replaceCharacter(this.formUpdateSucursal.value.telefonoSecundario.toString())
				: "";
		this.sucursal.IdRestaurante = 1;
	}

	createSucursal(Modal) {
		this.getValuesFormAddSucursal();

		this.sucursalService.createSucursal(this.sucursal).subscribe(
			response => {
				if (response.IdSucursal) {
					swal(this.tituloPantalla, "la Sucursal ha sido creada exitosamente!", "success").then(() => {
						Modal.hide();
						this.formAddSucursal.reset();
						this.getSucursalesRender();
					});
				} else {
					Utils.showMsgInfo("Ha ocurrido un error al crear la sucursal,intentalo nuevamente", this.tituloPantalla);
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	updateSucursal(Modal) {
		this.getValuesFormUpdateSucursal();

		this.sucursalService.updateSucursal(this.sucursal).subscribe(
			response => {
				if (response.success) {
					swal("Sucursal", "La sucursal ha sido actualizada exitosamente!", "success")
						.catch(swal.noop)
						.then(() => {
							Modal.hide();
							this.formUpdateSucursal.reset();
							this.getSucursalesRender();
							this.sucursal = new Sucursal();
						});
				} else {
					Utils.showMsgInfo("Ha ocurrido un error al actualizar, intentalo nuevamente", this.tituloPantalla);
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	deleteSucursal(IdSucursal) {
		swal({
			title: "Estas seguro(a)?",
			text: "La sucursal sera eliminada!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, Eliminala!",
			cancelButtonText: "Cancelar"
		}).then(result => {
			if (result.value) {
				this.sucursalService.deleteSucursal(IdSucursal).subscribe(
					response => {
						if (response.success) {
							swal("Eliminada!", "La sucursal ha sido eliminada exitosamente", "success").then(() => {
								this.getSucursalesRender();
							});
						} else {
							swal("Error inesperado", "Ha ocurrido un error en la eliminación, intenta nuevamente!", "error");
						}
					},
					error => {
						Utils.showMsgError(Utils.msgError(error));
					}
				);
			} else if (result.dismiss === swal.DismissReason.cancel) {
			}
		});
	}

	getTrabajadores() {
		this.trabajadorService.getTrabajadores(1).subscribe(response => {
			if (response.trabajadores) {
				this.trabajadores = response.trabajadores;
				console.log(this.trabajadores);
			}
		});
	}

	InvocarModal(Modal, Formulario) {
		Utils.invocacionModal(Modal, Formulario);
	}

	invocarModalUpdate(Modal, sucursal: Sucursal) {
		this.sucursal.IdSucursal = sucursal.IdSucursal;

		this.formUpdateSucursal.reset();

		this.formUpdateSucursal.setValue({
			nombreSucursal: sucursal.NombSucursal,
			direccion: sucursal.Direccion,
			telefonoPrincipal: sucursal.Telefono1,
			telefonoSecundario: sucursal.Telefono2
		});

		Modal.show();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}
}
