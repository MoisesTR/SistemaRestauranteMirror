import {Component, OnInit} from '@angular/core';
import {Usuario} from '@app/models/Usuario';
import {UsuarioService} from '@app/services/service.index';
import {ActivatedRoute, Router} from '@angular/router';
import {Global} from '@app/services/shared/global';
import {MenuService} from '@app/services/service.index';
import {Menu} from '@app/models/Menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public rol = 'admin';
  public Usuario: Usuario;
  public menues: Menu[];
  public url: string;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _usuarioService: UsuarioService
              , private _menuService: MenuService
  ) {
  }

  ngOnInit() {
    this.Usuario = this._usuarioService.getIdentity();
    this.url = Global.url;
    this.menues = [];
    this.getMenuesByIdRol(this.Usuario.IdRol);

    window.onscroll = function () {
      if (pageYOffset >= 200) {
          document.getElementById('backToTop').style.visibility = "visible";
      } else {
          document.getElementById('backToTop').style.visibility = "hidden";
      }
    };

  
  }

  backtoPage(){
    window.history.back();
  }

  onActivate(event) {
    window.scroll(0,0);
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
    );
  }
}
