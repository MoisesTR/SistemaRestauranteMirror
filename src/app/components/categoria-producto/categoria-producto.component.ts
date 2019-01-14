import { Component, OnInit, ViewChild } from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from "@angular/forms";
import { Subject } from "rxjs/Subject";

import { CategoriaProductoService } from "@app/core/service.index";
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
	styleUrls: ["./categoria-producto.component.css"]
})
export class CategoriaProductoComponent implements OnInit {
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
	private peticionEnCurso = false;

	constructor(
		private categoriaService: CategoriaProductoService,
		private formBuilder: FormBuilder
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
		});
	}

	getCategorias() {
		this.categoriaService.getCategoriasProductos().subscribe(
			response => {
				if (response.categorias) {
					this.categoriasProductos = response.categorias;
					this.dtTrigger.next();
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	getCategoriasRender() {
		this.categoriaService.getCategoriasProductos().subscribe(
			response => {
				if (response.categorias) {
					this.categoriasProductos = response.categorias;
					this.rerender();
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
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
		this.categoriaProducto.NombreCategoria = this.formUpdateCategoria.value.nombreCategoria;
		this.categoriaProducto.DescripcionCategoria = this.formUpdateCategoria.value.descripcionCategoria;
	}

	updateCategoria(modal) {
		this.peticionEnCurso = true;
		this.getValuesFormUpdateCategoria();

		this.categoriaService
			.updateCategoriaProducto(this.categoriaProducto)
			.subscribe(
				response => {
					if (response.success) {
						swal(
							"Categoría",
							"La categoría ha sido actualizada exitosamente!",
							"success"
						).then(() => {
							modal.hide();
							this.formUpdateCategoria.reset();
							this.categoriaProducto = new CategoriaProducto();
							this.getCategoriasRender();
						});
					} else {
						Utils.showMsgError(
							"Ha ocurrido un error inesperado en la actualización , intenta nuevamente"
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

	showModalUpdate(modal, categoria: CategoriaProducto) {
		this.categoriaProducto.IdCategoria = categoria.IdCategoria;
		this.categoriaProducto.NombreCategoria = categoria.NombreCategoria;
		this.categoriaProducto.DescripcionCategoria =
			categoria.DescripcionCategoria;

		this.formUpdateCategoria.reset();
		this.formUpdateCategoria.setValue({
			nombreCategoria: categoria.NombreCategoria,
			descripcionCategoria: categoria.DescripcionCategoria
		});

		modal.show();
	}

	deleteCategoria(idCategoria) {
		swal({
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
				this.categoriaService.deleteCategoriaProducto(idCategoria).subscribe(
					response => {
						if (response.success) {
							swal(
								"Inhabilitada!",
								"La categoría ha sido inhabilitada exitosamente",
								"success"
							).then(() => {
								this.getCategoriasRender();
							});
						} else {
							Utils.showMsgInfo(
								"Ha ocurrido un error al inhabilitar",
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

	resultadoConsultaAddCategoria(event) {
		if (event) {
			this.getCategoriasRender();
		}
	}
}
