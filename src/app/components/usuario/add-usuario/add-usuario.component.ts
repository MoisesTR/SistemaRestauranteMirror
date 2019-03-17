import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RolusuarioService, TrabajadorService, UsuarioService } from "@app/core/service.index";
import { Usuario } from "@app/models/Usuario";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { RolUsuario } from "@app/models/RolUsuario";
import { Trabajador } from "@app/models/Trabajador";
import { CustomValidators } from "@app/validadores/CustomValidators";
import swal from "sweetalert2";
import { Global } from "@app/core/services/shared/global";
import { Utils } from "../../Utils";

declare var $: any;

@Component({
	selector: "app-add-usuario",
	templateUrl: "./add-usuario.component.html",
	styleUrls: ["./add-usuario.component.css"]
})
export class AddUsuarioComponent implements OnInit {
	public usuario: Usuario;
	public usuarios: Usuario[];
	public roles: RolUsuario[];
	public trabajador: Trabajador;
	public trabajadores: Trabajador[];
	formularioAddUsuario: FormGroup;
	public imagenProducto: string;
	public url: string;
	public imagenTrabajador: string = "no-img.png";
	public tituloPantalla: string = "usuario";
	public carpetaImagen: string = "temp";

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _usuarioService: UsuarioService,
		private _trabajadorService: TrabajadorService,
		private _RolService: RolusuarioService,
		private formBuilderUsuario: FormBuilder
	) {
		this.usuario = new Usuario();
		this.url = Global.url;
		this.trabajador = new Trabajador();
	}

	ngOnInit() {
		this.imagenProducto = this.url + "getImage/" + "trabajadores" + "/" + "sF-MP74UyC1sYOA0hBrb-fB3.jpg";
		$(document).ready(() => {
			$(".dropify").dropify({
				defaultFile: this.imagenProducto
			});
		});

		this.initForm();
		this.getRoles();
		this.getTrabajadores();
	}

	initForm() {
		this.formularioAddUsuario = this.formBuilderUsuario.group({
			nombre: new FormControl("", [
				Validators.required,
				Validators.maxLength(10),
				Validators.minLength(4),
				CustomValidators.nospaceValidator
			]),
			contrasenia: new FormControl("", [
				Validators.required,
				Validators.maxLength(10),
				Validators.minLength(5),
				CustomValidators.nospaceValidator
			]),
			correo: new FormControl("", [Validators.required, Validators.minLength(8), CustomValidators.nospaceValidator]),
			trabajador: new FormControl("", [Validators.required]),
			rol: new FormControl("", [Validators.required])
		});
		this.onChanges();
	}
	onChanges(): void {
		this.formularioAddUsuario.valueChanges.subscribe(val => {});
	}
	createUsuario() {
		this.usuario.Username = this.formularioAddUsuario.value.nombre;
		this.usuario.Password = this.formularioAddUsuario.value.contrasenia;
		this.usuario.Email = this.formularioAddUsuario.value.correo;
		this.usuario.Imagen = this.imagenTrabajador;

		this._usuarioService.createUsuario(this.usuario).subscribe(
			response => {
				if (response.success) {
					swal("usuario", "El usuario ha sido creado exitosamente!", "success").then(() => {
						this._router.navigate(["/usuario"]);
					});
				}
			}
		);
	}

	getRoles() {
		this._RolService.getRoles().subscribe(
			response => {
				if (response.roles) {
					this.roles = response.roles;
				} else {
				}
			}
		);
	}

	getTrabajadores() {
		this._trabajadorService.getTrabajadores().subscribe(
			response => {
				if (response.trabajadores) {
					this.trabajadores = response.trabajadores;
				}
			}
		);
	}

	onChangeTrabajador(event: Trabajador) {
		if (event === null) {
			this.usuario.IdTrabajador = null;
			this.imagenTrabajador = "no-img.png";
			this.carpetaImagen = "temp";
		} else {
			if (event.Imagen == "") this.carpetaImagen = "temp";
			else {
				this.carpetaImagen = "trabajadores";
			}
			this.usuario.IdTrabajador = event.IdTrabajador;
			this.imagenTrabajador = event.Imagen;
		}
	}

	onAddRol(event) {
		this.usuario.IdRol = event.IdRol;
	}
}
