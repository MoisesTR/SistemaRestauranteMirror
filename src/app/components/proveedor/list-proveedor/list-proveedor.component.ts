import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import swal from 'sweetalert2';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Rx';
import {Utils} from '../../Utils';
import {Proveedor} from '@app/models/Proveedor';
import {DataTableDirective} from 'angular-datatables';
import {ProveedorService} from '@app/services/service.index';
import {idioma_espanol} from '@app/services/shared/global';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ng-uikit-pro-standard';

declare var $:any;
@Component({
  selector: 'list-proveedor',
  templateUrl: './list-proveedor.component.html',
  styleUrls: ['./list-proveedor.component.scss']
})
export class ListProveedorComponent implements OnInit, AfterViewInit {

    @ViewChild('modalTelefonos') modalTelefonos: ModalDirective;
    public proveedorSeleccionado: Proveedor;
    public proveedores: Proveedor[];
    public tituloPantalla = 'Proveedor';

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

    formAddProveedor: FormGroup;

    constructor(private _route: ActivatedRoute
        , private _router: Router
        , private _proveedorService: ProveedorService

    ) {
        this.proveedorSeleccionado = new Proveedor();
    }

    ngOnInit() {
        this.settingsDatatable();
        this.getProveedores();
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
                        this._router.navigate(['proveedor/add']);
                    }
                }
            ]
        };
    }

    ngAfterViewInit(): void {
        this.dtTrigger.next();
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
        });
    }

    getProveedores() {
        this._proveedorService.getProveedores().subscribe(
            response => {
                if (response.proveedores) {
                    this.proveedores = response.proveedores;
                    this.rerender();
                }
            }, error => {
            }
        );

    }

    deleteProveedor(IdProveedor) {
        swal({
            title: 'Estas seguro(a)?',
            text: 'El proveedor sera eliminado permanentemente!',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminalo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this._proveedorService.deleteProveedor(IdProveedor).subscribe(
                    response => {
                        if (response.success) {
                            swal(
                                'Eliminado!',
                                'El proveedor ha sido eliminado exitosamente',
                                'success'
                            ).then( () => {
                                this.formAddProveedor.reset();
                                this.getProveedores();
                            });
                        } else {
                            Utils.showMsgInfo('Ha ocurrido un error, intenta nuevamente', this.tituloPantalla);
                        }
                    }, error => {
                        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
                    }
                );
            } else if (result.dismiss === swal.DismissReason.cancel) {}
        });
    }


    showModalTelefonos (proveedor: Proveedor) {
        this.proveedorSeleccionado = proveedor;
        this.modalTelefonos.show();
    }
}
