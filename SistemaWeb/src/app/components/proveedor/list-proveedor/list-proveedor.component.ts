import {Component, OnInit, ViewChild} from '@angular/core';
import swal from 'sweetalert2';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Rx';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {Utilidades} from '../../Utilidades';
import {Proveedor} from '../../../models/Proveedor';
import {DataTableDirective} from 'angular-datatables';
import {ProveedorService} from '../../../services/proveedor.service';
import {idioma_espanol} from '../../../services/global';
import {ActivatedRoute, Router} from '@angular/router';
declare var $:any;
@Component({
  selector: 'list-proveedor',
  templateUrl: './list-proveedor.component.html',
  styleUrls: ['./list-proveedor.component.scss']
})
export class ListProveedorComponent implements OnInit {

    public proveedor: Proveedor;
    public proveedores: Proveedor[];
    public tituloPantalla : string = 'Proveedor';

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();

    formAddProveedor: FormGroup;
    formUpdateProveedor: FormGroup;

    constructor(private _route: ActivatedRoute
        , private _router: Router
        , private _proveedorService: ProveedorService
        , private _formBuilderProveedor  : FormBuilder

    ) {

        this.proveedor = new Proveedor();
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
        this.initFormUpdate()

        $('.telefono').mask('0000-0000');
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
                        this._router.navigate(['proveedor/add'])
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

    createProveedor(Modal) {

        this.capturarDadosProveedor();
        this._proveedorService.createProveedor(this.proveedor).subscribe(
            response => {

                if (response.IdProveedor) {
                    swal(
                        'Proveedor',
                        'El proveedor ha sido creado exitosamente!',
                        'success'
                    ).then(() => {
                        Modal.hide();
                        this.formAddProveedor.reset();
                        this.getProveedores();
                        this.proveedor = new Proveedor();
                    })

                } else {
                    Utilidades.showMsgInfo('Ha ocurrido un error al insertar el proveedor, intentalo nuevamente',this.tituloPantalla);
                }
            }, error => {
                Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);

            }
        )

    }

    capturarDadosProveedor() {
        this.proveedor.NombreProveedor = this.formAddProveedor.value.nombreProveedor;
        this.proveedor.NombreRepresentante = this.formAddProveedor.value.nombreRepresentante;
        this.proveedor.Descripcion = this.formAddProveedor.value.descripcionProveedor;
        this.proveedor.Direccion = this.formAddProveedor.value.direccionProveedor;
        this.proveedor.Telefono = this.formAddProveedor.value.telefonoProveedor.toString().replace("-","");
        this.proveedor.Retencion2 = 1;
        this.proveedor.Email = this.formAddProveedor.value.email;
    }

    capturarDatosActualizados(){
        this.proveedor.NombreProveedor = this.formUpdateProveedor.value.nombreProveedor;
        this.proveedor.NombreRepresentante = this.formUpdateProveedor.value.nombreRepresentante;
        this.proveedor.Descripcion = this.formUpdateProveedor.value.descripcionProveedor;
        this.proveedor.Direccion = this.formUpdateProveedor.value.direccionProveedor;
        this.proveedor.Telefono = this.formUpdateProveedor.value.telefonoProveedor.toString().replace("-","");
        this.proveedor.Retencion2 = 1;
        this.proveedor.Email = this.formUpdateProveedor.value.email;

    }
    updateProveedor(Modal) {

        this.capturarDatosActualizados();
        this._proveedorService.updateProveedor(this.proveedor).subscribe(
            response =>{
                if(response.success){
                    swal(
                        'Proveedor',
                        'El proveedor ha sido actualizado exitosamente!',
                        'success'
                    ).then( () => {
                        Modal.hide();
                        this.formUpdateProveedor.reset();
                        this.getProveedores();
                    })
                } else {
                    Utilidades.showMsgInfo('Ha ocurrido un error al actualizar',this.tituloPantalla);
                }
            }, error =>{
                Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);

            }
        )

        this.proveedor = new Proveedor();

    }

    deleteProveedor(IdProveedor) {
        swal({
            title: "Estas seguro(a)?",
            text: "El proveedor sera eliminado permanentemente!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminalo!'
        }).catch(swal.noop).then((eliminar) => {
            if (eliminar) {
                this._proveedorService.deleteProveedor(IdProveedor).subscribe(
                    response =>{
                        if(response.success){
                            swal(
                                'Eliminado!',
                                'El proveedor ha sido eliminado exitosamente',
                                'success'
                            ).then( () => {
                                this.formAddProveedor.reset();
                                this.getProveedores();
                            })
                        } else {
                            console.log('Ha ocurrido un error, intenta nuevamente')
                        }
                    }, error =>{
                        Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
                    }
                )

            }
        });
    }

    private initFormUpdate() {
        this.formUpdateProveedor = this._formBuilderProveedor.group({
            'nombreProveedor': new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100),
                CustomValidators.espaciosVacios
            ])
            , 'descripcionProveedor': new FormControl('',
                [
                    Validators.maxLength(400)
                ])
            , 'email': new FormControl('',[
                Validators.minLength(5),
                Validators.maxLength(200),
                CustomValidators.espaciosVacios
            ])
            , 'direccionProveedor': new FormControl('',[
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(400),
                CustomValidators.espaciosVacios
            ])
            , 'nombreRepresentante': new FormControl('',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(200),
                    CustomValidators.espaciosVacios
                ])
            , 'telefonoProveedor': new FormControl('',[
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(10),
                CustomValidators.espaciosVacios
            ])

        });
    }

    initFormAdd(){
        this.formAddProveedor = this._formBuilderProveedor.group({
            'nombreProveedor': new FormControl('', [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(100),
                CustomValidators.espaciosVacios
            ])
            , 'descripcionProveedor': new FormControl('',
                [
                    Validators.maxLength(400)
                ])
            , 'email': new FormControl('',[
                Validators.minLength(5),
                Validators.maxLength(200),
                CustomValidators.espaciosVacios
            ])
            , 'direccionProveedor': new FormControl('',[
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(400),
                CustomValidators.espaciosVacios
            ])
            , 'nombreRepresentante': new FormControl('',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(200),
                    CustomValidators.espaciosVacios
                ])
            , 'telefonoProveedor': new FormControl('',[
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(10),
                CustomValidators.espaciosVacios
            ])

        });
    }


    invocarModalUpdate(Modal,Proveedor : Proveedor){

        this.formUpdateProveedor.reset();

        this.proveedor.IdProveedor = Proveedor.IdProveedor;
        this.proveedor.NombreProveedor = Proveedor.NombreProveedor;
        this.proveedor.Descripcion = Proveedor.Descripcion;
        this.proveedor.Direccion = Proveedor.Direccion;
        this.proveedor.NombreRepresentante = Proveedor.NombreRepresentante;
        this.proveedor.Telefono = Proveedor.Telefono;
        this.proveedor.Email = Proveedor.Email;

        this.formUpdateProveedor.setValue({
            nombreProveedor: Proveedor.NombreProveedor
            , descripcionProveedor: Proveedor.Descripcion
            , email: Proveedor.Email
            , direccionProveedor: Proveedor.Direccion
            , nombreRepresentante: Proveedor.NombreRepresentante
            , telefonoProveedor:  Proveedor.Telefono
        })

    }

}
