import { Component, OnInit } from "@angular/core";
import { Producto } from "@app/models/Producto";
import { Proveedor } from "@app/models/Proveedor";
import { CategoriaProducto } from "@app/models/CategoriaProducto";
import { ClasificacionProducto } from "@app/models/ClasificacionProducto";
import { Envase } from "@app/models/Envase";
import { Empaque } from "@app/models/Empaque";
import { ProductoProveedor } from "@app/models/ProductoProveedor";
import { SubClasificacionProducto } from "@app/models/SubClasificacionProducto";
import { CARPETA_PRODUCTOS, Global } from "@app/core/services/shared/global";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
	CategoriaProductoService,
	ClasificacionProductoService,
	EmpaqueService,
	EnvaseService,
	PreviousRouteService,
	ProductoProveedorService,
	ProductoService,
	ProveedorService,
	SubClasificacionProductoService,
	TipoInsumoService,
	UploadService
} from "@app/core/service.index";
import swal from "sweetalert2";
import { Utils } from "@app/components/Utils";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { TipoInsumo } from "@app/models/interface/TipoInsumo";

declare var $: any;

@Component({
	selector: "app-consumo-interno",
	templateUrl: "./consumo-interno.component.html",
	styleUrls: ["./consumo-interno.component.scss"]
})
export class ConsumoInternoComponent implements OnInit {
	public producto: Producto;
	public productoProveedor: ProductoProveedor;
	public proveedores: Proveedor[];
	public categorias: CategoriaProducto[];
	public clasificaciones: ClasificacionProducto[];
	public subclasificaciones: SubClasificacionProducto[];
	public envases: Envase[];
	public empaques: Empaque[];
	public url: string;
	public filesToUpload: Array<File>;
	public tituloPantalla = "Productos";
	public tipoInsumos: TipoInsumo[];
	public previousUrl: string;
	public proveedorSelecionado: number;
	peticionEnCurso = false;
	formAddProducto: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private previousRouteService: PreviousRouteService,
		private uploadService: UploadService,
		private proveedorService: ProveedorService,
		private categoriaService: CategoriaProductoService,
		private clasificacionService: ClasificacionProductoService,
		private subclasificacionService: SubClasificacionProductoService,
		private empaqueService: EmpaqueService,
		private envaseService: EnvaseService,
		private productoService: ProductoService,
		private productoProveedorService: ProductoProveedorService,
		private tipoInsumoService: TipoInsumoService,
		private formBuilder: FormBuilder
	) {
		this.url = Global.url;
		this.producto = new Producto();
		this.productoProveedor = new ProductoProveedor();
	}

	ngOnInit() {
		this.previousUrl = this.previousRouteService.getPreviousUrl();

		$(document).ready(() => {
			$(".letras").keypress(function(key) {
				if (
					(key.charCode < 97 || key.charCode > 122) && // letras mayusculas
					(key.charCode < 65 || key.charCode > 90) && // letras minusculas
					(key.charCode < 48 || key.charCode > 57) && // numeros permitidos
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
			$(".dropify").dropify();
		});

		this.getProveedores();
		this.getCategorias();
		this.getEnvases();
		this.getEmpaques();
		this.getTiposInsumos();
		this.initFormAddProducto();
	}

	private initFormAddProducto() {
		this.formAddProducto = this.formBuilder.group({
			nombreProducto: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			descripcionProducto: new FormControl("", [
				Validators.minLength(3),
				Validators.maxLength(400)
			]),
			proveedor: new FormControl(null, [Validators.required]),
			empaque: new FormControl(null, []),
			envase: new FormControl(null, []),
			cantidadEmpaque: new FormControl(null, []),
			codigoInterno: new FormControl(null, [CustomValidators.nospaceValidator, Validators.required]),
			codigoOriginal: new FormControl(null, [CustomValidators.nospaceValidator, Validators.required]),
			tipoInsumo: new FormControl(null, [ Validators.required])
		});
	}

	getProveedores() {
		this.proveedorService.getProveedores().subscribe(
			response => {
				if (response.proveedores) {
					this.proveedores = response.proveedores;
				}
			}
		);
	}

	getCategorias() {
		this.categoriaService.getCategoriasProductos().subscribe(
			response => {
				if (response.categorias) {
					this.categorias = response.categorias;
				} else {
				}
			}
		);
	}

	getEmpaques() {
		this.empaqueService.getEmpaques().subscribe(
			response => {
				if (response.empaques) {
					this.empaques = response.empaques;
				}
			}
		);
	}

	getTiposInsumos() {
		this.tipoInsumoService.getTiposInsumos(1).subscribe(tiposinsumos => {
			this.tipoInsumos = tiposinsumos;
			this.tipoInsumos = this.tipoInsumos.filter(tipoinsumo => tipoinsumo.IdTipInsumo !== 1);
		});
	}

	getEnvases() {
		this.envaseService.getEnvases().subscribe(
			response => {
				if (response.envases) {
					this.envases = response.envases;
				}
			}
		);
	}

	onChangeProveedor(event) {
		if (event) {
			this.producto.IdProveedor = event.IdProveedor;
			this.proveedorSelecionado = this.producto.IdProveedor;
		} else {
			this.producto.IdProveedor = null;
			this.proveedorSelecionado = this.producto.IdProveedor;
		}
	}

	onChangeEnvase(event) {
		if (event) {
			this.producto.IdEnvase = event.IdEnvase;
		} else {
			this.producto.IdEnvase = null;
		}
	}

	onChangeEmpaque(event) {
		if (event === null) {
			this.producto.IdEmpaque = null;
		} else {
			this.producto.IdEmpaque = event.IdEmpaque;
		}
	}

	guardarImagenProducto() {
		this.peticionEnCurso = true;
		this.getValueForm();

		if (!Utils.valorCampoEsValido(this.producto.CodOriginal) && !Utils.valorCampoEsValido(this.producto.CodProd)) {
			Utils.showMsgInfo("El codigo producto o codigo interno es requerido!", "Producto");
			this.peticionEnCurso = false;
		} else {
			if (this.filesToUpload != null) {
				this.uploadService
					.makeFileRequest(
						this.url + "uploadImage/",
						CARPETA_PRODUCTOS,
						"",
						false,
						[],
						this.filesToUpload,
						"token",
						"image"
					)
					.then(
						(result: any) => {
							this.producto.Imagen = result.image;
							this.crearProducto();
						},
						error => {
							this.peticionEnCurso = false;
						}
					);
			} else {
				this.producto.Imagen = "";
				this.crearProducto();
			}
		}
	}

	getValueForm() {
		this.producto.NombProducto = this.formAddProducto.value.nombreProducto;
		this.producto.DescProducto = Utils.valorCampoEsValido(this.formAddProducto.value.descripcionProducto)
			? this.formAddProducto.value.descripcionProducto
			: "Ninguna";
		this.producto.IdEstado = 1;
		this.producto.DiasCaducidad = this.formAddProducto.value.diasDeUso;
		this.producto.CantidadEmpaque =
			this.formAddProducto.value.cantidadEmpaque === "" ? null : this.formAddProducto.value.cantidadEmpaque;
		this.producto.DiasDeUso = this.formAddProducto.value.diasDeUso === "" ? 0 : this.formAddProducto.value.diasDeUso;
		this.producto.DiasRotacion = Utils.valorCampoEsValido(this.formAddProducto.value.diasDeUso)
			? this.formAddProducto.value.diasDeUso
			: 0;
		this.producto.CodOriginal = this.formAddProducto.value.codigoOriginal;
		this.producto.CodProd =
			this.formAddProducto.value.codigoInterno === "" ? null : this.formAddProducto.value.codigoInterno;
		this.producto.IdProveedor = this.proveedorSelecionado;
		this.producto.Imagen = "";
		this.producto.CodBarra = this.producto.CodProd;
	}

	crearProducto() {
		this.peticionEnCurso = true;
		this.getValueForm();

		if (this.validarCamposProductos()) {
			this.productoService.createProducto(this.producto).subscribe(
				response => {
					if (response.IdProducto) {
						swal({
							title: "El producto se ha creado exitosamente!",
							text: "Deseas agregar otro producto?",
							type: "success",
							showCancelButton: true,
							confirmButtonColor: "#3085d6",
							cancelButtonColor: "#d33",
							confirmButtonText: "SI",
							cancelButtonText: "NO"
						}).then(result => {
							if (result.value) {
								this.resetComponenteAddProducto();
							} else if (result.dismiss === swal.DismissReason.cancel) {
								this.noSeguirAgregandoProductos();
							}
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
		} else {
			this.peticionEnCurso = false;
		}
	}

	validarCamposProductos() {
		if (this.producto.IdEmpaque && !this.formAddProducto.value.cantidadEmpaque) {
			Utils.showMsgInfo("La cantidad de empaque es requerida!");
			return false;
		}

		if (!this.producto.IdEmpaque && this.formAddProducto.value.cantidadEmpaque) {
			Utils.showMsgInfo("El empaque es requerido!");
			return false;
		}

		return true;
	}

	resetComponenteAddProducto() {
		this.resetFormProducto();
		this.producto = new Producto();
		this.filesToUpload = null;
		$(".dropify-clear").click();
		window.scrollTo(0, 0);
	}

	noSeguirAgregandoProductos() {
		if (this.previousUrl === "/proveedor/add") {
			this.router.navigate(["/factura/add"]);
		} else {
			this.router.navigate(["/producto"]);
		}
	}

	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	resultQueryEmpaque(event) {
		if (event) {
			this.empaqueService.getEmpaques(1).subscribe(
				response => {
					if (response.empaques) {
						this.empaques = response.empaques;
					}
				}
			);
		}
	}

	resultQueryEnvase(event) {
		if (event) {
			this.envaseService.getEnvases(1).subscribe(
				response => {
					if (response.envases) {
						this.envases = response.envases;
					}
				}
			);
		}
	}

	resetFormProducto() {
		Object.keys(this.formAddProducto.controls).forEach((value, index) => {
			if (value !== "proveedor") {
				this.formAddProducto.controls[value].reset();
			}
		});
	}

	changeTipoInsumo(event) {
		if (event) {
			this.producto.IdTipInsumo = event.IdTipInsumo;
		} else {
			this.producto.IdTipInsumo = null;
		}
	}

	agregarProveedor() {
		swal({
			title: "Agregar proveedor",
			text: 'Si seleccionas la opcion "SI", perderas los cambios digitados hasta el momento!',
			type: "info",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "SI",
			cancelButtonText: "NO"
		}).then(result => {
			if (result.value) {
				this.router.navigate(["/proveedor/add"]);
			} else if (result.dismiss === swal.DismissReason.cancel) {
			}
		});
	}

	showModalEmpaque() {
		this.empaqueService.mostrarModal();
	}

	showModalEnvase() {
		this.envaseService.mostrarModal();
	}
}
