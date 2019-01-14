import { Component, OnInit, ViewChild } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from "@angular/forms";
import { Subject } from "rxjs/Subject";

import {
	ClasificacionProductoService,
	SubClasificacionProductoService
} from "@app/core/service.index";
import { ClasificacionProducto } from "@app/models/ClasificacionProducto";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { DataTableDirective } from "angular-datatables";
import { ModalDirective } from "ng-uikit-pro-standard";
import { SubClasificacionProducto } from "@app/models/SubClasificacionProducto";
import { Utils } from "../Utils";
import { idioma_espanol } from "@app/core/services/shared/global";
import swal from "sweetalert2";

@Component({
	selector: "app-sub-clasificacion-producto",
	templateUrl: "./sub-clasificacion-producto.component.html",
	styleUrls: ["./sub-clasificacion-producto.component.css"]
})
export class SubClasificacionProductoComponent implements OnInit {
	@ViewChild("modalAddSubclasificacion")
	modalAddSubclasificacion: ModalDirective;

	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

	public subclasificacion: SubClasificacionProducto;
	public subclasificaciones: SubClasificacionProducto[];
	public clasificaciones: ClasificacionProducto;
	formUpdateSubClasificacion: FormGroup;

	public tituloPantalla = "Subclasificación";
	peticionEnCurso = false;

	constructor(
		private subclasificacionService: SubClasificacionProductoService,
		private clasificacionService: ClasificacionProductoService,
		private formBuilderSubClasificacion: FormBuilder
	) {
		this.subclasificacion = new SubClasificacionProducto();
		this.initCustomValidatorsFormSubClasificacion();
	}

	private initCustomValidatorsFormSubClasificacion() {
		this.formUpdateSubClasificacion = this.formBuilderSubClasificacion.group({
			nombreSubClasificacion: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			descripcionSubClasificacion: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(300),
				CustomValidators.nospaceValidator
			]),
			clasificacion: new FormControl("", [Validators.required])
		});
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
						this.subclasificacionService.mostrarModal();
					}
				}
			]
		};
	}

	ngOnInit() {
		this.settingsDatatable();
		this.getSubClasificaciones();
		this.getClasificaciones();
	}

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.destroy();
			this.dtTrigger.next();
		});
	}

	getSubClasificaciones() {
		this.subclasificacionService.getSubClasificaciones().subscribe(
			response => {
				if (response.subclasificaciones) {
					this.subclasificaciones = response.subclasificaciones;
					this.dtTrigger.next();
				} else {
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	getSubClasificacionesRender() {
		this.subclasificacionService.getSubClasificaciones().subscribe(
			response => {
				if (response.subclasificaciones) {
					this.subclasificaciones = response.subclasificaciones;
					this.rerender();
				} else {
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	updateSubClasificacion(modal) {
		this.peticionEnCurso = true;
		this.capturarDatosActualizados();
		this.subclasificacionService
			.updateSubClasificacionProducto(this.subclasificacion)
			.subscribe(
				response => {
					if (response.success) {
						swal(
							"Subclasificación",
							"La Subclasificación ha sido actualizado exitosamente!",
							"success"
						)
							.catch(swal.noop)
							.then(() => {
								modal.hide();
								this.formUpdateSubClasificacion.reset();
								this.getSubClasificacionesRender();
								this.subclasificacion = new SubClasificacionProducto();
							});
					} else {
						Utils.showMsgError(
							"Ha ocurrido un error inesperado al actualizar la subclasificacion!",
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

	capturarDatosActualizados() {
		this.subclasificacion.NombreSubClasificacion = this.formUpdateSubClasificacion.value.nombreSubClasificacion;
		this.subclasificacion.DescripcionSubClasificacion = this.formUpdateSubClasificacion.value.descripcionSubClasificacion;
	}

	deleteSubClasificacion(idSubclasificacion) {
		swal({
			title: "Estas seguro(a)?",
			text: "La Subclasificación sera inhabilitada!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si!",
			cancelButtonText: "Cancelar"
		}).then(result => {
			if (result.value) {
				this.subclasificacionService
					.deleteSubclasificacion(idSubclasificacion)
					.subscribe(
						response => {
							if (response.success) {
								swal(
									this.tituloPantalla,
									"La Subclasificación ha sido inhabilatada exitosamente",
									"success"
								).then(() => {
									this.getSubClasificacionesRender();
								});
							} else {
								Utils.showMsgInfo(
									"Ha ocurrido un error inesperado al inhabilitar la subclasificacion!",
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

	getClasificaciones() {
		this.clasificacionService.getClasificaciones().subscribe(
			response => {
				if (response.clasificaciones) {
					this.clasificaciones = response.clasificaciones;
				} else {
					Utils.showMsgInfo(
						"Ha ocurrido un error inesperado al obtener las clasificaciones",
						this.tituloPantalla
					);
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	 showModalUpdateSubclasificacion(modal, Subclasificacion: SubClasificacionProducto) {
		this.subclasificacion.IdSubClasificacion =
			Subclasificacion.IdSubClasificacion;
		this.subclasificacion.NombreSubClasificacion =
			Subclasificacion.NombreSubClasificacion;
		this.subclasificacion.DescripcionSubClasificacion =
			Subclasificacion.DescripcionSubClasificacion;
		this.subclasificacion.IdClasificacion = Subclasificacion.IdClasificacion;

		this.formUpdateSubClasificacion.reset();
		this.formUpdateSubClasificacion.setValue({
			nombreSubClasificacion: Subclasificacion.NombreSubClasificacion,
			descripcionSubClasificacion: Subclasificacion.DescripcionSubClasificacion,
			clasificacion: Subclasificacion.IdClasificacion
		});

		modal.show();
	}

	onChangeClasificacion(event) {
		if (event === null) {
			this.subclasificacion.IdClasificacion = null;
		} else {
			this.subclasificacion.IdClasificacion = event.IdClasificacion;
		}
	}

	resultadoConsultaAddSubclasificacion(event) {
		if (event) {
			this.getSubClasificacionesRender();
		}
	}
}
