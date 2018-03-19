import {Component, OnInit, ViewChild} from '@angular/core';
import {ProveedorService} from '../../services/proveedor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Provedor} from '../../models/Provedor';
import {Subject} from 'rxjs/Rx';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import {CustomValidators} from '../../validadores/CustomValidators';
import {idioma_espanol} from '../../services/global';

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

  constructor(private _route: ActivatedRoute
              , private _router: Router
              , private _proveedorService: ProveedorService
              , private _formBuilderProveedor  : FormBuilder

  ) {

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

    this.dtOptions = <DataTables.Settings>{
      autoWidth: false
      , pagingType: 'full_numbers'
      , pageLength: 10
      , 'lengthChange': false
      , searching: true
      , ordering: true
      , language: idioma_espanol
      , responsive : true
    };
    $('.telefono').mask('0000-0000');

    this.getProveedores();
    this.initFormAdd();
    this.initFormUpdate()

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

  createProveedor() {

    this.capturarDadosProveedor();
    this._proveedorService.createProveedor(this.proveedor).subscribe(
      response => {

        if (response.IdProveedor) {

          swal(
            'Proveedor',
            'El proveedor ha sido creado exitosamente!',
            'success'
          ).then(() => {
            $('#modalingresarproveedor').modal('toggle');
            this.addForm.reset();
            this.getProveedores();
          })

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

    console.log(this.proveedor)
  }

  showModalUpdateProveedor(proveedor){

    $('#modalUpdateProveedor').modal('show');
    this.updateForm.reset();

    this.proveedor.IdProveedor = proveedor.IdProveedor;
    this.proveedor.NombreProveedor = proveedor.NombreProveedor;
    this.proveedor.Descripcion = proveedor.Descripcion;
    this.proveedor.Direccion = proveedor.Direccion;
    this.proveedor.NombreRepresentante = proveedor.NombreRepresentante;
    this.proveedor.Telefono = proveedor.Telefono;
    this.proveedor.Email = proveedor.Email;

    this.updateForm.setValue({
      nombreProveedor: proveedor.NombreProveedor
      , descripcionProveedor: proveedor.Descripcion
      , correoProveedor: proveedor.Email
      , direccionProveedor: proveedor.Direccion
      , nombreRepresentante: proveedor.NombreRepresentante
      , telefonoProveedor: proveedor.Telefono == null ? '' : proveedor.Telefono
      , email : proveedor.Email
    })

  }
  updateProveedor() {

    this.capturarDatosActualizados();
    this._proveedorService.updateProveedor(this.proveedor).subscribe(
      response =>{
        if(response.success){
          swal(
            'Proveedor',
            'El proveedor ha sido actualizado exitosamente!',
            'success'
          ).then( () => {
            $('#modalUpdateProveedor').modal('toggle');
            this.updateForm.reset();
            this.getProveedores();
          })
        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error en la actualizacion, intenta nuevamente!',
            'error'
          )
        }
      }, error =>{
        console.log(error)
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
                this.addForm.reset();
                this.getProveedores();
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

  private initFormUpdate() {
    this.updateForm = this._formBuilderProveedor.group({
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
      , 'correoProveedor': new FormControl('',[
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
      , 'email': new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        CustomValidators.espaciosVacios
      ])

    });
  }

  initFormAdd(){
    this.addForm = this._formBuilderProveedor.group({
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
      , 'correoProveedor': new FormControl('',[
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
}
