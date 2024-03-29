import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { SettingRestauranteService, SpinnerService, SucursalService, TrabajadorService } from "@app/core/service.index";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { DataTableDirective } from "angular-datatables";
import { ModalDirective } from "ng-uikit-pro-standard";
import { Sucursal } from "@app/models/Sucursal";
import { TelefonoSucursal } from "@app/models/TelefonoSucursal";
import { Utils } from "../Utils";
import { idioma_espanol } from "@app/core/services/shared/global";
import swal from "sweetalert2";
import { Trabajador } from "@app/models/Trabajador";
import { Restaurante } from "@app/models/Restaurante";

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
	public restaurantes: Restaurante[] = [];

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
		private restauranteService: SettingRestauranteService,
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
		this.getRestaurantes();
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
					className: "btn orange-chang float-right-dt white-text",
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
		this.sucursalService.getSucursales().subscribe(response => {
			if (response.sucursales) {
				this.sucursales = response.sucursales;
				this.dtTrigger.next();
				this.cdr.markForCheck();
			}
		});
	}

	getSucursalesRender() {
		this.sucursalService.getSucursales().subscribe(response => {
			if (response.sucursales) {
				this.sucursales = response.sucursales;
				this.rerender();
			}
		});
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
			restaurante: new FormControl(null, Validators.required),
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
			restaurante: new FormControl({ value: null, disabled: true }, Validators.required),
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
	}

	getValuesFormUpdateSucursal() {
		this.sucursal.NombSucursal = this.formUpdateSucursal.value.nombreSucursal;
		this.sucursal.Direccion = this.formUpdateSucursal.value.direccion;
		this.sucursal.IdRestaurante = 1;
		this.sucursal.Telefono1 = this.formUpdateSucursal.value.telefonoPrincipal;
		this.sucursal.Telefono2 = this.formUpdateSucursal.value.telefonoSecundario;
	}

	createSucursal(Modal) {
		this.getValuesFormAddSucursal();

		this.sucursalService.createSucursal(this.sucursal).subscribe(response => {
			if (response.IdSucursal) {
				swal.fire(this.tituloPantalla, "la Sucursal ha sido creada exitosamente!", "success").then(() => {
					Modal.hide();
					this.formAddSucursal.reset();
					this.getSucursalesRender();
				});
			}
		});
	}

	updateSucursal(Modal) {
		this.getValuesFormUpdateSucursal();

		this.sucursalService.updateSucursal(this.sucursal).subscribe(response => {
			if (response.success) {
				swal.fire("Sucursal", "Los datos de la sucursal han sido actualizada exitosamente!", "success").then(() => {
					Modal.hide();
					this.formUpdateSucursal.reset();
					this.getSucursalesRender();
					this.sucursal = new Sucursal();
				});
			}
		});
	}

	deleteSucursal(IdSucursal) {
		swal
			.fire({
				title: "Estas seguro(a)?",
				text: "La sucursal sera eliminada!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Si, Eliminala!",
				cancelButtonText: "Cancelar"
			})
			.then(result => {
				if (result.value) {
					this.sucursalService.deleteSucursal(IdSucursal).subscribe(response => {
						if (response.success) {
							swal.fire("Eliminada!", "La sucursal ha sido eliminada exitosamente", "success").then(() => {
								this.getSucursalesRender();
							});
						}
					});
				} else if (result.dismiss === swal.DismissReason.cancel) {
				}
			});
	}

	getTrabajadores() {
		this.trabajadorService.getTrabajadores(1).subscribe(response => {
			if (response.trabajadores) {
				this.trabajadores = response.trabajadores;
			}
		});
	}

	getRestaurantes() {
		this.restauranteService.getRestaurantes(1).subscribe(response => {
			this.restaurantes = response.restaurantes;
		});
	}

	InvocarModal(Modal, Formulario) {
		Utils.invocacionModal(Modal, Formulario);
	}

	invocarModalUpdate(Modal, sucursal: Sucursal) {
		this.sucursal.IdSucursal = sucursal.IdSucursal;

		this.formUpdateSucursal.reset();
		this.formUpdateSucursal.controls["nombreSucursal"].setValue(sucursal.NombSucursal);
		this.formUpdateSucursal.controls["direccion"].setValue(sucursal.Direccion);
		this.formUpdateSucursal.controls["restaurante"].setValue(sucursal.IdRestaurante);
		this.formUpdateSucursal.controls["telefonoPrincipal"].setValue(sucursal.Telefono1);
		this.formUpdateSucursal.controls["telefonoSecundario"].setValue(sucursal.Telefono2);

		Modal.show();
	}

	changeRestaurante(event) {
		if (event) {
			this.sucursal.IdRestaurante = event.IdRestaurante;
		} else {
			this.sucursal.IdRestaurante = null;
		}
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}
}
