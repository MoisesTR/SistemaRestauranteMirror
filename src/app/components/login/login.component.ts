import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Usuario } from "@app/models/Usuario";
import { UsuarioService } from "@app/core/service.index";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { Utils } from "../Utils";
import { ToastService } from "ng-uikit-pro-standard";
import {Token} from '@app/models/Token';

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
	    this.token  = new Token();
		this.usuario = new Usuario();
	}

	ngOnInit() {
		this.initFormLogin();
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
	// onSubmit2() {
	// 	this.obtenerValoresFormLogin();
    //
	// 	// Logear al usuario y conseguir el objeto
	// 	this.usuarioService.login2(this.usuario).subscribe(
	// 		response => {
	// 			this.identity = response;
	// 			if (!this.identity || !this.identity.IdUsuario) {
	// 				this.toastr.error("Error", "El nombre de usuario o la contraseña son erroneos!");
	// 			} else {
	// 				this.identity.Password = "";
    //
	// 				// Local storage solo deja guardar numeros o string
	// 				localStorage.setItem("identity", JSON.stringify(this.identity));
    //
	// 				// Conseguir el token
	// 				this.usuarioService.login2(this.usuario, true).subscribe(
	// 					response2 => {
	// 						this.token = response2.token;
	// 						localStorage.setItem("token", JSON.stringify(this.token));
	// 						if (this.token.length <= 0) {
	// 						} else {
	// 							this.status = "success";
	// 							this.router.navigate(["/dashboard"]);
	// 						}
	// 					},
	// 					error => {
	// 						this.toastr.error(Utils.msgError(<any>error), "Error");
	// 					}
	// 				);
	// 			}
	// 		},
	// 		error => {
	// 			this.toastr.error(Utils.msgError(<any>error), "Error");
	// 		}
	// 	);
	// }

	onSubmit() {
		this.obtenerValoresFormLogin();
		this.usuarioService.login(this.usuario).subscribe(
			response => {
				this.token = response;
				if (!this.token) {
					this.toastr.error("Error", "El nombre de usuario o la contraseña son erroneos!");
				} else {
					localStorage.setItem("token", JSON.stringify(this.token.token));
					this.getInfoUser();
				}
			},
			error => {
				this.toastr.error(Utils.msgError(<any>error), "Error");
			}
		);
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
