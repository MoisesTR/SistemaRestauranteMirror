import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../../services/usuario.service";
import {Usuario} from "../../../models/Usuario";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
declare var $:any;

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {

  public usuario : Usuario;
  public usuarios : Usuario[];

  formularioAddUsuario : FormGroup
  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _usuarioService : UsuarioService
    , private formBuilderUsuario : FormBuilder

  ) {
    this.usuario = new Usuario(null,null,null,null,null,null,null,null)

  }

  ngOnInit() {

    $(".selecttrabajador").select2();

    $(document).ready(function(){
      $(".selectrol").select2();
      $('.dropify').dropify();
    });



    this.initForm();
  }


  initForm(){
    this.formularioAddUsuario = this.formBuilderUsuario.group({
      'nombre': new FormControl('',[Validators.required])
      ,'contrasenia': new FormControl('',[Validators.required])
      ,'correo': new FormControl('',[Validators.required])

    })
  }

  createUsuario(){
    this.usuario.UsuarioNombre = this.formularioAddUsuario.value.nombre;
    this.usuario.Contrasenia = this.formularioAddUsuario.value.contrasenia;
    this.usuario.Correo = this.formularioAddUsuario.value.correo;

    if($( "#trabajador" ).val()[0] != null){
      this.usuario.IdTrabajador = parseInt($( "#trabajador" ).val()[0]);
    }
    if($( ".selectrol" ).val()[0] != null){
      this.usuario.IdRol = parseInt($( ".selectrol" ).val()[0]);
    }

    this._usuarioService
  }

  


}
