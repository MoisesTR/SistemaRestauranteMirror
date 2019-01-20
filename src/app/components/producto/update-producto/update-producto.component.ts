import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Proveedor } from "@app/models/Proveedor";
import { Producto } from "@app/models/Producto";
import { CategoriaProducto } from "@app/models/CategoriaProducto";
import { Envase } from "@app/models/Envase";
import { UnidadMedida } from "@app/models/UnidadMedida";
import { ClasificacionProducto } from "@app/models/ClasificacionProducto";
import { SubClasificacionProducto } from "@app/models/SubClasificacionProducto";
import { ActivatedRoute, Params, Router } from "@angular/router";
import {
	CategoriaProductoService,
	ClasificacionProductoService,
	DeleteImageService,
	EmpaqueService,
	EnvaseService,
	ProductoProveedorService,
	ProductoService,
	ProveedorService,
	SubClasificacionProductoService,
	UnidadMedidaService,
	UploadService
} from "@app/core/service.index";
import { CARPETA_PRODUCTOS, Global } from "@app/core/services/shared/global";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { Utils } from "../../Utils";
import { ProductoProveedor } from "@app/models/ProductoProveedor";
import { Empaque } from "@app/models/Empaque";

declare var $: any;
@Component({
	selector: "app-update-producto",
	templateUrl: "./update-producto.component.html",
	styleUrls: ["./update-producto.component.css"]
	//changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateProductoComponent implements OnInit {
	public producto: Producto;
	formUpdateProducto: FormGroup;
	public proveedores: Proveedor[];
	public proveedoresProducto: Proveedor[];
	public idProveedor: number;
	public categorias: CategoriaProducto[];
	public envases: Envase[];
	public unidades: UnidadMedida[];
	public empaques: Empaque[];
	public clasificaciones: ClasificacionProducto[];
	public subclasificaciones: SubClasificacionProducto[];
	public url: string;
	public removioImagen = false;
	public filesToUpload: Array<File> = null;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _uploadService: UploadService,
		private _proveedorService: ProveedorService,
		private _categoriaService: CategoriaProductoService,
		private _clasificacionService: ClasificacionProductoService,
		private _subclasificacionService: SubClasificacionProductoService,
		private _empaqueService: EmpaqueService,
		private _envaseService: EnvaseService,
		private _unidadService: UnidadMedidaService,
		private _productoService: ProductoService,
		private _productoProveedorService: ProductoProveedorService,
		private _deleteImageService: DeleteImageService,
		private formBuilderUProducto: FormBuilder,
		private cdr: ChangeDetectorRef
	) {
		this.url = Global.url;
		this.producto = new Producto();
		this._route.params.subscribe(params => console.log(params));
	}

	ngOnInit() {
		$(document).ready(() => {
			$(".dropify").dropify();
		});

		this.initFormUpdateProducto();
		this.getProducto();
		this.getProveedores();
		this.getCategorias();
		this.getClasificaciones();
		this.getSubClasificaciones();
		this.getEmpaques();
		this.getEnvases();
		this.getUnidadesDeMedida();
	}

	private initFormUpdateProducto() {
		this.formUpdateProducto = this.formBuilderUProducto.group({
			nombreProducto: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			descripcionProducto: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(300),
				CustomValidators.nospaceValidator
			]),
			proveedor: new FormControl("", [Validators.required]),
			categoria: new FormControl("", [Validators.required]),
			clasificacion: new FormControl("", [Validators.required]),
			subclasificacion: new FormControl("", [Validators.required]),
			empaque: new FormControl("", []),
			envase: new FormControl("", []),
			unidadmedida: new FormControl("", [Validators.required]),
			cantidadEmpaque: new FormControl("", []),

			valorUnidadMedida: new FormControl("", [Validators.required]),
			diasCaducidad: new FormControl("", [Validators.required]),
			diasDeUso: new FormControl("", [Validators.required])
		});
	}

	onChangeClasificacion(event) {
		if (event === null) {
			this.producto.IdClasificacion = null;
		} else {
			this.producto.IdClasificacion = event.IdClasificacion;

			this._subclasificacionService.getSubClasificacionesByIdClasificacion(event.IdClasificacion).subscribe(
				response => {
					if (response.subclasificaciones) {
						this.subclasificaciones = response.subclasificaciones;
					}
				},
				error => {
					Utils.showMsgError(Utils.msgError(error), "Producto");
				}
			);
		}
	}

	onChangeSubclasificacion(event) {
		if (event === null || event === undefined) {
			this.producto.IdSubClasificacion = null;
		} else {
			this.producto.IdSubClasificacion = event.IdSubClasificacion;
		}
	}

	onChangeUnidadMedida(event) {
		if (event === null) {
			this.producto.IdUnidadMedida = null;
		} else {
			this.producto.IdUnidadMedida = event.IdUnidadMedida;
		}
	}

	onChangeEnvase(event: ProductoProveedor) {
		if (event === null) {
			this.producto.IdEnvase = null;
		} else {
			this.producto.IdEnvase = event.IdEnvase;
		}
	}

	onChangeEmpaque(event) {
		if (event === null) {
			this.producto.IdEmpaque = null;
		} else {
			this.producto.IdEmpaque = event.IdEmpaque;
		}
	}

	onChangeCategoria(event) {
		if (event === null) {
			this.producto.IdCategoria = null;
		} else {
			this.producto.IdCategoria = event.IdCategoria;
		}
	}

	inicializarValoresFormularioProducto() {
		this.formUpdateProducto.controls["nombreProducto"].setValue(this.producto.NombreProducto);
		this.formUpdateProducto.controls["descripcionProducto"].setValue(this.producto.Descripcion);
		this.formUpdateProducto.controls["diasCaducidad"].setValue(this.producto.DiasCaducidad);
		this.formUpdateProducto.controls["valorUnidadMedida"].setValue(this.producto.ValorUnidadMedida);
		this.formUpdateProducto.controls["cantidadEmpaque"].setValue(this.producto.CantidadEmpaque);
		this.proveedoresProducto = this.producto.Proveedores;
	}

	getProducto() {
		this._route.params.subscribe((params: Params) => {
			const id = params["id"];
			//this.producto.IdProducto = id;

			this._productoService.getProducto(id).subscribe(
				response => {
					if (response.producto) {
						this.producto = response.producto;
						// Inicializar componentes de la vista
						$(document).ready(() => {
							const imagenProducto = this.url + "getImagen/" + CARPETA_PRODUCTOS + "/" + this.producto.Imagen;
							let drEvent;

							if (this.producto.Imagen.length > 0) {
								drEvent = $(".dropify").dropify({
									defaultFile: imagenProducto
								});

								this.filesToUpload = null;
							} else {
								drEvent = $(".dropify").dropify();
							}

							drEvent.on("dropify.afterClear", (event, element) => {
								this.removioImagen = true;
								this.filesToUpload = null;
							});
						});
						this.inicializarValoresFormularioProducto();
					} else {
						this._router.navigate(["/producto/list"]);
					}
				},
				error => {
					console.log("Error desde la api");
				}
			);
		});
	}

	getSubClasificaciones() {
		this._subclasificacionService.getSubClasificaciones().subscribe(
			response => {
				if (response.subclasificaciones) {
					this.subclasificaciones = response.subclasificaciones;
				} else {
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error));
			}
		);
	}

	cargarImagen() {
		// si es nulo significa que dejo la misma imagen que traia o en dado caso tambien imagen que no traia
		if ((this.filesToUpload === null && !this.removioImagen) || (this.producto.Imagen === "" && this.removioImagen)) {
			this.actualizarProducto();
		} else if (this.filesToUpload === null && this.removioImagen && this.producto.Imagen !== "") {
			this._deleteImageService.deleteImage(CARPETA_PRODUCTOS, this.producto.Imagen).subscribe(
				response => {
					if (response.success) {
						this.producto.Imagen = "";
						this.actualizarProducto();
					}
				},
				error => {
					Utils.msgErrorImage(error, "Producto");
				}
			);
		} else {
			this._uploadService
				.makeFileRequest(
					this.url + "uploadImage",
					CARPETA_PRODUCTOS,
					this.producto.Imagen,
					this.removioImagen,
					[],
					this.filesToUpload,
					"token",
					"image"
				)
				.then(
					(result: any) => {
						this.producto.Imagen = result.image;
						this.actualizarProducto();
					},
					error => {
						Utils.msgErrorImage(error, "Producto");
					}
				);
		}
	}

	getValuesFormUpdate() {
		this.producto.NombreProducto = this.formUpdateProducto.value.nombreProducto;
		this.producto.Descripcion = this.formUpdateProducto.value.descripcionProducto;
		this.producto.IdEstado = 1;
		this.producto.CantidadEmpaque = this.formUpdateProducto.value.cantidadEmpaque;
		this.producto.ValorUnidadMedida = this.formUpdateProducto.value.valorUnidadMedida;
		this.producto.DiasCaducidad = this.formUpdateProducto.value.diasCaducidad;
	}

	actualizarProducto() {
		this.getValuesFormUpdate();
		this._productoService.updateProducto(this.producto).subscribe(
			response => {
				if (response.success) {
					this.actualizarProductoProveedor();
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), "Producto");
			}
		);
	}

	actualizarProductoProveedor() {}

	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		this.removioImagen = false;
	}

	getProveedores() {
		this._proveedorService.getProveedores(null).subscribe(
			response => {
				if (response.proveedores) {
					this.proveedores = response.proveedores;
					this.proveedores.forEach((value, index) => {
						this.proveedores[index].disabled = 0;
					});
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error));
			}
		);
	}

	getClasificaciones() {
		this._clasificacionService.getClasificaciones().subscribe(
			response => {
				if (response.clasificaciones) {
					this.clasificaciones = response.clasificaciones;
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error));
			}
		);
	}

	getCategorias() {
		this._categoriaService.getCategoriasProductos().subscribe(
			response => {
				if (response.categorias) {
					this.categorias = response.categorias;
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error));
			}
		);
	}

	getEmpaques() {
		this._empaqueService.getEmpaques().subscribe(
			response => {
				if (response.empaques) {
					this.empaques = response.empaques;
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error));
			}
		);
	}

	getEnvases() {
		this._envaseService.getEnvases().subscribe(
			response => {
				if (response.envases) {
					this.envases = response.envases;
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error));
			}
		);
	}

	getUnidadesDeMedida() {
		this._unidadService.getUnidadesMedida().subscribe(
			response => {
				if (response.unidadesmedida) {
					this.unidades = response.unidadesmedida;
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error));
			}
		);
	}
}
