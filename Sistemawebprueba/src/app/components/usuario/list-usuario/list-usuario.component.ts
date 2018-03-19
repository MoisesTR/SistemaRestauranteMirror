import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RolusuarioService} from '../../../services/rolusuario.service';
import {UsuarioService} from '../../../services/usuario.service';
import {Usuario} from '../../../models/Usuario';
import {TrabajadorService} from '../../../services/trabajador.service';

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
  formViewUser : FormGroup

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
    this.getUsuario();
    this.setDatosFormulario();

  }

  initForm(){
    this.formViewUser = this.formBuilderUsuario.group({
      'username': new FormControl(this.usuario.Username,)
      ,'contrasenia': new FormControl(this.usuario.Email,)
      ,'correo': new FormControl('',)
      ,'trabajador': new FormControl('',)
      ,'rol': new FormControl('',)
    })
  }

  getUsuario(){
    this.usuario = this._usuarioService.getIdentity();
  }

  private setDatosFormulario() {
    this.formViewUser.controls['username'].setValue(this.usuario.Username);
    this.formViewUser.controls['correo'].setValue(this.usuario.Email);
    this.formViewUser.controls['trabajador'].setValue(this.usuario.Nombres);
    this.formViewUser.controls['rol'].setValue(this.usuario.DescripcionRol);
  }
}
