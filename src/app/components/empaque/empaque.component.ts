import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { CustomValidators } from "@app/validadores/CustomValidators";
import { DataTableDirective } from "angular-datatables";
import { EmpaqueService, SpinnerService } from "@app/core/service.index";
import { Empaque } from "@app/models/Empaque";
import { ModalDirective } from "ng-uikit-pro-standard";
import { Utils } from "../Utils";
import { idioma_espanol } from "@app/core/services/shared/global";
import swal from "sweetalert2";
import { Subject } from "rxjs/Subject";

@Component({
	selector: "app-empaque",
	templateUrl: "./empaque.component.html",
	styleUrls: ["./empaque.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpaqueComponent implements OnInit, OnDestroy {
	@ViewChild("modalAddEmpaque")
	modalAddEmpaque: ModalDirective;

	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;

	public empaque: Empaque;
	public empaques: Empaque[];
	public tituloPantalla = "Empaque";
	public formUpdateEmpaque: FormGroup;
	peticionEnCurso = false;

	constructor(
		private empaqueService: EmpaqueService,
		private spinner: SpinnerService,
		private formBuilderEmpaque: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.empaque = new Empaque();
	}

	ngOnInit() {
		this.settingsDatatable();
		this.getEmpaques();
		this.initFormUpdateEmpaque();
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
						this.empaqueService.mostrarModal();
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

	getEmpaques() {
		this.spinner.display(true);
		this.empaqueService.getEmpaques().subscribe(response => {
			if (response.empaques) {
				this.empaques = response.empaques;
				this.dtTrigger.next();
				this.cdr.markForCheck();
			}
		});
	}

	getEmpaquesRender() {
		this.empaqueService.getEmpaques().subscribe(response => {
			if (response.empaques) {
				this.empaques = response.empaques;
				this.rerender();
			}
		});
	}

	initFormUpdateEmpaque() {
		this.formUpdateEmpaque = this.formBuilderEmpaque.group({
			nombreEmpaque: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			descripcionEmpaque: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			])
		});
	}

	updateEmpaque(modal) {
		this.peticionEnCurso = true;
		this.getValuesFormUpdateEmpaque();
		this.empaqueService.updateEmpaque(this.empaque).subscribe(
			response => {
				if (response.success) {
					swal("Empaque", "El empaque ha sido actualizado exitosamente!", "success")
						.catch(swal.noop)
						.then(() => {
							modal.hide();
							this.formUpdateEmpaque.reset();
							this.getEmpaquesRender();
							this.empaque = new Empaque();
						});
				} else {
					Utils.showMsgInfo("Ha ocurrido un error inesperado al actualizar el empaque!", this.tituloPantalla);
				}
			},
			error => {
				this.peticionEnCurso = false;
			},
			() => {
				this.peticionEnCurso = false;
			}
		);
	}

	getValuesFormUpdateEmpaque() {
		this.empaque.NombEmpaque = this.formUpdateEmpaque.value.nombreEmpaque;
		this.empaque.DescEmpaque = this.formUpdateEmpaque.value.descripcionEmpaque;
	}

	deleteEmpaque(idEmpaque) {
		swal({
			title: "Estas seguro(a)?",
			text: "El empaque sera inhabilitado!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si!",
			cancelButtonText: "Cancelar"
		}).then(result => {
			if (result.value) {
				this.empaqueService.deleteEmpaque(idEmpaque).subscribe(
					response => {
						if (response.success) {
							swal("Inhabilitado!", "El empaque ha sido inhabilitado exitosamente", "success").then(() => {
								this.getEmpaquesRender();
							});
						} else {
							Utils.showMsgInfo("Ha ocurrido un error inesperado al inhabilitar el empaque!", this.tituloPantalla);
						}
					}
				);
			}
		});
	}

	showModalUpdate(modal, empaque: Empaque) {
		this.empaque.IdEmpaque = empaque.IdEmpaque;
		this.empaque.NombEmpaque = empaque.NombEmpaque;
		this.empaque.DescEmpaque = empaque.DescEmpaque;

		this.formUpdateEmpaque.reset();
		this.formUpdateEmpaque.setValue({
			nombreEmpaque: empaque.NombEmpaque,
			descripcionEmpaque: empaque.DescEmpaque
		});

		modal.show();
	}

	resultadoConsultaAddEmpaque(event) {
		if (event) {
			this.getEmpaquesRender();
		}
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}
}
