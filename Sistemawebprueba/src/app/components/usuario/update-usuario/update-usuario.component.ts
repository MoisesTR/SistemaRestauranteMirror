import { Component, OnInit } from '@angular/core';
import {RolUsuario} from '../../../models/RolUsuario';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RolusuarioService} from '../../../services/rolusuario.service';
import {Trabajador} from '../../../models/Trabajador';
import {UsuarioService} from '../../../services/usuario.service';
import {Usuario} from '../../../models/Usuario';
import {TrabajadorService} from '../../../services/trabajador.service';
declare var $:any;

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit {

  ngOnInit(): void {

    $(document).ready(function(){
      $('.dropify').dropify();
    });

  }

  public usuario : Usuario;
  public usuarios : Usuario[];
  public roles: RolUsuario[];
  public trabajadores: Trabajador[];

  formularioAddUsuario : FormGroup
  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _usuarioService : UsuarioService
    , private _trabajadorService : TrabajadorService
    , private _RolService : RolusuarioService
    , private formBuilderUsuario : FormBuilder

  ) {
    this.usuario = new Usuario(null,null,null,null,null,null,null,null,null,null);

    this.initForm();
    this.getRoles();
    this.getTrabajadores();
    this.getUsuario();
  }

  initForm(){
    this.formularioAddUsuario = this.formBuilderUsuario.group({
      'nombre': new FormControl('',[Validators.required])
      ,'contrasenia': new FormControl('',[Validators.required])
      ,'correo': new FormControl('',[Validators.required])

    })
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

  getUsuario(){

    console.log(this._usuarioService.getIdentity())

  }

}
