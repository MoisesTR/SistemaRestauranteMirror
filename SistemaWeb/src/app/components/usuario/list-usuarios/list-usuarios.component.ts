import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../../services/usuario.service";
import {TrabajadorService} from "../../../services/trabajador.service";
import {Usuario} from "../../../models/Usuario";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs/Subject";
import {idioma_espanol} from "../../../services/global";
import {Utilidades} from '../../Utilidades';
import swal from "sweetalert2";

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {

  public usuarios : Usuario[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  public tituloPantalla : string = 'Usuario';

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _usuarioService : UsuarioService
    , private _trabajadorService : TrabajadorService
  ) { }

  ngOnInit() {
   this.settingsDatatable();
   this.getUsuarios();

  }

 settingsDatatable() {

    /*PROPIEDADES GENERALES DE LA DATATABLE*/
    this.dtOptions = <DataTables.Settings>{
        pagingType: 'full_numbers'
        , pageLength: 10
        , language: idioma_espanol
        , 'lengthChange': false
        , responsive: true
        , dom: 'Bfrtip',
        buttons: [
            {
                text: 'Agregar',
                key: '1',
                className: 'btn orange-chang float-right-dt',
                action: (e, dt, node, config) => {
                    this._router.navigate(['usuario/add']);
                }
            }
        ]
    };
 }

 rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
    });
  }


  getUsuarios(){
    this._usuarioService.getUsuarios().subscribe(
      response =>{
        if(response.usuarios){
          this.usuarios = response.usuarios;
          this.dtTrigger.next();
        }
      },error =>{

      }
    )
  }

  getUsuariosRender(){
    this._usuarioService.getUsuarios().subscribe(
        response =>{
            if(response.usuarios){
                this.usuarios = response.usuarios;
                this.rerender();
            }
        },error =>{
            Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
        }
    )
  }


  deleteUser(IdUsuario){
      swal({
          title: "Estas seguro(a)?",
          text: "El usuario sera eliminado!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Eliminalo!'
      }).catch(swal.noop).then((eliminar) => {
          if (eliminar) {
              this._usuarioService.deleteUsuario(IdUsuario).subscribe(
                  response =>{
                      if(response.success){
                          swal(
                              'Eliminado!',
                              'El usuario ha sido eliminado exitosamente',
                              'success'
                          ).then(() => {
                              this.getUsuariosRender();
                          })
                      } else {
                          Utilidades.showMsgInfo('Ha ocurrido un error en la eliminación, intentalo nuevamente',this.tituloPantalla);
                      }
                  }, error =>{
                      Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
                  }
              )

          }
      });
  }
}
