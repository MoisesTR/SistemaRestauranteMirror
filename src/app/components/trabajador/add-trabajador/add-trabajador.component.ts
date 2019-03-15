import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from "@angular/core";
import { Trabajador } from "@app/models/Trabajador";
import { ActivatedRoute, Router } from "@angular/router";
import { TrabajadorService } from "@app/core/services/shared/trabajador.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SucursalService } from "@app/core/services/shared/sucursal.service";
import { Sucursal } from "@app/models/Sucursal";
import { CargoService } from "@app/core/services/shared/cargo.service";
import { Cargo } from "@app/models/Cargo";
import swal from "sweetalert2";
import { UploadService } from "@app/core/services/shared/upload.service";
import { CARPETA_TRABAJADORES, Global, opcionesDatePicker } from "@app/core/services/shared/global";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { Utils } from "../../Utils";
import { TipoDocumento } from "@app/models/TipoDocumento";
import { IMyOptions, ModalDirective } from "ng-uikit-pro-standard";

declare var $: any;

@Component({
	selector: "app-add-trabajador",
	templateUrl: "./add-trabajador.component.html",
	styleUrls: ["./add-trabajador.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTrabajadorComponent implements OnInit {
	public trabajador: Trabajador;
	public trabajadores: Trabajador[];
	formAddTrabajador: FormGroup;
	public sucursales: Sucursal[];
	public cargos: Cargo[];
	public tiposDocumento: TipoDocumento[];
	public url: string;
	public myDatePickerOptions: IMyOptions = opcionesDatePicker;
	public tituloPantalla = "Trabajador";
	public filesToUpload: Array<File>;
	public btnIngresarHabilitado = true;

	@ViewChild("modalUsuario") modalUsuario: ModalDirective;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private trabajadorService: TrabajadorService,
		private formBuilderAddTrabajador: FormBuilder,
		private sucursalService: SucursalService,
		private cargoService: CargoService,
		private uploadService: UploadService
	) {
		this.url = Global.url;
		this.trabajador = new Trabajador();

		this.getTrabajadores();
		this.getCargos();
	}

	ngOnInit() {
		$(document).ready(() => {
			$(".letras").keypress(function(key) {
				if (
					(key.charCode < 97 || key.charCode > 122) && // letras mayusculas
					(key.charCode < 65 || key.charCode > 90) && // letras minusculas
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
		this.initFormTrabajador();
		this.getSucursales();
		this.getTiposDocumentos();
	}

	getTrabajadores() {
		this.trabajadorService.getTrabajadores().subscribe(
			response => {
				if (response.trabajadores) {
					this.trabajadores = response.trabajadores;
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error));
			}
		);
	}

	onChangeSucursal(event) {
		if (!Utils.notNullOrUndefined(event)) {
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
			this.trabajador.IdTipDoc = null;
		} else {
			this.trabajador.IdTipDoc = event.IdTipDoc;
			this.formAddTrabajador.controls["documentoTrabajador"].setValue("");
			if (event.IdTipDoc === 1) {
				this.formAddTrabajador.controls["documentoTrabajador"].setValidators([
					Validators.required,
					CustomValidators.nospaceValidator,
					Validators.maxLength(14)
				]);
			} else {
				this.formAddTrabajador.controls["documentoTrabajador"].setValidators([
					Validators.required,
					CustomValidators.nospaceValidator,
					Validators.maxLength(10)
				]);
			}
		}
	}

	initFormTrabajador() {
		this.formAddTrabajador = this.formBuilderAddTrabajador.group({
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
			fechaNacimiento: new FormControl("", [
				Validators.required,
				CustomValidators.nospaceValidator,
				CustomValidators.fechaNacimientoTrabajador
			]),
			fechaIngreso: new FormControl("", [
				Validators.required,
				CustomValidators.nospaceValidator,
				CustomValidators.mayorFechaActual
			]),
			documentoTrabajador: new FormControl("", [
				Validators.required,
				Validators.minLength(14),
				Validators.maxLength(14),
				CustomValidators.nospaceValidator
			]),
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

	getValueFormAddTrabajador() {
		this.trabajador.Nombres = this.formAddTrabajador.value.nombreTrabajador;
		this.trabajador.Apellidos = this.formAddTrabajador.value.apellido;
		this.trabajador.FechaNacimiento = this.formAddTrabajador.value.fechaNacimiento;
		this.trabajador.FechaIngreso = this.formAddTrabajador.value.fechaIngreso;
		this.trabajador.Documento = this.formAddTrabajador.value.documentoTrabajador;
		this.trabajador.Telefono1 = this.formAddTrabajador.value.telefonoPrincipal;
		this.trabajador.Telefono2 = this.formAddTrabajador.value.telefonoSecundario;
		this.trabajador.Direccion = this.formAddTrabajador.value.direccion;
		this.trabajador.IdPais = 1;
	}

	guardarImagenTrabajador() {
		this.btnIngresarHabilitado = false;
		if (this.filesToUpload != null) {
			this.uploadService
				.makeFileRequest(
					this.url + "uploadImage/",
					CARPETA_TRABAJADORES,
					"",
					false,
					[],
					this.filesToUpload,
					"token",
					"image"
				)
				.then(
					(result: any) => {
						this.trabajador.Imagen = result.image;
						this.createTrabajador();
					},
					error => {
						Utils.msgErrorImage(error);
					}
				);
		} else {
			Utils.showMsgInfo("La imagen del trabajador es requerida", this.tituloPantalla);
		}
		this.btnIngresarHabilitado = true;
	}

	createTrabajador() {
		this.getValueFormAddTrabajador();

		this.trabajadorService.createTrabajador(this.trabajador).subscribe(
			response => {
				if (response.IdTrabajador) {
					swal("Trabajador", "El trabajador ha sido creado exitosamente!", "success").then(() => {
						this.modalUsuario.show();
					});
				} else {
					Utils.showMsgInfo(
						"Ha ocurrido un error al insertar el trabajador, intentalo nuevamente",
						this.tituloPantalla
					);
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			},
			() => {
				this.formAddTrabajador.reset();
			}
		);
	}

	getSucursales() {
		this.sucursalService.getSucursales().subscribe(
			response => {
				if (response.sucursales) {
					this.sucursales = response.sucursales;
				} else {
					Utils.showMsgInfo("No se han podido obtener correctamente las sucursales", this.tituloPantalla);
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

	getTiposDocumentos() {
		this.trabajadorService.getTiposDocumento().subscribe(
			response => {
				if (response.documentos) {
					this.tiposDocumento = response.documentos;
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			},
			() => {}
		);
	}

	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}

	relacionarTrabajador() {
		this.modalUsuario.hide();
		this.router.navigate(["/usuario/add"]);
	}

	listaTrabajadores() {
		this.modalUsuario.hide();
		this.router.navigate(["/trabajador"]);
	}
}
