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
  public trabajadores: Trabajador[];
  formularioAddUsuario : FormGroup
  public select2Options : Select2Options;
  public todoValidado = 0;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _usuarioService : UsuarioService
    , private _trabajadorService : TrabajadorService
    , private _RolService : RolusuarioService
    , private formBuilderUsuario : FormBuilder

  ) {
    this.usuario = new Usuario(null,null,null,null,null,null,null,null,null)

    this.select2Options = {
      multiple : true
      , maximumSelectionLength : 1
      , width : '100%'
    }
  }

  ngOnInit() {

    $(document).ready(function(){
      $('.dropify').dropify();
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

    this._usuarioService.createUsuario(this.usuario).subscribe(
      response =>{
        if(response.user){
          swal(
            'Usuario',
            'El Usuario ha sido creado exitosamente!',
            'success'
          ).then(() => {
            this._router.navigate(['menu/usuario']);
          })
        }
      }, error=>{
        console.log(error)
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

  changedSelectRol(event){
    let IdRol = event.value[0];

    if(IdRol != null) {
      this.usuario.IdRol = IdRol;
    } else {
      this.usuario.IdRol = null
    }
    this.validarCamposSelect2();
  }

  changedSelectTrabador(event) {

    let idTrabajador = event.value[0];

    if(idTrabajador != null) {
      this.usuario.IdTrabajador = idTrabajador;
    } else {
      this.usuario.IdTrabajador = null;
    }

    this.validarCamposSelect2();
  }

  validarCamposSelect2(){

    if(this.usuario.IdRol == null || this.usuario.IdTrabajador == null) {
      this.todoValidado = 0;
    } else {
      this.todoValidado = 1;
    }
  }

}
