import {Component, OnInit, ViewChild} from '@angular/core';
declare var $:any;
declare var jQuery:any;
import swal from 'sweetalert2'
import {Usuario} from "../../models/Usuario";
import {UsuarioService} from "../../services/usuario.service";
import {ActivatedRoute, Router} from "@angular/router";
declare var $:any;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public rol : string = 'admin';
  public Usuario : Usuario;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _usuarioService : UsuarioService

  ) { }

  ngOnInit() {

    this.Usuario = this._usuarioService.getIdentity();

  }

  logout(){
    localStorage.clear();
    this._usuarioService.identity = null;
    this._router.navigate(['/']);
  }

  verInformacionUsuario(){
    this._router.navigate(['menu/usuario/view']);
  }
}
