import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';
import {Usuario} from '../../../models/Usuario';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TrabajadorService} from '../../../services/trabajador.service';
import {RolusuarioService} from '../../../services/rolusuario.service';
import {RolUsuario} from '../../../models/RolUsuario';
import {Trabajador} from '../../../models/Trabajador';
import {CustomValidators} from '../../../validadores/CustomValidators';
import swal from 'sweetalert2';
import {Global} from '../../../services/global';
import {Utilidades} from '../../Utilidades';
import {isNull} from "util";

declare var $:any;

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {

  public usuario : Usuario;
  public usuarios : Usuario[];
  public roles: RolUsuario[];
  public trabajador : Trabajador;
  public trabajadores: Trabajador[];
  formularioAddUsuario : FormGroup;
  public imagenProducto : string;
  public url : string;
  public imagenTrabajador : string = 'no-img.png';
  public tituloPantalla : string =  'Usuario';
  public carpetaImagen : string = 'temp';

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _usuarioService : UsuarioService
    , private _trabajadorService : TrabajadorService
    , private _RolService : RolusuarioService
    , private formBuilderUsuario : FormBuilder

  ) {
    this.usuario = new Usuario();
    this.url = Global.url;
    this.trabajador = new Trabajador();
  }

  ngOnInit() {
      this.imagenProducto =  this.url + 'getImage/'+ 'trabajadores' + '/' + 'sF-MP74UyC1sYOA0hBrb-fB3.jpg';
    $(document).ready(() => {
        $('.dropify').dropify({
            defaultFile: this.imagenProducto
        });
    });

    this.initForm();
    this.getRoles();
    this.getTrabajadores();
  }

  initForm(){

    this.formularioAddUsuario = this.formBuilderUsuario.group({
      'nombre': new FormControl('',
        [
          Validators.required
          , Validators.maxLength(10)
          , Validators.minLength(4)
          , CustomValidators.espaciosVacios
        ])
      ,'contrasenia': new FormControl('',
        [
          Validators.required
          , Validators.maxLength(10)
          , Validators.minLength(5)
          , CustomValidators.espaciosVacios
        ])
      ,'correo': new FormControl('',
        [
          Validators.required
          , Validators.minLength(8)
          , CustomValidators.espaciosVacios
        ])
      ,'trabajador': new FormControl('',
        [
          Validators.required
        ])
      ,'rol': new FormControl('',
        [
          Validators.required
        ])
    })
    this.onChanges();
  }
  onChanges(): void {
    this.formularioAddUsuario.valueChanges.subscribe(val => {
     // console.log(val.correo);
    });
  }
  createUsuario(){
    this.usuario.Username = this.formularioAddUsuario.value.nombre;
    this.usuario.Password = this.formularioAddUsuario.value.contrasenia;
    this.usuario.Email = this.formularioAddUsuario.value.correo;
    this.usuario.Imagen = this.imagenTrabajador;

    this._usuarioService.createUsuario(this.usuario).subscribe(
      response =>{
        if(response.user){
          swal(
            'Usuario',
            'El Usuario ha sido creado exitosamente!',
            'success'
          ).then(() => {
            this._router.navigate(['/usuario']);
          })
        }
      }, error=>{
          Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
      },
    )
  }

  getRoles(){
    this._RolService.getRoles().subscribe(
      response =>{
        if(response.roles){
          this.roles = response.roles;
        } else {
        }
      }, error =>{
      }
    )
  }

  getTrabajadores(){

    this._trabajadorService.getTrabajadores().subscribe(
      response =>{
        if(response.trabajadores){
          this.trabajadores = response.trabajadores;
        }
      }, error =>{

      }
    )
  }


  onChangeTrabajador(event : Trabajador){

      if(isNull(event)) {
          this.usuario.IdTrabajador = null;
          this.imagenTrabajador = 'no-img.png';
          this.carpetaImagen = 'temp';
      } else {

          if(event.Imagen == '')
              this.carpetaImagen = 'temp';
          else {
              this.carpetaImagen = 'trabajadores';
          }
          this.usuario.IdTrabajador = event.IdTrabajador;
          this.imagenTrabajador = event.Imagen;
      }
  }

  onAddRol(event){
    this.usuario.IdRol = event.IdRol;
  }

}
