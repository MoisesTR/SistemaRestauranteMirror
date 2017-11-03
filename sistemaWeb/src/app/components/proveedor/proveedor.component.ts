import {Component, OnInit, ViewChild} from '@angular/core';
import {ProveedorService} from '../../services/proveedor.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Provedor} from "../../models/Provedor";
import {idioma_espanol} from "../../services/global";
import { Subject } from 'rxjs/Rx';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from "angular-datatables";
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
  myForm: FormGroup;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _proveedorService: ProveedorService) {
    this.proveedor = new Provedor(null, null, null, null, null, null, null, null);
  }


  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      /*select: true*/
    };

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

    this.myForm = new FormGroup({
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
            'Producto',
            'El producto ha sido creado exitosamente!',
            'success'
          ).then(function () {
            $('#modalingresarproveedor').modal('toggle');
            this.myForm.reset();
          })
          this.listarProveedores();

        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar el producto, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');

        }
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
  }

  capturarDadosProveedor() {
    this.proveedor.NombreProveedor = this.myForm.value.nombreProveedor;
    this.proveedor.NombreRepresentante = this.myForm.value.nombreRepresentante;
    this.proveedor.Descripcion = this.myForm.value.descripcionProveedor;
    this.proveedor.Direccion = this.myForm.value.direccionProveedor;
    this.proveedor.Telefono = this.myForm.value.telefonoProveedor;
    this.proveedor.Email = this.myForm.value.correoProveedor;
  }

  getProveedor() {

  }

  getProveedores() {

  }

  updateProveedor() {
    $('#modalingresarproveedor').modal('show');
    this.myForm.setValue({
      'nombreProveedor': 'asdasd'
    })
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

            } else {
              console.log('Ha ocurrido un error, intenta nuevamente')
            }
          }, error =>{
              if(error.status = 500){
                console.log('Ha ocurrido un error en el servidor')
              }
          }
        )
        swal(
          'Eliminado!',
          'El proveedor ha sido eliminado exitosamente',
          'success'
        ).then(function () {
          this.myForm.reset();
          this.listarProveedores();
        })
      }
    });
  }

}
