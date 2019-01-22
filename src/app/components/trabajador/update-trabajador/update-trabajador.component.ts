import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { Sucursal } from "@app/models/Sucursal";
import { Trabajador } from "@app/models/Trabajador";
import { Cargo } from "@app/models/Cargo";
import { CARPETA_TRABAJADORES, Global } from "@app/core/services/shared/global";
import { CargoService, SucursalService, TrabajadorService, UploadService } from "@app/core/service.index";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { CustomValidators } from "@app/validadores/CustomValidators";
import swal from "sweetalert2";
import { TipoDocumento } from "@app/models/TipoDocumento";
import { Utils } from "../../Utils";

declare var $: any;

@Component({
	selector: "app-update-trabajador",
	templateUrl: "./update-trabajador.component.html",
	styleUrls: ["./update-trabajador.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateTrabajadorComponent implements OnInit {
	public trabajador: Trabajador;
	public trabajadores: Trabajador[];
	formUpdateTrabajador: FormGroup;
	public sucursales: Sucursal[];
	public cargos: Cargo[];
	public url: string;
	public removioImagen: boolean;
	public tiposDocumento: TipoDocumento[];
	public filesToUpload: Array<File> = null;
	public tituloPantalla = "Actualizar Trabajador";

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private trabajadorService: TrabajadorService,
		private formBuilderTrabajador: FormBuilder,
		private sucursalService: SucursalService,
		private cargoService: CargoService,
		private uploadService: UploadService
	) {
		this.url = Global.url;
		this.trabajador = new Trabajador();

		this.getTiposDocumentos();
		this.getTrabajador();
		this.getCargos();
	}

	ngOnInit() {
		this.initFormTrabajador();
		this.getSucursales();
		this.getTrabajador();
		this.removioImagen = false;
	}

	initFormTrabajador() {
		this.formUpdateTrabajador = this.formBuilderTrabajador.group({
			nombreTrabajador: new FormControl("", [
				Validators.required,
				CustomValidators.nospaceValidator,
				Validators.minLength(2),
				Validators.maxLength(100)
			]),
			apellido: new FormControl("", [
				Validators.required,
				CustomValidators.nospaceValidator,
				Validators.minLength(3),
				Validators.maxLength(100)
			]),
			fechaNacimiento: new FormControl("", [Validators.required, CustomValidators.fechaNacimientoTrabajador]),
			fechaIngreso: new FormControl("", [Validators.required, CustomValidators.mayorFechaActual]),
			documentoTrabajador: new FormControl("", [Validators.required, CustomValidators.nospaceValidator]),
			tipoDocumento: new FormControl("", [Validators.required]),
			telefonoPrincipal: new FormControl("", [
				Validators.required,
				CustomValidators.nospaceValidator,
				Validators.minLength(8),
				Validators.maxLength(8)
			]),
			telefonoSecundario: new FormControl("", [Validators.minLength(8), Validators.maxLength(8)]),
			sucursal: new FormControl("", [Validators.required]),
			cargo: new FormControl("", [Validators.required]),
			direccion: new FormControl("", [
				Validators.required,
				CustomValidators.nospaceValidator,
				Validators.minLength(10),
				Validators.maxLength(300)
			])
		});
	}

	getValuesFormTrabajador() {
		this.trabajador.Nombres = this.formUpdateTrabajador.value.nombreTrabajador;
		this.trabajador.Apellidos = this.formUpdateTrabajador.value.apellido;
		this.trabajador.Documento = this.formUpdateTrabajador.value.documentoTrabajador;
		this.trabajador.Direccion = this.formUpdateTrabajador.value.direccion;
		this.trabajador.FechaIngreso = this.formUpdateTrabajador.value.fechaIngreso;
		this.trabajador.FechaNacimiento = this.formUpdateTrabajador.value.fechaNacimiento;
		this.trabajador.Telefono1 = this.formUpdateTrabajador.value.telefonoPrincipal;
		this.trabajador.Telefono2 = this.formUpdateTrabajador.value.telefonoSecundario;
	}

	getSucursales() {
		this.sucursalService.getSucursales().subscribe(
			response => {
				if (response.sucursales) {
					this.sucursales = response.sucursales;
				} else {
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	getCargos() {
		this.cargoService.getCargos().subscribe(
			response => {
				if (response.cargos) {
					this.cargos = response.cargos;
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	updateTrabajador() {
		this.getValuesFormTrabajador();

		this.trabajadorService.updateTrabajador(this.trabajador).subscribe(
			response => {
				if (response.success) {
					swal("Trabajador", "El trabajador ha sido actualizado exitosamente!", "success").then(() => {
						this.formUpdateTrabajador.reset();
						this.router.navigate(["/trabajador"]);
					});
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), "Trabajador");
			}
		);
	}

	getTrabajador() {
		this.route.params.forEach((params: Params) => {
			const id = params["id"];
			this.trabajador.IdTrabajador = id;

			this.trabajadorService.getTrabajador(id).subscribe(
				response => {
					if (response.trabajador) {
						this.trabajador = response.trabajador;

						// Inicializar componentes de la vista
						$(document).ready(() => {
							const imagenTrabajador = this.url + "getImagen/" + CARPETA_TRABAJADORES + "/" + this.trabajador.Imagen;
							let drEvent;

							if (this.trabajador.Imagen.length > 0) {
								drEvent = $(".dropify").dropify({
									defaultFile: imagenTrabajador
								});
							} else {
								drEvent = $(".dropify").dropify();
							}

							drEvent.on("dropify.afterClear", (event, element) => {
								this.removioImagen = true;
								this.filesToUpload = null;
							});
						});
						this.inicializarValoresFormularioTrabajador();
					} else {
						Utils.showMsgInfo("Ha ocurrido un error inesperado al obtener al trabajador", this.tituloPantalla);
					}
				},
				error => {
					Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
				}
			);
		});
	}

	inicializarValoresFormularioTrabajador() {
		this.formUpdateTrabajador.controls["nombreTrabajador"].setValue(this.trabajador.Nombres);
		this.formUpdateTrabajador.controls["apellido"].setValue(this.trabajador.Apellidos);
		this.formUpdateTrabajador.controls["fechaNacimiento"].setValue(this.trabajador.FechaNacimiento);
		this.formUpdateTrabajador.controls["fechaIngreso"].setValue(this.trabajador.FechaIngreso);
		this.formUpdateTrabajador.controls["documentoTrabajador"].setValue(this.trabajador.Documento);
		this.formUpdateTrabajador.controls["telefonoPrincipal"].setValue(this.trabajador.Telefono1);
		this.formUpdateTrabajador.controls["telefonoSecundario"].setValue(this.trabajador.Telefono2);
		this.formUpdateTrabajador.controls["direccion"].setValue(this.trabajador.Direccion);
		this.formUpdateTrabajador.controls["tipoDocumento"].setValue(this.trabajador.IdTipoDocumento);
		this.formUpdateTrabajador.controls['sucursal'].setValue(this.trabajador.IdSucursal);
        this.formUpdateTrabajador.controls['cargo'].setValue(this.trabajador.IdCargo);
	}

	guardarImagenTrabajador() {
		if (this.filesToUpload === null && !this.removioImagen) {
			this.updateTrabajador();
		} else {
			if (this.filesToUpload != null && !this.removioImagen) {
				this.uploadService
					.makeFileRequest(
						this.url + "uploadImage",
						CARPETA_TRABAJADORES,
						this.trabajador.Imagen,
						this.removioImagen,
						[],
						this.filesToUpload,
						"token",
						"image"
					)
					.then(
						(result: any) => {
							this.trabajador.Imagen = result.image;
							this.updateTrabajador();
						},
						error => {
							Utils.msgErrorImage(error);
						}
					);
			} else {
				Utils.showMsgInfo("La imagen es requerida", "Trabajador");
			}
		}
	}

	getTiposDocumentos() {
		this.trabajadorService.getTiposDocumento().subscribe(
			response => {
				if (response.documentos) {
					this.tiposDocumento = response.documentos;
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	onChangeSucursal(event) {
		if (event === null) {
			this.trabajador.IdSucursal = null;
		} else {
			this.trabajador.IdSucursal = event.IdSucursal;
		}
	}

	onChangeCargo(event) {
		if (event === null) {
			this.trabajador.IdCargo = null;
		} else {
			this.trabajador.IdCargo = event.IdCargo;
		}
	}

	onChangeTipoDocumento(event) {
		if (event === null) {
			this.trabajador.IdTipoDocumento = null;
		} else {
			this.trabajador.IdTipoDocumento = event.IdTipoDocumento;
		}
	}

	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
		this.removioImagen = false;
	}
}
