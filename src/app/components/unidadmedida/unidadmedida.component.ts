import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import {
	ClasificacionProductoService,
	ClasificacionUnidadMedidaService,
	SpinnerService,
	UnidadMedidaService
} from "@app/core/service.index";
import { ClasificacionProducto } from "@app/models/ClasificacionProducto";
import { ClasificacionUnidadDeMedida } from "@app/models/ClasificacionUnidadDeMedida";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { DataTableDirective } from "angular-datatables";
import { ModalDirective } from "ng-uikit-pro-standard";
import { UnidadMedida } from "@app/models/UnidadMedida";
import { Utils } from "../Utils";
import { idioma_espanol } from "@app/core/services/shared/global";
import swal from "sweetalert2";
declare var $: any;

@Component({
	selector: "app-unidadmedida",
	templateUrl: "./unidadmedida.component.html",
	styleUrls: ["./unidadmedida.component.css"]
})
export class UnidadmedidaComponent implements OnInit {
	@ViewChild("modalAddUnidadMedida")
	modalAddUnidadMedida: ModalDirective;

	@ViewChild("modalUpdateUnidadMedida")
	modalUpdateUnidadMedida: ModalDirective;

	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

	public unidadMedida: UnidadMedida;
	public unidadesMedida: UnidadMedida[];
	public clasificaciones: ClasificacionProducto[];
	public formUpdateUnidadMedida: FormGroup;
	public clasificacionesUnidad: ClasificacionUnidadDeMedida[];
	public tituloPantalla = "Unidad de Medida";
	peticionEnCurso = false;

	constructor(
		private clasificacionService: ClasificacionProductoService,
		private clasificacionUnidadService: ClasificacionUnidadMedidaService,
		private formBuilder: FormBuilder,
		private unidadMedidaService: UnidadMedidaService,
		private spinner: SpinnerService,
		private cdr: ChangeDetectorRef
	) {
		this.unidadMedida = new UnidadMedida();
	}

	ngOnInit() {
		$(document).ready(function() {
			$(".letras").keypress(function(key) {
				if (
					(key.charCode < 97 || key.charCode > 122) && // letras mayusculas
					(key.charCode < 65 || key.charCode > 90) && // letras minusculas
					key.charCode !== 45 && // retroceso
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
		this.getUnidadesMedida();
		this.initFormUpdate();
		this.getClasificaciones();
		this.getClasificacionUnidades();
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
						this.unidadMedidaService.mostrarModal();
					}
				}
			]
		};
	}

	getUnidadesMedida() {
		this.spinner.display(true);
		this.unidadMedidaService.getUnidadesMedida().subscribe(response => {
			if (response.unidadesmedida) {
				this.unidadesMedida = response.unidadesmedida;
				this.dtTrigger.next();
				this.cdr.markForCheck();
			}
		});
	}

	initFormUpdate() {
		this.formUpdateUnidadMedida = this.formBuilder.group({
			nombreUnidadMedida: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			simboloUnidadMedida: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(3),
				CustomValidators.nospaceValidator
			]),
			clasificacionesUnidad: new FormControl("", [Validators.required])
		});
	}

	getClasificacionUnidades() {
		this.clasificacionUnidadService.getClasificacionUnidadesMedida().subscribe(response => {
			if (response.clasificaciones) {
				this.clasificacionesUnidad = response.clasificaciones;
			}
		});
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

	updateUnidadMedida() {
		this.peticionEnCurso = true;
		this.getValuesFormUpdateUnidad();
		this.unidadMedidaService.updateUnidadMedida(this.unidadMedida).subscribe(
			response => {
				if (response.success) {
					swal.fire(this.tituloPantalla, "La unidad ha sido actualizada exitosamente!", "success").then(() => {
						this.modalUpdateUnidadMedida.hide();
						this.formUpdateUnidadMedida.reset();
						this.getUnidadesMedidaRender();
					});
				}
			},
			error => {
				this.peticionEnCurso = false;
			},
			() => {
				this.peticionEnCurso = true;
			}
		);
	}

	getValuesFormUpdateUnidad() {
		this.unidadMedida.NombUnidad = this.formUpdateUnidadMedida.value.nombreUnidadMedida;
		this.unidadMedida.Simbolo = this.formUpdateUnidadMedida.value.simboloUnidadMedida;
		this.unidadMedida.NImportancia = this.formUpdateUnidadMedida.value.nimportancia;
	}

	getUnidadesMedidaRender() {
		this.unidadMedidaService.getUnidadesMedida().subscribe(response => {
			if (response.unidadesmedida) {
				this.unidadesMedida = response.unidadesmedida;
				this.rerender();
			} else {
			}
		});
	}

	getClasificaciones() {
		this.clasificacionService.getClasificaciones().subscribe(response => {
			if (response.clasificaciones) {
				this.clasificaciones = response.clasificaciones;
			}
		});
	}

	deleteUnidadMedida(idUnidad) {
		swal.fire({
			title: "Estas seguro(a)?",
			text: "La unidad de medida sera inhabilitada!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si!",
			cancelButtonText: "Cancelar"
		}).then(result => {
			if (result.value) {
				this.unidadMedidaService.deleteUnidadMedida(idUnidad).subscribe(response => {
					if (response.success) {
						swal.fire(this.tituloPantalla, "La unidad de medida ha sido inhabilitada exitosamente", "success").then(() => {
							this.getUnidadesMedidaRender();
						});
					}
				});
			}
		});
	}

	showModalUpdateUnidad(modal, Unidad: UnidadMedida) {
		this.unidadMedida.IdUnidadMedida = Unidad.IdUnidadMedida;
		this.unidadMedida.IdClasifUDM = Unidad.IdClasifUDM;
		this.unidadMedida.NImportancia = Unidad.NImportancia;

		this.formUpdateUnidadMedida.reset();
		this.formUpdateUnidadMedida.setValue({
			nombreUnidadMedida: Unidad.NombUnidad,
			simboloUnidadMedida: Unidad.Simbolo,
			clasificacionesUnidad: Unidad.IdClasifUDM
		});

		modal.show();
	}

	changeClasificacionUnidad(event) {
		if (event === null) {
			this.unidadMedida.IdClasifUDM = null;
		} else {
			this.unidadMedida.IdClasifUDM = event.IdClasifUDM;
		}
	}

	resultadoConsultaAddUnidadMedida(event) {
		if (event) {
			this.getUnidadesMedidaRender();
		}
	}
}
