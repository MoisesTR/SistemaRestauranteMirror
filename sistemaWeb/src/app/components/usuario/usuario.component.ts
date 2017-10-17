import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Usuario} from "../../models/Usuario";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UsuarioService]
})
export class UsuarioComponent implements OnInit {

  public usuario : Usuario;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService : UsuarioService
  ) { }


  private initConstructorUsuario(){

  }
  ngOnInit() {
  }


}
