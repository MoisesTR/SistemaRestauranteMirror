import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../models/Usuario';
import {UsuarioService} from '../../services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../validadores/CustomValidators';
import {Utilidades} from '../Utilidades';
import {ToastService} from '../../typescripts/pro/alerts';
import {isArray} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})

export class LoginComponent implements OnInit {

  public usuario : Usuario;
  public identity: Usuario;
  public title: String;
  public token;
  public status;
  formLoginUser: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private usuarioServicio: UsuarioService,
    private formBuilderUser : FormBuilder
    , private toastr: ToastService
  ) {

    this.usuario = new Usuario();
  }

  ngOnInit() {
    this.initFormLogin();
  }

  initFormLogin(){

    this.formLoginUser = this.formBuilderUser.group({
      'nombre' : new FormControl('',[
        Validators.required
        , CustomValidators.espaciosVacios
      ]),
      'password' : new FormControl('',[
        Validators.required
        , CustomValidators.espaciosVacios
      ])
    })
  }
  obtenerValoresFormLogin(){
    this.usuario.Username = this.formLoginUser.value.nombre;
    this.usuario.Password = this.formLoginUser.value.password;

  }
  onSubmit(){

    this.obtenerValoresFormLogin();

    //Logear al usuario y conseguir el objeto
    this.usuarioServicio.login2(this.usuario).subscribe(

      response =>{
        this.identity = response;
        if(!this.identity || !this.identity.IdUsuario){
          this.toastr.error('Error', 'El nombre de usuario o la contraseña son erroneos!');
        } else {

          this.identity.Password = '';

          //Local storage solo deja guardar numeros o string
          localStorage.setItem('identity',JSON.stringify(this.identity));

          //Conseguir el token
          this.usuarioServicio.login2(this.usuario,true).subscribe(
            response =>{
              this.token = response.token;
              localStorage.setItem('token',JSON.stringify(this.token));
              if(this.token.length <= 0){
                console.log('El token no se ha generado');
              } else {
                this.status = 'success';
                this._router.navigate(['/dashboard']);
              }
            },
            error => {
                this.toastr.error(Utilidades.mensajeError(<any>error),'Error')

            }
          );
        }
      },
      error => {
        this.toastr.error(Utilidades.mensajeError(<any>error),'Error')
      }
    );
  }

}
