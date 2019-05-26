import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Usuario } from "@app/models/Usuario";
import { UsuarioService } from "@app/core/service.index";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { ToastService } from "ng-uikit-pro-standard";
import { Token } from "@app/models/Token";

declare var $: any;

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
	public usuario: Usuario;
	public identity: Usuario;
	public title: String;
	public token: Token;
	public status;
	formLoginUser: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private usuarioService: UsuarioService,
		private formBuilderUser: FormBuilder,
		private toastr: ToastService
	) {
		this.token = new Token();
		this.usuario = new Usuario();
	}

	ngOnInit() {
		this.initFormLogin();

		$(".toggle-password").click(function() {

			$(this).toggleClass("fa-eye fa-eye-slash");
			var input = $($(this).attr("toggle"));
			if (input.attr("type") == "password") {
			  input.attr("type", "text");
			} else {
			  input.attr("type", "password");
			}
		  });
	}

	initFormLogin() {
		this.formLoginUser = this.formBuilderUser.group({
			nombre: new FormControl("", [Validators.required, CustomValidators.nospaceValidator]),
			password: new FormControl("", [Validators.required, CustomValidators.nospaceValidator])
		});
	}
	obtenerValoresFormLogin() {
		this.usuario.Username = this.formLoginUser.value.nombre;
		this.usuario.Password = this.formLoginUser.value.password;
	}

	onSubmit() {
		this.obtenerValoresFormLogin();
		this.usuarioService.login(this.usuario).subscribe(response => {
			this.token = response;
			if (!this.token) {
				this.toastr.error("Error", "El nombre de usuario o la contraseña son erroneos!");
			} else {
				localStorage.setItem("token", JSON.stringify(this.token.token));
				this.getInfoUser();
			}
		});
	}

	getInfoUser() {
		this.usuarioService.getInfoUsuario(this.token.token).subscribe(response => {
			this.identity = response;
			if (!this.identity) {
				this.toastr.error("Ha ocurrido un error al obtener la informacion del usuario", "Error");
			} else {
				this.status = "success";
				localStorage.setItem("identity", JSON.stringify(this.identity));
				this.router.navigate(["/dashboard"]);
			}
		});
	}
}
