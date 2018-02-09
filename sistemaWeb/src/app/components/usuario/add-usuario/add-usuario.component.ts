import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UsuarioService} from '../../../services/usuario.service';
import {Usuario} from '../../../models/Usuario';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TrabajadorService} from '../../../services/trabajador.service';
import {RolusuarioService} from '../../../services/rolusuario.service';
import {RolUsuario} from '../../../models/RolUsuario';
import {Trabajador} from '../../../models/Trabajador';
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
  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _usuarioService : UsuarioService
    , private _trabajadorService : TrabajadorService
    , private _RolService : RolusuarioService
    , private formBuilderUsuario : FormBuilder

  ) {
    this.usuario = new Usuario(null,null,null,null,null,null,null,null,null)

  }

  ngOnInit() {



    $(document).ready(function(){
      $(".selectrol").select2();
      $(".selecttrabajador").select2();
      $('.dropify').dropify();
    });



    this.initForm();
    this.getRoles();
    this.getTrabajadores();
  }


  initForm(){
    this.formularioAddUsuario = this.formBuilderUsuario.group({
      'nombre': new FormControl('',[Validators.required])
      ,'contrasenia': new FormControl('',[Validators.required])
      ,'correo': new FormControl('',[Validators.required])

    })
  }

  createUsuario(){
    this.usuario.Username = this.formularioAddUsuario.value.nombre;
    this.usuario.Password = this.formularioAddUsuario.value.contrasenia;
    this.usuario.Email = this.formularioAddUsuario.value.correo;

    if($( "#trabajador" ).val()[0] != null){
      this.usuario.IdTrabajador = parseInt($( "#trabajador" ).val()[0]);
    }
    if($( ".selectrol" ).val()[0] != null){
      this.usuario.IdRol = parseInt($( ".selectrol" ).val()[0]);
    }

    this._usuarioService.createUsuario(this.usuario).subscribe(
      response =>{
        if(response.IdUsuario){
          this.usuario = response.IdUsuario;
        }
      }, error=>{
        console.log(error)
      },
    )

    console.log(this.usuario);
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




}
