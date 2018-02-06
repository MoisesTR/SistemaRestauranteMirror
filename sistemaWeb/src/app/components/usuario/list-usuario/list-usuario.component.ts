import { Component, OnInit } from '@angular/core';
import {RolUsuario} from '../../../models/RolUsuario';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RolusuarioService} from '../../../services/rolusuario.service';
import {Trabajador} from '../../../models/Trabajador';
import {UsuarioService} from '../../../services/usuario.service';
import {Usuario} from '../../../models/Usuario';
import {TrabajadorService} from '../../../services/trabajador.service';
import {Observable} from 'rxjs/Observable';
import {Select2OptionData} from 'ng2-select2';
declare var $:any;

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {

  ngOnInit() {
    $(document).ready(function(){
      $('.dropify').dropify();
    });
  }

  public usuario : Usuario;
  public usuarios : Usuario[];
  public roles: RolUsuario[];
  public trabajadores: Trabajador[];
  public optionsSelectRol : Select2Options;
  public optionsSelectTrabajador : Select2Options;
  public trabajador : Trabajador;
  formViewUser : FormGroup
  public NombreTrabajador  : Observable<string>;
  public rolUsuario: Array<Select2OptionData>;
  public trabajadorData: Array<Select2OptionData>;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _usuarioService : UsuarioService
    , private _trabajadorService : TrabajadorService
    , private _RolService : RolusuarioService
    , private formBuilderUsuario : FormBuilder

  ) {
    this.usuario = new Usuario(null,null,null,null,null,null,null,null,null);
    
    this.initForm();
    this.getRoles();
    this.getTrabajadores();
    this.getUsuario();

    this.rolUsuario = [
      {
        id: this.usuario.IdRol.toString(),
        text: this.usuario.DescripcionRol
      }
    ]

    this.trabajadorData = [
      {
        id: this.usuario.IdTrabajador.toString(),
        text: this.usuario.Nombres
      }
    ]

    this.optionsSelectRol = {
      multiple:true
      , width: '100%'
      , maximumSelectionLength : 1
      , disabled : true
      , data : this.rolUsuario
    }

    this.optionsSelectTrabajador = {
      multiple:true
      , width: '100%'
      , maximumSelectionLength : 1
      , disabled : true
      , data : this.trabajadorData
    }

    this.formViewUser.controls['nombre'].setValue(this.usuario.Nombres);
    this.formViewUser.controls['contrasenia'].setValue('');
    this.formViewUser.controls['correo'].setValue(this.usuario.Email);

  }

  initForm(){
    this.formViewUser = this.formBuilderUsuario.group({
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

  initForm(){
    this.formViewUser = this.formBuilderUsuario.group({
      'nombre': new FormControl('',[Validators.required])
      ,'contrasenia': new FormControl('',[Validators.required])
      ,'correo': new FormControl('',[Validators.required])

    })
  }

  getUsuario(){

    console.log(this._usuarioService.getIdentity())
    this.usuario = this._usuarioService.getIdentity();

    this._trabajadorService.getTrabajador(1).subscribe(
      response => {

        if(response.trabajador) {
            this.trabajador = response.trabajador;
          this.NombreTrabajador = Observable.create(obs => {
            obs.next(this.trabajador.Nombres);
            obs.complete();
          }).delay(100);

        }

      } ,error =>{
        console.log('Error trabajador')
    }
    )
  }

}
