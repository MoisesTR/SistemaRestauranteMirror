import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../models/Usuario";
import {UsuarioService} from "../../services/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  public usuario : Usuario;
  public title: String;
  public identity;
  public token;
  public status;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private usuarioServicio: UsuarioService
  ) { }

  ngOnInit() {
    console.log(this.usuarioServicio.getIdentity());
    console.log(this.usuarioServicio.getToken());
  }

  onSubmit(){
    //Logear al usuario y conseguir el objeto
    this.usuarioServicio.login(this.usuario).subscribe(

      response =>{
        this.identity = response.usuario;

        if(!this.identity || !this.identity.idUsuario){
          console.log('El usuario no se ha logeado correctamente');

        } else {

          this.identity.contrasenia = '';

          //Local storage solo deja guardar numeros o string
          localStorage.setItem('identity',JSON.stringify(this.identity));

          //Conseguir el token
          this.usuarioServicio.login(this.usuario,true).subscribe(
            response =>{
              this.token = response.token;
              console.log(this.token);

              if(this.token.length <= 0){
                console.log('El token no se ha generado');

              } else {

                this.status = 'success';
                this._router.navigate(['/']);
              }
            },
            error => {
              console.log(<any>error);
            }
          );
        }
      },
      error => {
        var errorMensaje = <any>error;

        if(errorMensaje!=null){
          var body = JSON.parse(error._body);
          this.status = 'error';
        } else {

        }

      }
    );
  }

}
