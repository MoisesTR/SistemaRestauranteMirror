import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Usuario} from "../../models/Usuario";

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  providers: [UsuarioService]
})
export class RegistroUsuarioComponent implements OnInit {

  public usuario: Usuario;
  public usuarios : Usuario[];
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService : UsuarioService
  ) {
    this.initConstructorUsuario();
  }


  private initConstructorUsuario(){
    this.usuario = new Usuario(null,null,null,null,null,null,null);
  }
  ngOnInit() {
  }

  createUsuario(){

  }

  getUsuario(){

  }

  getUsuarios(){

  }

  updateUsuario(){

  }
  deleteUsuario(){

  }


}
