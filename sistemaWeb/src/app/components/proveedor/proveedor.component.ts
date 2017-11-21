import {Component, OnInit, ViewChild} from '@angular/core';
import {ProveedorService} from '../../services/proveedor.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Provedor} from "../../models/Provedor";
import {idioma_espanol} from "../../services/global";
import { Subject } from 'rxjs/Rx';
import {FormGroup, FormControl, FormArray, NgForm, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from "angular-datatables";
import {CustomValidators} from "../../validadores/CustomValidators";
declare var $:any;

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  providers: [ProveedorService]
})
export class ProveedorComponent implements OnInit {

  public proveedor: Provedor;
  public proveedores: Provedor[];
  public mensaje: string;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  addForm: FormGroup;
  updateForm: FormGroup;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _proveedorService: ProveedorService) {

    this.proveedor = new Provedor(null, null, null, null, null, null, null, null);
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

    this.dtOptions = {
      autoWidth : false
      , pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      , searching: true
      , ordering:  true


      /*select: true*/
    };
    $('.telefono').mask('0000-0000');
    this.listarProveedores();

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

  listarProveedores() {

    this._proveedorService.getProveedores().subscribe(
      response => {
        if (response.proveedores) {
          this.proveedores = response.proveedores;
          this.rerender();
        }
      }, error => {

      }
    );

    this.addForm = new FormGroup({
      'nombreProveedor': new FormControl()
      , 'descripcionProveedor': new FormControl()
      , 'correoProveedor': new FormControl('',[Validators.required])
      , 'direccionProveedor': new FormControl()
      , 'nombreRepresentante': new FormControl('',
                              [
                                Validators.required,
                                Validators.minLength(5),
                                Validators.maxLength(10),
                                CustomValidators.espaciosVacios
                              ])
      , 'telefonoProveedor': new FormControl('',[Validators.required])

    });

    this.updateForm = new FormGroup({
      'nombreProveedor': new FormControl()
      , 'descripcionProveedor': new FormControl()
      , 'correoProveedor': new FormControl()
      , 'direccionProveedor': new FormControl()
      , 'nombreRepresentante': new FormControl()
      , 'telefonoProveedor': new FormControl()

    });



  }

  createProveedor(myForm: NgForm) {

    this.capturarDadosProveedor();
    this._proveedorService.createProveedor(this.proveedor).subscribe(
      response => {

        if (response.IdProveedor) {

          swal(
            'Proveedor',
            'El proveedor ha sido creado exitosamente!',
            'success'
          ).then(function () {
            $('#modalingresarproveedor').modal('toggle');

            this.addForm.reset();
          })


        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar el producto, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');

        }
        this.listarProveedores();
      }, error => {
        if (error.status == 500) {
          swal(
            'Error inesperado',
            'Ha ocurrido un error en el servidor, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');
        }

      }
    )
    this.proveedor = new Provedor(null,null, null, null, null, null, null, null);
  }

  capturarDadosProveedor() {
    this.proveedor.NombreProveedor = this.addForm.value.nombreProveedor;
    this.proveedor.NombreRepresentante = this.addForm.value.nombreRepresentante;
    this.proveedor.Descripcion = this.addForm.value.descripcionProveedor;
    this.proveedor.Direccion = this.addForm.value.direccionProveedor;
    this.proveedor.Telefono = this.addForm.value.telefonoProveedor;
    this.proveedor.Email = this.addForm.value.correoProveedor;
  }

  capturarDatosActualizados(){
    this.proveedor.NombreProveedor = this.updateForm.value.nombreProveedor;
    this.proveedor.NombreRepresentante = this.updateForm.value.nombreRepresentante;
    this.proveedor.Descripcion = this.updateForm.value.descripcionProveedor;
    this.proveedor.Direccion = this.updateForm.value.direccionProveedor;
    this.proveedor.Telefono = this.updateForm.value.telefonoProveedor;
    this.proveedor.Email = this.updateForm.value.correoProveedor;
  }

  getProveedorById(IdProveedor) {

  }


  showModalUpdateProveedor(proveedor){

    $('#modalUpdateProveedor').modal('show');
    let Proveedor : Provedor;
    Proveedor = proveedor;

    this.proveedor.IdProveedor = proveedor.IdProveedor;

    this.updateForm.reset();
    this.updateForm.setValue({
      nombreProveedor: Proveedor.NombreProveedor
      , descripcionProveedor: Proveedor.Descripcion
      , correoProveedor: Proveedor.Email
      , direccionProveedor: Proveedor.Direccion
      , nombreRepresentante: Proveedor.NombreRepresentante
      , telefonoProveedor: '87792956'
    })

  }
  updateProveedor(myForm: NgForm) {

    this.capturarDatosActualizados();
    this._proveedorService.updateProveedor(this.proveedor).subscribe(
      response =>{
        if(response.success){
          swal(
            'Proveedor',
            'El proveedor ha sido actualizado exitosamente!',
            'success'
          ).then(function () {
            $('#modalUpdateProveedor').modal('toggle');

            this.addForm.reset();
          })


        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error en la actualizacion, intenta nuevamente!',
            'error'
          )
        }
      }, error =>{
        if (error.status == 500) {
          swal(
            'Error inesperado',
            'Ha ocurrido un error en el servidor, intenta nuevamente!',
            'error'
          )
        }
      }
    )

    this.proveedor = new Provedor(null, null, null, null, null, null, null, null);

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
    }).then((eliminar) => {
      if (eliminar) {
        this._proveedorService.deleteProveedor(IdProveedor).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminado!',
                'El proveedor ha sido eliminado exitosamente',
                'success'
              ).then(function () {
                /*this.addForm.reset();
                this.listarProveedores();*/
              })
            } else {
              console.log('Ha ocurrido un error, intenta nuevamente')
            }
          }, error =>{
              if(error.status = 500){
                console.log('Ha ocurrido un error en el servidor')
              }
          }
        )

      }
    });
  }

}
