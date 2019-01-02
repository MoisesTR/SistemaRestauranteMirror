import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import swal from 'sweetalert2';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Rx';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {Utils} from '../../Utils';
import {Proveedor} from '../../../models/Proveedor';
import {DataTableDirective} from 'angular-datatables';
import {ProveedorService} from '../../../services/shared/proveedor.service';
import {idioma_espanol} from '../../../services/shared/global';
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
    formUpdateProveedor: FormGroup;

    constructor(private _route: ActivatedRoute
        , private _router: Router
        , private _proveedorService: ProveedorService
        , private _formBuilderProveedor: FormBuilder

    ) {

        this.proveedorSeleccionado = new Proveedor();
    }


    ngOnInit() {
        $(document).ready(function() {

            $(".letras").keypress(function (key) {
                if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas
                    && (key.charCode < 65 || key.charCode > 90) //letras minusculas
                    && (key.charCode != 45) //retroceso
                    && (key.charCode != 241) //ñ
                    && (key.charCode != 209) //Ñ
                    && (key.charCode != 32) //espacio
                    && (key.charCode != 225) //á
                    && (key.charCode != 233) //é
                    && (key.charCode != 237) //í
                    && (key.charCode != 243) //ó
                    && (key.charCode != 250) //ú
                    && (key.charCode != 193) //Á
                    && (key.charCode != 201) //É
                    && (key.charCode != 205) //Í
                    && (key.charCode != 211) //Ó
                    && (key.charCode != 218) //Ú

                )
                    return false;
            });

        });

        this.settingsDatatable();
        this.getProveedores();
        this.initFormAdd();
        this.initFormUpdate();
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

    private initFormUpdate() {
        this.formUpdateProveedor = this._formBuilderProveedor.group({
            'nombreProveedor': new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100),
                CustomValidators.nospaceValidator
            ])
            , 'descripcionProveedor': new FormControl('',
                [
                    Validators.maxLength(400)
                ])
            , 'email': new FormControl('', [
                Validators.minLength(5),
                Validators.maxLength(200),
                CustomValidators.nospaceValidator
            ])
            , 'direccionProveedor': new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(400),
                CustomValidators.nospaceValidator
            ])
            , 'nombreRepresentante': new FormControl('',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(200),
                    CustomValidators.nospaceValidator
                ])
            , 'telefonoProveedor': new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(10),
                CustomValidators.nospaceValidator
            ])

        });
    }

    initFormAdd() {
        this.formAddProveedor = this._formBuilderProveedor.group({
            'nombreProveedor': new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100),
                CustomValidators.nospaceValidator
            ])
            , 'descripcionProveedor': new FormControl('',
                [
                    Validators.maxLength(400)
                ])
            , 'email': new FormControl('', [
                Validators.minLength(5),
                Validators.maxLength(200),
                CustomValidators.nospaceValidator
            ])
            , 'direccionProveedor': new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(400),
                CustomValidators.nospaceValidator
            ])
            , 'nombreRepresentante': new FormControl('',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(200),
                    CustomValidators.nospaceValidator
                ])
            , 'telefonoProveedor': new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(10),
                CustomValidators.nospaceValidator
            ])

        });
    }

    showModalTelefonos (proveedor: Proveedor) {
        this.proveedorSeleccionado = proveedor;
        this.modalTelefonos.show();
    }
}