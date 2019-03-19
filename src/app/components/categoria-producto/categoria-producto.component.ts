import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { CategoriaProductoService, SpinnerService } from "@app/core/service.index";
import { CategoriaProducto } from "@app/models/CategoriaProducto";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { DataTableDirective } from "angular-datatables";
import { ModalDirective } from "ng-uikit-pro-standard";
import { idioma_espanol } from "@app/core/services/shared/global";
import swal from "sweetalert2";
import { Utils } from "../Utils";

@Component({
	selector: "app-categoria-producto",
	templateUrl: "./categoria-producto.component.html",
	styleUrls: ["./categoria-producto.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriaProductoComponent implements OnInit, OnDestroy {
	@ViewChild("autoShownModal")
	autoShownModal: ModalDirective;

	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

	public categoriaProducto: CategoriaProducto;
	public categoriasProductos: CategoriaProducto[];
	public formUpdateCategoria: FormGroup;
	public tituloPantalla = "Categoria";
	peticionEnCurso = false;

	constructor(
		private categoriaService: CategoriaProductoService,
		private spinnerService: SpinnerService,
		private formBuilder: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.categoriaProducto = new CategoriaProducto();
	}

	ngOnInit() {
		this.settingsDatatable();
		this.getCategorias();
		this.initFormUpdateCategoria();
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
						this.categoriaService.mostrarModal();
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

	getCategorias() {
		this.spinnerService.display(true);
		this.categoriaService.getCategoriasProductos().subscribe(response => {
			if (response.categorias) {
				this.categoriasProductos = response.categorias;
				this.dtTrigger.next();
				this.cdr.markForCheck();
			}
		});
	}

	getCategoriasRender() {
		this.categoriaService.getCategoriasProductos().subscribe(response => {
			if (response.categorias) {
				this.categoriasProductos = response.categorias;
				this.rerender();
			}
		});
	}

	initFormUpdateCategoria() {
		this.formUpdateCategoria = this.formBuilder.group({
			nombreCategoria: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			descripcionCategoria: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(300),
				CustomValidators.nospaceValidator
			])
		});
	}

	getValuesFormUpdateCategoria() {
		this.categoriaProducto.NombCategoria = this.formUpdateCategoria.value.nombreCategoria;
		this.categoriaProducto.DescCategoria = this.formUpdateCategoria.value.descripcionCategoria;
		this.categoriaProducto.IdTipInsumo = 1;
	}

	updateCategoria(modal) {
		this.peticionEnCurso = true;
		this.getValuesFormUpdateCategoria();

		this.categoriaService.updateCategoriaProducto(this.categoriaProducto).subscribe(
			response => {
				if (response.success) {
					swal.fire("Categoría", "La categoría ha sido actualizada exitosamente!", "success").then(() => {
						modal.hide();
						this.formUpdateCategoria.reset();
						this.categoriaProducto = new CategoriaProducto();
						this.getCategoriasRender();
					});
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

	showModalUpdate(modal, categoria: CategoriaProducto) {
		this.categoriaProducto.IdCategoria = categoria.IdCategoria;
		this.categoriaProducto.NombCategoria = categoria.NombCategoria;
		this.categoriaProducto.DescCategoria = categoria.DescCategoria;
		this.formUpdateCategoria.reset();
		this.formUpdateCategoria.setValue({
			nombreCategoria: categoria.NombCategoria,
			descripcionCategoria: categoria.DescCategoria
		});

		modal.show();
	}

	deleteCategoria(idCategoria) {
		swal.fire({
			title: "Estas seguro(a)?",
			text: "La categoria sera inhabilitada!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si!",
			cancelButtonText: "Cancelar"
		}).then(result => {
			if (result.value) {
				this.categoriaService.deleteCategoriaProducto(idCategoria).subscribe(response => {
					if (response.success) {
						swal.fire("Inhabilitada!", "La categoría ha sido inhabilitada exitosamente", "success").then(() => {
							this.getCategoriasRender();
						});
					}
				});
			}
		});
	}

	resultadoConsultaAddCategoria(event) {
		if (event) {
			this.getCategoriasRender();
		}
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}
}
