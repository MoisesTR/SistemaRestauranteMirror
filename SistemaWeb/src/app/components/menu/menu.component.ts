import {Component, OnInit} from '@angular/core';
import {Usuario} from '../../models/Usuario';
import {UsuarioService} from '../../services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Pantalla} from '../../models/Pantalla';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  public rol: string = 'admin';
  public Usuario: Usuario;
  public pantallas : Pantalla[];

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _usuarioService: UsuarioService) {
  }

  ngOnInit() {
    this.Usuario = this._usuarioService.getIdentity();
    // this.obtenerPantallasUsuario();

    window.onscroll = function () {
      if (pageYOffset >= 200) {
          document.getElementById('backToTop').style.visibility = "visible";
      } else {
          document.getElementById('backToTop').style.visibility = "hidden";
      }
    };


  }

  obtenerPantallasUsuario(){

    this._usuarioService.getPantallasUsuario(this.Usuario.IdUsuario).subscribe(
        response => {

          if(response.pantallas){
            this.pantallas = response.pantallas;
          }
        }, error => {

        }, () => {

        }
    )
  }

  logout() {

    localStorage.clear();
    this._usuarioService.identity = null;
    this._router.navigate(['/login']);
  }

  verInformacionUsuario(){
    this._router.navigate(['/usuario/view']);
  }
}
