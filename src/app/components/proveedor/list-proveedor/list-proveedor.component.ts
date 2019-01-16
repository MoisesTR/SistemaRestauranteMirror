import {AfterViewInit, Component, OnInit, ViewChild,ChangeDetectionStrategy,ChangeDetectorRef} from '@angular/core';
import swal from 'sweetalert2';
import {FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Rx';
import {Utils} from '../../Utils';
import {Proveedor} from '@app/models/Proveedor';
import {DataTableDirective} from 'angular-datatables';
import {ProveedorService} from '@app/core/service.index';
import {idioma_espanol} from '@app/core/services/shared/global';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ng-uikit-pro-standard';

declare var $:any;
@Component({
  selector: 'list-proveedor',
  templateUrl: './list-proveedor.component.html',
  styleUrls: ['./list-proveedor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListProveedorComponent implements OnInit{

    @ViewChild('modalTelefonos') modalTelefonos: ModalDirective;
    public proveedorSeleccionado: Proveedor;
    public proveedores: Proveedor[];
    public tituloPantalla = 'Proveedor';
    private renderizarProductos:boolean = false;

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

    formAddProveedor: FormGroup;

    constructor(private _route: ActivatedRoute
        , private _router: Router
        , private _proveedorService: ProveedorService
        , private cdr: ChangeDetectorRef

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

   /** ngAfterViewInit(): void {
        this.dtTrigger.next();
        implementarlo en la clase cuando se descomente  
   }**/

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
            this.cdr.detectChanges();
        });
    }

    getProveedores() {
        this._proveedorService.getProveedores().subscribe(
            response => {
                if (response.proveedores) {
                    this.proveedores = response.proveedores;
                    //this.rerender();
                    if(this.renderizarProductos === true){
                        this.rerender();
                    }else{
                        this.dtTrigger.next();
                        this.cdr.markForCheck();
                    }
                    
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
                                //this.formAddProveedor.reset();
                                this.renderizarProductos = true;
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
