import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Usuario} from '../../models/Usuario';
import {UsuarioService} from '../../services/usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewInit{
  ngAfterViewInit(): void {

  }

  public rol: string = 'admin';
  public Usuario: Usuario;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _usuarioService: UsuarioService) {
  }

  ngOnInit() {
    $(document).ready(function(){

    $('#firstCollapseMenu').collapsible({
      accordion: true,
      accordionUpSpeed: 400,
      accordionDownSpeed: 400,
      collapseSpeed: 400,
      contentOpen: null,
      arrowRclass: 'arrow-r',
      arrowDclass: 'arrow-d',
      animate: true
    });
      $('.button-collapse').sideNav();
    });



    this.Usuario = this._usuarioService.getIdentity();

  }

  logout() {
    localStorage.clear();
    this._usuarioService.identity = null;
    this._router.navigate(['/']);
  }

  verInformacionUsuario(){
    this._router.navigate(['menu/usuario/view']);
  }
}
