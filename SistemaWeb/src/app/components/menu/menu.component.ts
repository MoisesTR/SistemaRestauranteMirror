import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../models/Usuario';
import {UsuarioService} from '../../services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Pantalla} from '../../models/Pantalla';
import {Global} from '../../services/global';
import {MenuService} from '../../services/menu-service';
import {Menu} from '../../models/Menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public rol: string = 'admin';
  public Usuario: Usuario;
  public menues: Menu[];
  public url : string;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _usuarioService: UsuarioService
              , private _menuService : MenuService
  ) {
  }

  ngOnInit() {
    this.Usuario = this._usuarioService.getIdentity();
    this.url = Global.url;
    this.menues = [];
    this.getMenuesByIdRol(this.Usuario.IdRol);
  }

  logout() {
    localStorage.clear();
    this._usuarioService.identity = null;
    this._router.navigate(['/login']);
  }

  verInformacionUsuario() {
    this._router.navigate(['/usuario/view']);
  }

  getMenuesByIdRol(IdRol) {
    this._menuService.getMenuesByIdRol(IdRol).subscribe(
        response => {
          if (response.Menues) {
            this.menues = response.Menues;
          }
        }, error => {

        }
    )
  }
}
