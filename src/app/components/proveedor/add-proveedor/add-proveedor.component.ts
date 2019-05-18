import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PreviousRouteService, ProveedorService } from "@app/core/service.index";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Proveedor } from "@app/models/Proveedor";
import swal from "sweetalert2";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { TelefonoProveedor } from "@app/models/TelefonoProveedor";
import { ModalDirective } from "ng-uikit-pro-standard";
import { TipoDocumentoEnum } from "@app/Enums/TipoDocumentoEnum";

declare var $: any;

@Component({
	selector: "add-proveedor",
	templateUrl: "./add-proveedor.component.html",
	styleUrls: ["./add-proveedor.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProveedorComponent implements OnInit, AfterViewChecked {
	@ViewChild("modalAgendaTelefonica") modalContacto: ModalDirective;

	public proveedor: Proveedor;
	public tituloPantalla = "Proveedor";
	formAddProveedor: FormGroup;
	previousUrl: string;
	public contactos: TelefonoProveedor[];
	public telefonoRequerido: TelefonoProveedor;
	public formAddTelefonos: FormGroup;
	peticionEnCurso = false;
	public opcional: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private proveedorService: ProveedorService,
		private formBuilderProveedor: FormBuilder,
		private previousRouteService: PreviousRouteService,
		private cdRef: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.previousUrl = this.previousRouteService.getPreviousUrl();
		this.proveedor = new Proveedor();
		this.telefonoRequerido = new TelefonoProveedor();
		this.contactos = [];

		$(document).ready(function() {
			$(".letras").keypress(function(key) {
				if (
					(key.charCode < 97 || key.charCode > 122) && // letras mayusculas
					(key.charCode < 65 || key.charCode > 90) && // letras minusculas
					key.charCode !== 45 && // .
					key.charCode !== 46 && // -
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
		});

		this.initFormAdd();
		this.initFormTelefonos();
	}

	ngAfterViewChecked() {
		this.cdRef.detectChanges();
	}

	createProveedor() {
		this.peticionEnCurso = false;
		this.getDatosProveedor();

		if (this.proveedorService.validarTelefonos(this.contactos, this.proveedor.IsMercado)) {

			this.proveedorService.validarDatosGuardarProveedor(this.proveedor);
			this.proveedorService.createProveedor(this.proveedor).subscribe(
				response => {
					if (response.IdProveedor) {
						this.contactos.forEach((value, index) => {
							value.IdProveedor = response.IdProveedor;
							this.createTelefonoProveedor(value);
						});
						this.mensajeCreacionProveedor();
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

	mensajeCreacionProveedor() {
		swal.fire("Proveedor", "El proveedor ha sido creado exitosamente!", "success").then(() => {
			if (this.previousUrl === "/factura/add") {
				this.router.navigate(["/producto/add"]);
			} else if (this.previousUrl === "/producto/add") {
				this.router.navigate([this.previousUrl]);
			} else {
				this.router.navigate(["/proveedor"]);
			}
		});
	}

	createTelefonoProveedor(telefono: TelefonoProveedor) {
		this.proveedorService.createTelefonoProveedor(telefono).subscribe(response => {
			if (response.IdTelefono) {
			}
		});
	}

	initFormAdd() {
		this.formAddProveedor = this.formBuilderProveedor.group({
			nombreProveedor: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			numeroRuc: new FormControl("", [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(20),
				CustomValidators.nospaceValidator
			]),
			direccionProveedor: new FormControl("", [Validators.minLength(5), Validators.maxLength(400), CustomValidators.nospaceValidator]),
			nombreRepresentante: new FormControl("", [Validators.minLength(2), Validators.maxLength(200), CustomValidators.nospaceValidator]),
			email: new FormControl("", [Validators.minLength(5), Validators.maxLength(200), CustomValidators.nospaceValidator]),
			descripcionProveedor: new FormControl(null, [Validators.maxLength(400)]),
			isMercado: new FormControl(false, []),
			isProveedorServicio: new FormControl(false, []),
			abreviatura: new FormControl("", [Validators.minLength(2), Validators.maxLength(15), CustomValidators.nospaceValidator])
		});
	}

	getDatosProveedor() {
		this.proveedor.NombProveedor = this.formAddProveedor.value.nombreProveedor;
		this.proveedor.NombRepresentante = this.formAddProveedor.value.nombreRepresentante || undefined;
		this.proveedor.DescProveedor = this.formAddProveedor.value.descripcionProveedor;
		this.proveedor.Documento = this.formAddProveedor.value.numeroRuc;
		this.proveedor.Direccion = this.formAddProveedor.value.direccionProveedor;
		this.proveedor.Email = this.formAddProveedor.value.email;
		this.proveedor.IsProvServicio = this.formAddProveedor.value.isProveedorServicio;
		this.proveedor.Abreviatura = this.formAddProveedor.value.abreviatura || undefined;
		this.proveedor.IsMercado = this.formAddProveedor.value.isMercado;
		this.proveedor.IdPais = 1;
		this.proveedor.HasSucursales = false;
		this.proveedor.IdTipDoc = TipoDocumentoEnum.NumeroRuc;
	}

	initFormTelefonos() {
		this.formAddTelefonos = this.formBuilderProveedor.group({
			nombres: new FormControl("", [Validators.required]),
			cargo: new FormControl("", []),
			telefono: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
			extension: new FormControl("", []),
			titular: new FormControl("", [])
		});
	}

	agregarContacto() {
		this.contactos.push(this.getValuesContactoForm());
		this.modalContacto.hide();
	}

	getValuesContactoForm(): TelefonoProveedor {
		const contacto = new TelefonoProveedor();
		contacto.NombPAsignada = this.formAddTelefonos.controls["nombres"].value;
		contacto.Cargo = this.formAddTelefonos.controls["cargo"].value;
		contacto.Telefono = this.formAddTelefonos.controls["telefono"].value;
		contacto.Extension = this.formAddTelefonos.controls["extension"].value;
		contacto.Titular = this.formAddTelefonos.controls["titular"].value === true ? 1 : 0;
		return contacto;
	}

	eliminarTelefono(telefono: TelefonoProveedor, indice: any) {
		this.contactos.splice(indice, 1);
	}

	changeMercado(event) {
		const isMercado = event.checked;

		if (isMercado) {
			this.formAddProveedor.controls["numeroRuc"].clearValidators();
			this.formAddProveedor.controls["numeroRuc"].setValue("");
			this.formAddProveedor.controls["numeroRuc"].disable();
			this.formAddProveedor.controls["numeroRuc"].updateValueAndValidity();
			this.opcional = "(Opcional)";
		} else {
			this.opcional = " ";
			this.formAddProveedor.controls["numeroRuc"].setValidators([
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(20),
				CustomValidators.nospaceValidator
			]);
			this.formAddProveedor.controls["numeroRuc"].enable();
			this.formAddProveedor.controls["numeroRuc"].updateValueAndValidity();
		}
	}

	mostrarAgendaContacto() {
		this.formAddTelefonos.reset();
		this.modalContacto.show();
	}
}
