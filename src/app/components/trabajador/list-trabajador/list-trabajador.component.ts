import {Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute, Router} from '@angular/router';
import {TrabajadorService} from '@app/core/service.index';
import {idioma_espanol} from '@app/core/services/shared/global';
import {Trabajador} from '@app/models/Trabajador';
import swal from 'sweetalert2';
import {Utils} from '../../Utils';

@Component({
  selector: 'app-list-trabajador',
  templateUrl: './list-trabajador.component.html',
  styleUrls: ['./list-trabajador.component.css']
})
export class ListTrabajadorComponent implements OnInit {

  public trabajador: Trabajador;
  public trabajadores: Trabajador[];
  public tituloPantalla = 'Trabajador';
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _trabajadorService: TrabajadorService
  ) { }

  ngOnInit() {
    this.settingsDatatable();
    this.getTrabajadores();
  }

  getTrabajadores() {

    this._trabajadorService.getTrabajadores().subscribe(
      response => {
        if (response.trabajadores) {
          this.trabajadores = response.trabajadores;
          this.dtTrigger.next();
        } else {

        }
      }, error => {

      }
    );
  }

  getTrabajadoresRender() {

      this._trabajadorService.getTrabajadores().subscribe(
          response => {
              if (response.trabajadores) {
                  this.trabajadores = response.trabajadores;
                  this.rerender();
              } else {

              }
          }, error => {

          }
      );
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
                      this._router.navigate(['trabajador/add']);
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


  deleteTrabajador(IdTrabajador) {
      swal({
          title: 'Estas seguro(a)?',
          text: 'El trabajador sera eliminado!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Eliminalo!',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
         if(result.value) {
             this._trabajadorService.deleteTrabajador(IdTrabajador).subscribe(
                 response => {
                     if (response.success) {
                         swal(
                             'Eliminado!',
                             'El trabajador ha sido eliminado exitosamente',
                             'success'
                         ).then(() => {
                             this.getTrabajadoresRender();
                         });
                     } else {
                         Utils.showMsgInfo('Ha ocurrido un error en la eliminación, intentalo nuevamente', this.tituloPantalla);
                     }
                 }, error => {
                     Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
                 }
             );
         }  else if (result.dismiss === swal.DismissReason.cancel) {}
      });
  }

}
