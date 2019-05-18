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
import { ProductoProveedor } from "@app/models/ProductoProveedor";
import { Empaque } from "@app/models/Empaque";
import { ProductoFactory } from "@app/models/factory/ProductoFactory";
import { TipoProductoEnum } from "@app/Enums/TipoProductoEnum";

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
	public IdTipoInsumo;
	Insumo = [{ Id: 1, TipoInsumo: "Alimento" }, { Id: 2, TipoInsumo: "Limpieza" }, { Id: 3, TipoInsumo: "Utensilios" }];

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
		this.producto = ProductoFactory.createProducto(TipoProductoEnum.Alimento);
	}

	ngOnInit() {
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

	showCardImg() {
		const x = document.getElementById("imagen-productos");
		const f = document.getElementById("formulario-productos");
		const proveedor = document.getElementById("proveedor");
		const categoria = document.getElementById("selectCategoria");
		const clasificacion = document.getElementById("upclasificacion");
		const subclasificacion = document.getElementById("upsubclasificacion");
		const empaque = document.getElementById("empaque");
		const envase = document.getElementById("envase");
		const unidadmedida = document.getElementById("unidadmedida");

		if (x.style.display === "none") {
			// Mostrar card de agregar imagen
			// Pequeño

			// Funcion que permite que la animación del card funcione las n veces que sea presionado el botón
			$(" #btn-animation").click(function() {
				$("#imagen-productos").toggleClass("animated");
			});
			f.classList.remove("col-lg-12");
			f.classList.add("col-lg-8");
			proveedor.classList.add("select-no-margin");
			categoria.classList.add("select-no-margin");
			clasificacion.classList.add("select-no-margin");
			subclasificacion.classList.add("select-no-margin");
			empaque.classList.add("select-no-margin");
			envase.classList.add("select-no-margin");
			unidadmedida.classList.add("select-no-margin");
			x.style.display = "block";
		} else {
			// Ocultar card de agregar imagen

			// Funcion que permite que la animación del card funcione las n veces que sea presionado el botón
			$("#btn-animation").click(function() {
				$("#imagen-productos").toggleClass("animated");
			});
			f.classList.remove("col-lg-8");
			f.classList.add("col-lg-12");
			proveedor.classList.remove("select-no-margin");
			categoria.classList.remove("select-no-margin");
			clasificacion.classList.remove("select-no-margin");
			subclasificacion.classList.remove("select-no-margin");
			empaque.classList.remove("select-no-margin");
			envase.classList.remove("select-no-margin");
			unidadmedida.classList.remove("select-no-margin");
			x.style.display = "none";
		}
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
			diasRotacion: new FormControl("", [Validators.required]),
			tipoInsumo: new FormControl("", [Validators.required])
		});
	}

	onChangeClasificacion(event) {
		if (event) {
			this.producto.IdClasificacion = event.IdClasificacion;

			this._subclasificacionService.getSubClasificacionesByIdClasificacion(event.IdClasificacion).subscribe(response => {
				if (response.subclasificaciones) {
					this.subclasificaciones = response.subclasificaciones;
				}
			});
		} else {
			this.producto.IdClasificacion = null;
		}
	}

	onChangeSubclasificacion(event) {
		if (event) {
			this.producto.IdSubClasificacion = event.IdSubClasificacion;
		} else {
			this.producto.IdSubClasificacion = null;
		}
	}

	onChangeUnidadMedida(event) {
		if (event) {
			this.producto.IdUnidadMedida = event.IdUnidadMedida;
		} else {
			this.producto.IdUnidadMedida = null;
		}
	}

	onChangeEnvase(event: ProductoProveedor) {
		if (event) {
			this.producto.IdEnvase = event.IdEnvase;
		} else {
			this.producto.IdEnvase = null;
		}
	}

	onChangeEmpaque(event) {
		if (event) {
			this.producto.IdEmpaque = event.IdEmpaque;
		} else {
			this.producto.IdEmpaque = null;
		}
	}

	onChangeCategoria(event) {
		if (event) {
			this.producto.IdCategoria = event.IdCategoria;
		} else {
			this.producto.IdCategoria = null;
		}
	}

	inicializarValoresFormularioProducto() {
		this.formUpdateProducto.controls["nombreProducto"].setValue(this.producto.NombProducto);
		this.formUpdateProducto.controls["descripcionProducto"].setValue(this.producto.DescProducto);
		this.formUpdateProducto.controls["diasRotacion"].setValue(this.producto.DiasRotacion);
		this.formUpdateProducto.controls["valorUnidadMedida"].setValue(this.producto.ValorUnidadMedida);
		this.formUpdateProducto.controls["cantidadEmpaque"].setValue(this.producto.CantidadEmpaque);
		this.IdTipoInsumo = this.producto.IdTipInsumo;
		this.proveedoresProducto = this.producto.Proveedores;
	}

	getProducto() {
		this._route.params.subscribe((params: Params) => {
			const id = params["id"];
			//this.producto.IdProducto = id;

			this._productoService.getProducto(id).subscribe(response => {
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
			});
		});
	}

	getSubClasificaciones() {
		this._subclasificacionService.getSubClasificaciones().subscribe(response => {
			if (response.subclasificaciones) {
				this.subclasificaciones = response.subclasificaciones;
			}
		});
	}

	// cargarImagen() {
	// 	// si es nulo significa que dejo la misma imagen que traia o en dado caso tambien imagen que no traia
	// 	if ((this.filesToUpload === null && !this.removioImagen) || (this.producto.Imagen === "" && this.removioImagen)) {
	// 		this.actualizarProducto();
	// 	} else if (this.filesToUpload === null && this.removioImagen && this.producto.Imagen !== "") {
	// 		this._deleteImageService.deleteImage(CARPETA_PRODUCTOS, this.producto.Imagen).subscribe(response => {
	// 			if (response.success) {
	// 				this.producto.Imagen = "";
	// 				this.actualizarProducto();
	// 			}
	// 		});
	// 	} else {
	// 		this._uploadService
	// 			.makeFileRequest(
	// 				this.url + "uploadImage",
	// 				CARPETA_PRODUCTOS,
	// 				this.producto.Imagen,
	// 				this.removioImagen,
	// 				[],
	// 				this.filesToUpload,
	// 				"token",
	// 				"image"
	// 			)
	// 			.then((result: any) => {
	// 				this.producto.Imagen = result.image;
	// 				this.actualizarProducto();
	// 			});
	// 	}
	// }

	getValuesFormUpdate() {
		this.producto.NombProducto = this.formUpdateProducto.value.nombreProducto;
		this.producto.DescProducto = this.formUpdateProducto.value.descripcionProducto;
		this.producto.IdEstado = 1;
		this.producto.CantidadEmpaque = this.formUpdateProducto.value.cantidadEmpaque;
		this.producto.ValorUnidadMedida = this.formUpdateProducto.value.valorUnidadMedida;
		this.producto.DiasRotacion = this.formUpdateProducto.value.diasRotacion;
	}

	actualizarProducto() {
		this.getValuesFormUpdate();
		this._productoService.updateProducto(this.producto).subscribe(response => {
			if (response.success) {
				this.actualizarProductoProveedor();
			}
		});
	}

	actualizarProductoProveedor() {}

	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		this.removioImagen = false;
	}

	getProveedores() {
		this._proveedorService.getProveedores(1).subscribe(response => {
			if (response.proveedores) {
				this.proveedores = response.proveedores;
				this.proveedores.forEach((value, index) => {
					this.proveedores[index].disabled = 0;
				});
			}
		});
	}

	getClasificaciones() {
		this._clasificacionService.getClasificaciones().subscribe(response => {
			if (response.clasificaciones) {
				this.clasificaciones = response.clasificaciones;
			}
		});
	}

	getCategorias() {
		this._categoriaService.getCategoriasProductos().subscribe(response => {
			if (response.categorias) {
				this.categorias = response.categorias;
			}
		});
	}

	getEmpaques() {
		this._empaqueService.getEmpaques().subscribe(response => {
			if (response.empaques) {
				this.empaques = response.empaques;
			}
		});
	}

	getEnvases() {
		this._envaseService.getEnvases().subscribe(response => {
			if (response.envases) {
				this.envases = response.envases;
			}
		});
	}

	getUnidadesDeMedida() {
		this._unidadService.getUnidadesMedida().subscribe(response => {
			if (response.unidadesmedida) {
				this.unidades = response.unidadesmedida;
			}
		});
	}
}
