import { NgModule } from "@angular/core";
import { AddUsuarioComponent } from "./add-usuario/add-usuario.component";
import { ListUsuariosComponent } from "./list-usuarios/list-usuarios.component";
import { UpdateUsuarioComponent } from "./update-usuario/update-usuario.component";
import { UsuarioRoutingModule } from "./usuario.routing.module";
import { ListUsuarioComponent } from "./list-usuario/list-usuario.component";
import { SharedModule } from "../shared-module/shared.module";
import { PagesUsuarioComponent } from "@app/components/usuario/pages-usuario.component";

@NgModule({
	imports: [SharedModule, UsuarioRoutingModule],
	exports: [],
	declarations: [PagesUsuarioComponent, AddUsuarioComponent, ListUsuariosComponent, UpdateUsuarioComponent, ListUsuarioComponent]
})
export class UsuarioModule {}
