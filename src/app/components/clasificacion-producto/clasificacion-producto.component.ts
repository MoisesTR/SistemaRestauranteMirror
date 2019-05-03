import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { CategoriaProductoService, ClasificacionProductoService, SpinnerService } from "@app/core/service.index";
import { ClasificacionProducto } from "@app/models/ClasificacionProducto";
import { CategoriaProducto } from "@app/models/CategoriaProducto";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { DataTableDirective } from "angular-datatables";
import { ModalDirective } from "ng-uikit-pro-standard";
import { idioma_espanol } from "@app/core/services/shared/global";
import swal from "sweetalert2";
import { Utils } from "../Utils";

@Component({
	selector: "app-clasificacion-producto",
	templateUrl: "./clasificacion-producto.component.html",
	styleUrls: ["./clasificacion-producto.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClasificacionProductoComponent implements OnInit, OnDestroy {
	public clasificacion: ClasificacionProducto;
	public clasificaciones: ClasificacionProducto[];

	public formUpdateClasificacion: FormGroup;
	public categorias: CategoriaProducto[];

	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

	@ViewChild("modalAddClasificacion")
	modalAddClasificacion: ModalDirective;

	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;

	public tituloPantalla = "Clasificación";

	constructor(
		private clasificacionService: ClasificacionProductoService,
		private categoriaService: CategoriaProductoService,
		private spinner: SpinnerService,
		private formBuilderClasificacion: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.clasificacion = new ClasificacionProducto();
	}

	ngOnInit() {
		this.settingsDatatable();
		this.getClasificaciones();
		this.initFormUpdateClasificacion();
		this.getCategorias();
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
						this.clasificacionService.mostrarModal();
					}
				}
			]
		};
	}

	getClasificaciones() {
		this.spinner.display(true);
		this.clasificacionService.getClasificaciones().subscribe(response => {
			if (response.clasificaciones) {
				this.clasificaciones = response.clasificaciones;
				this.dtTrigger.next();
				this.cdr.markForCheck();
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

	getClasificacionesRender() {
		this.clasificacionService.getClasificaciones().subscribe(response => {
			if (response.clasificaciones) {
				this.clasificaciones = response.clasificaciones;
				this.rerender();
			}
		});
	}

	initFormUpdateClasificacion() {
		this.formUpdateClasificacion = this.formBuilderClasificacion.group({
			nombreClasificacion: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			descripcionClasificacion: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(300),
				CustomValidators.nospaceValidator
			]),
			categoria: new FormControl("", [Validators.required])
		});
	}

	updateClasificacion(modal) {
		this.getValuesFormUpdateClasificacion();

		this.clasificacionService.updateClasificacionProducto(this.clasificacion).subscribe(response => {
			if (response.success) {
				swal.fire("Clasificación", "La clasificación ha sido actualizada exitosamente!", "success").then(() => {
					modal.hide();
					this.formUpdateClasificacion.reset();
					this.getClasificacionesRender();
					this.clasificacion = new ClasificacionProducto();
				});
			}
		});
	}

	getCategorias() {
		this.categoriaService.getCategoriasProductos().subscribe(response => {
			if (response.categorias) {
				this.categorias = response.categorias;
				this.cdr.markForCheck();
			}
		});
	}

	getValuesFormUpdateClasificacion() {
		this.clasificacion.NombClasificacion = this.formUpdateClasificacion.value.nombreClasificacion;
		this.clasificacion.DescClasificacion = this.formUpdateClasificacion.value.descripcionClasificacion;
	}

	deleteClasificacion(idClasificacion) {
		swal.fire({
			title: "Estas seguro(a)?",
			text: "La clasificacion sera inhabilitada!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si!",
			cancelButtonText: "Cancelar"
		}).then(result => {
			if (result.value) {
				this.clasificacionService.deleteClasificacionProducto(idClasificacion).subscribe(response => {
					if (response.success) {
						swal.fire("Inhabilitada!", "La clasificacion ha sido inhabilitada exitosamente", "success").then(() => {
							this.getClasificacionesRender();
						});
					} else {
						Utils.showMsgInfo("Ha ocurrido un error al inhabilitar!", this.tituloPantalla);
					}
				});
			}
		});
	}

	onChangeCategoria(event) {
		if (event === null) {
			this.clasificacion.IdCategoria = null;
		} else {
			this.clasificacion.IdCategoria = event.IdCategoria;
		}
	}

	showModalUpdate(modal, clasificacion: ClasificacionProducto) {
		this.formUpdateClasificacion.reset();

		this.clasificacion.IdClasificacion = clasificacion.IdClasificacion;
		this.clasificacion.IdCategoria = clasificacion.IdCategoria;
		this.clasificacion.NombClasificacion = clasificacion.NombClasificacion;
		this.clasificacion.DescClasificacion = clasificacion.DescClasificacion;
		this.formUpdateClasificacion.controls["nombreClasificacion"].setValue(clasificacion.NombClasificacion);
		this.formUpdateClasificacion.controls["descripcionClasificacion"].setValue(clasificacion.DescClasificacion);
		this.formUpdateClasificacion.controls["categoria"].setValue(clasificacion.IdCategoria);

		modal.show();
	}

	resultadoConsultaClasificacion(event) {
		if (event) {
			this.getClasificacionesRender();
		}
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}
}
