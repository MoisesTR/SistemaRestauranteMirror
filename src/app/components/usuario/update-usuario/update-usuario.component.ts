import {Component, OnInit} from '@angular/core';
import {RolUsuario} from '@app/models/RolUsuario';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RolusuarioService, TrabajadorService, UsuarioService} from '@app/core/service.index';
import {Trabajador} from '@app/models/Trabajador';
import {Usuario} from '@app/models/Usuario';

declare var $:any;

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit {

    public usuario: Usuario;
    public usuarios: Usuario[];
    public roles: RolUsuario[];
    public trabajadores: Trabajador[];
    public formUpdateUsuario: FormGroup;

  ngOnInit(): void {

    $(document).ready(function(){
      $('.dropify').dropify();
    });

  }

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _usuarioService : UsuarioService
    , private _trabajadorService : TrabajadorService
    , private _RolService : RolusuarioService
    , private formBuilderUsuario : FormBuilder

  ) {
    this.usuario = new Usuario();

    this.initForm();
    this.getRoles();
    this.getTrabajadores();
    this.getUsuario();
  }

  initForm(){
    this.formUpdateUsuario = this.formBuilderUsuario.group({
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
    );
  }

  updateUsuario() {

  }

  getUsuario(){

  }

}
