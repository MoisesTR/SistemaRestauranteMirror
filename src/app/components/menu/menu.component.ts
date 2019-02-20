import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuario } from "@app/models/Usuario";
import { MenuService, UsuarioService, PersistenciaDatoService } from "@app/core/service.index";
import { Menu } from "@app/models/Menu";
import { Global } from "@app/core/services/shared/global";
import { NgxSpinnerService } from "ngx-spinner";
import { Utils } from "@app/components/Utils";

@Component({
    selector: "app-menu",
    templateUrl: "./menu.component.html",
    styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit {
    public rol = "admin";
    public usuario: Usuario;
    public menues: Menu[];
    public url: string;
    public carpetaImagen = "trabajadores";
    public tituloPantalla = "Menu";

	constructor(
		private menuService: MenuService,
		private route: ActivatedRoute,
		private router: Router,
		private spinner: NgxSpinnerService,
		private usuarioService: UsuarioService,
		private cdr: ChangeDetectorRef,
		private persistenciaDatosService: PersistenciaDatoService
	) {}

    ngOnInit() {
        this.spinner.show();
        this.usuario = this.usuarioService.getIdentity();
        this.url = Global.url;
        this.menues = [];
        this.getMenuesByIdRol(this.usuario.IdRol);
        // this.scroll();
    }

    // scroll() {
    // 	if (pageYOffset >= 200) {
    // 		document.getElementById("backToTop").style.visibility = "visible";
    // 	} else {
    // 		document.getElementById("backToTop").style.visibility = "hidden";
    // 	}
    // }

    backtoPage() {
        window.history.back();
    }

    onActivate(event) {
        window.scroll(0, 0);
    }

    logout() {
        localStorage.clear();
        this.usuarioService.identity = null;
        this.router.navigate(["/login"]);
    }

    verInformacionUsuario() {
        this.router.navigate(["/usuario/view"]);
    }

	getMenuesByIdRol(IdRol) {
		this.menuService.getMenuesByIdRol(IdRol).subscribe(
			response => {
				if (response.Menues) {
					this.menues = response.Menues;
				} else {
					Utils.showMsgInfo("Ha ocurrido un error inesperado al obtener los menues!", this.tituloPantalla);
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
				this.spinner.hide();
			},
			() => {
				this.spinner.hide();
			}
		);
	}

	EliminarPersistencia() {
		this.persistenciaDatosService.deleteItmes();
	}
}
