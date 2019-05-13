import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RolusuarioService, TrabajadorService, UsuarioService } from "@app/core/service.index";
import { Usuario } from "@app/models/Usuario";
import { CARPETA_TRABAJADORES, Global } from "@app/core/services/shared/global";

declare var $: any;

@Component({
	selector: "app-list-usuario",
	templateUrl: "./list-usuario.component.html",
	styleUrls: ["./list-usuario.component.css"]
})
export class ListUsuarioComponent implements OnInit {
	public usuario: Usuario;
	formViewUser: FormGroup;
	public url: string;

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
		this.initForm();
		this.getUsuario();
		this.setDatosFormulario();
	}

	ngOnInit() {}

	initForm() {
		this.formViewUser = this.formBuilderUsuario.group({
			username: new FormControl(this.usuario.Username),
			contrasenia: new FormControl(this.usuario.Email),
			correo: new FormControl(""),
			trabajador: new FormControl(""),
			rol: new FormControl("")
		});
	}

	getUsuario() {
		this.usuario = this._usuarioService.getIdentity();

		$(document).ready(() => {
			const imagenUsuario = this.url + "getImagen/" + CARPETA_TRABAJADORES + "/" + this.usuario.Imagen;

			$(".dropify").dropify({
				defaultFile: imagenUsuario
			});
		});
	}

	private setDatosFormulario() {
		this.formViewUser.controls["username"].setValue(this.usuario.Username);
		this.formViewUser.controls["correo"].setValue(this.usuario.Email);
		this.formViewUser.controls["trabajador"].setValue(this.usuario.Nombres);
		this.formViewUser.controls["rol"].setValue(this.usuario.DescRol);
	}
}
