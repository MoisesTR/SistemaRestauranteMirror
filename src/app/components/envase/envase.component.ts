import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { CustomValidators } from "@app/validadores/CustomValidators";
import { DataTableDirective } from "angular-datatables";
import { EnvaseService } from "@app/core/service.index";
import { Envase } from "@app/models/Envase";
import { ModalDirective } from "ng-uikit-pro-standard";
import { Utils } from "../Utils";
import { idioma_espanol } from "@app/core/services/shared/global";
import swal from "sweetalert2";

@Component({
	selector: "app-envase",
	templateUrl: "./envase.component.html",
	styleUrls: ["./envase.component.css"]
})
export class EnvaseComponent implements OnInit {
	dtOptions: DataTables.Settings = {};
	// We use this trigger because fetching the list of persons can be quite long,
	// thus we ensure the data is fetched before rendering
	dtTrigger: Subject<any> = new Subject<any>();

	@ViewChild("modalAddEnvase")
	modalAddEnvase: ModalDirective;

	@ViewChild("modalUpdateEnvase")
	modalUpdateEnvase: ModalDirective;

	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;

	public envase: Envase;
	public envases: Envase[];
	public tituloPantalla = "Envase";

	public formUpdateEnvase: FormGroup;
	peticionEnCurso = false;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private envaseService: EnvaseService
	) {
		this.envase = new Envase();
	}

	ngOnInit() {
		this.settingsDatatable();
		this.getEnvases();
		this.initFormUpdateEnvase();
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
						this.envaseService.mostrarModal();
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
		});
	}

	getEnvases() {
		this.envaseService.getEnvases().subscribe(
			response => {
				if (response.envases) {
					this.envases = response.envases;
					this.dtTrigger.next();
				} else {
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	getEnvasesRender() {
		this.envaseService.getEnvases().subscribe(
			response => {
				if (response.envases) {
					this.envases = response.envases;
					this.rerender();
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	initFormUpdateEnvase() {
		this.formUpdateEnvase = new FormGroup({
			nombreEnvase: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			descripcionEnvase: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			])
		});
	}

	getValuesFormUpdateEnvase() {
		this.envase.NombreEnvase = this.formUpdateEnvase.value.nombreEnvase;
		this.envase.Descripcion = this.formUpdateEnvase.value.descripcionEnvase;
	}

	showModalUpdateEnvase(envase: Envase) {
		this.envase.IdEnvase = envase.IdEnvase;

		this.formUpdateEnvase.reset();
		this.formUpdateEnvase.setValue({
			nombreEnvase: envase.NombreEnvase,
			descripcionEnvase: envase.Descripcion
		});

		this.modalUpdateEnvase.show();
	}

	updateEnvase() {
		this.peticionEnCurso = true;
		this.getValuesFormUpdateEnvase();
		this.envaseService.updateEnvase(this.envase).subscribe(
			response => {
				if (response.success) {
					swal(
						this.tituloPantalla,
						"El envase ha sido actualizado exitosamente!",
						"success"
					).then(() => {
						this.modalUpdateEnvase.hide();
						this.formUpdateEnvase.reset();
						this.getEnvasesRender();
						this.envase = new Envase();
					});
				} else {
					Utils.showMsgInfo(
						"Ha ocurrido un error inesperado al actualizar en envase!",
						this.tituloPantalla
					);
				}
			},
			error => {
				this.peticionEnCurso = false;
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			},
			() => {
				this.peticionEnCurso = false;
			}
		);
	}

	deleteEnvase(idEnvase) {
		swal({
			title: "Estas seguro(a)?",
			text: "El envase sera inhabilitado!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
            confirmButtonText: "Si!",
            cancelButtonText: "Cancelar"
		}).then(result => {
			if (result.value) {
				this.envaseService.deleteEnvase(idEnvase).subscribe(
					response => {
						if (response.success) {
							swal(
								this.tituloPantalla,
								"El envase ha sido inhabilitado exitosamente",
								"success"
							).then(() => {
								this.getEnvasesRender();
							});
						} else {
							Utils.showMsgInfo(
								"Ha ocurrido un error al inhabilitar el envase!",
								this.tituloPantalla
							);
						}
					},
					error => {
						Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
					}
				);
			}
		});
	}

	resultadoConsultaAddEnvase(event) {
		if (event) {
			this.getEnvasesRender();
		}
	}
}
