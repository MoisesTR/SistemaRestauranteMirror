import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../models/Usuario";
import {UsuarioService} from "../../services/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, FormControl, FormArray, NgForm, Validators, FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  public usuario : Usuario;
  public title: String;
  public identity: Usuario;
  public token;
  public status;

  formLoginUser: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private usuarioServicio: UsuarioService,
    private formBuilderUser : FormBuilder
  ) {

    this.usuario = new Usuario(null,null,null,null,null,null,null,null);
  }

  ngOnInit() {
    /*console.log(this.usuarioServicio.getIdentity());
    console.log(this.usuarioServicio.getToken());*/

    this.formLoginUser = this.formBuilderUser.group({
        'nombre' : new FormControl(''),
        'password' : new FormControl('')
    })
  }


  getValuesLogin(){
    this.usuario.Username = this.formLoginUser.value.nombre;
    this.usuario.Password = this.formLoginUser.value.password;

  }
  navegar(){

    this._router.navigate(['/menu/dashboard']);
  }
  onSubmit(){
    this.getValuesLogin();
    //Logear al usuario y conseguir el objeto
    this.usuarioServicio.login2(this.usuario).subscribe(

      response =>{
        this.identity = response;
        console.log( response.IdUsuario);
        if(!this.identity || !this.identity.IdUsuario){
          console.log('El usuario no se ha logeado correctamente');

        } else {

          this.identity.Password = '';

          //Local storage solo deja guardar numeros o string
          localStorage.setItem('identity',JSON.stringify(this.identity));

          //Conseguir el token
          this.usuarioServicio.login2(this.usuario,true).subscribe(
            response =>{
              this.token = response.token;
              console.log(this.token);

              if(this.token.length <= 0){
                console.log('El token no se ha generado');

              } else {

                this.status = 'success';
                console.log(this.identity);
                this._router.navigate(['/menu']);
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
          console.log(error)
        } else {

        }

      }
    );
  }

}
