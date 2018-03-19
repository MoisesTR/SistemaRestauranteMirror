import {Component, OnInit, ViewChild} from '@angular/core';
import {ClasificacionProductoService} from '../../services/clasificacion-producto.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClasificacionProducto} from '../../models/ClasificacionProducto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Rx';
import swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import {idioma_espanol} from '../../services/global';
import {CustomValidators} from '../../validadores/CustomValidators';

declare var $:any;

@Component({
  selector: 'app-clasificacion-producto',
  templateUrl: './clasificacion-producto.component.html',
  styleUrls: ['./clasificacion-producto.component.css'],
  providers: [ClasificacionProductoService]
})
export class ClasificacionProductoComponent implements OnInit {

  public clasificacion : ClasificacionProducto;
  public clasificaciones: ClasificacionProducto[];

  public formAddClasificacion: FormGroup;
  public formUpdateClasificacion: FormGroup;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _clasificacionService : ClasificacionProductoService
    , private formBuilderClasificacion : FormBuilder
  ) {
    this.initConstructorClasificacion();

  }

  ngOnInit() {

    this.dtOptions = <DataTables.Settings>{
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , 'lengthChange': false
      , responsive : true
    };

    this._clasificacionService.getClasificaciones().subscribe(
      response => {
        if(response.clasificaciones){
          this.clasificaciones = response.clasificaciones;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );

    this.initFormAddClasificacion();
    this.initFormUpdateClasificacion();

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  private initConstructorClasificacion() {
    this.clasificacion = new ClasificacionProducto();
  }

  createClasificacion(){

    this.clasificacion.DescripcionClasificacion = this.formAddClasificacion.value.descripcionClasificacion;
    this.clasificacion.NombreClasificacion = this.formAddClasificacion.value.nombreClasificacion;

    this._clasificacionService.createClasificacionProducto(this.clasificacion).subscribe(
      response =>{

        if(response.IdClasificacion){
          swal(
            'Clasificación',
            'La clasificación ha sido creada exitosamente!',
            'success'
          ).then(() => {
            $('#modalAddClasificacion').modal('toggle');
            this.formAddClasificacion.reset();
            this.clasificacion = new ClasificacionProducto();
            this.getClasificacionesRender();
          })
        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar la categoria, intenta nuevamente!',
            'error'
          )
        }
      },
      error=>{
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
    this.formAddClasificacion.reset;
    console.log(this.clasificacion.DescripcionClasificacion + this.clasificacion.NombreClasificacion);

  }

  getClasificacion(){

      this._clasificacionService.getClasificaciones().subscribe(
        response => {
          if(response.clasificaciones){
            this.clasificaciones= response.clasificaciones;
            this.dtTrigger.next();
          }
        }, error =>{

        }
      );
    }

  getClasificacionesRender(){
    this._clasificacionService.getClasificaciones().subscribe(
      response => {
        if(response.clasificaciones){
          this.clasificaciones = response.clasificaciones;
          this.rerender();
        }
      }, error =>{

      }
    );
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddClasificacion(){

    this.formAddClasificacion = this.formBuilderClasificacion.group({
      'nombreClasificacion': new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(100)
        , CustomValidators.espaciosVacios
      ])
      , 'descripcionClasificacion': new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(300)
        , CustomValidators.espaciosVacios
      ])
    });

  }

  initFormUpdateClasificacion(){

    this.formUpdateClasificacion = this.formBuilderClasificacion.group({
      'nombreClasificacion': new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(100)
        , CustomValidators.espaciosVacios
      ])
      , 'descripcionClasificacion': new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(300)
        , CustomValidators.espaciosVacios
      ])
    });
  }

  showModalUpdateClasificacion(clasificacion){

    $('#modalUpdateClasificacion').modal('show');

    this.clasificacion.IdClasificacion = clasificacion.IdClasificacion;
    this.clasificacion.NombreClasificacion = clasificacion.NombreClasificacion;
    this.clasificacion.DescripcionClasificacion = clasificacion.DescripcionClasificacion;

    this.formUpdateClasificacion.reset();
    this.formUpdateClasificacion.setValue({
      nombreClasificacion: clasificacion.NombreClasificacion
      , descripcionClasificacion: clasificacion.DescripcionClasificacion
    });


  }

  createClasificacionProducto(){
    this.getValuesFormAddClasificacion();

    this._clasificacionService.createClasificacionProducto(this.clasificacion).subscribe(
      response => {

        if (response.IdClasficcacion) {

          swal(
            'Clasificacion',
            'La clasificación ha sido creada exitosamente!',
            'success'
          ).then(() => {
            $('#modalAddClasificacion').modal('toggle');
            this.formAddClasificacion.reset();
            this.clasificacion = new ClasificacionProducto();
            this.getClasificacionesRender();
          })

        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar la clasificacion, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');

        }
        this.getClasificacion();
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

  getClasificacionProducto(IdClasificacion){

    this._clasificacionService.getClasificacionProducto(IdClasificacion).subscribe(
      response => {

        if(!response.clasificacion){

        } else {
          this.clasificacion = response.clasificacion;
        }
      },error => {
        console.log(<any>error);
      }
    )
  }

  getClasificaciones(){
    this._clasificacionService.getClasificaciones().subscribe(
      response => {

        if(!response.clasificaciones){
          console.log('Ha ocurrido un error');
        } else {
          this.clasificaciones = response.clasificaciones;
        }
      },error => {
        console.log(<any>error);
    }
    )
  }

  updateClasificacion(){

    this.getValuesFormUpdateClasificacion();

    this._clasificacionService.updateClasificacionProducto(this.clasificacion).subscribe(
      response =>{
        if(response.success){
          swal(
            'Clasificación',
            'La clasificación ha sido actualizada exitosamente!',
            'success'
          ).then(() => {
            $('#modalUpdateClasificacion').modal('toggle');
            this.formUpdateClasificacion.reset();
            this.getClasificacionesRender();
          })


        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error en la actualización, intenta nuevamente!',
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

    this.clasificacion = new ClasificacionProducto();

  }

  getValuesFormAddClasificacion(){

    this.clasificacion.NombreClasificacion = this.formAddClasificacion.value.nombreClasificacion;
    this.clasificacion.DescripcionClasificacion = this.formAddClasificacion.value.descripcionClasificacion;

  }

  getValuesFormUpdateClasificacion(){

    this.clasificacion.NombreClasificacion= this.formUpdateClasificacion.value.nombreClasificacion;
    this.clasificacion.DescripcionClasificacion = this.formUpdateClasificacion.value.descripcionClasificacion;
  }

  deleteClasificacion(IdClasificacion){

    swal({
      title: "Estas seguro(a)?",
      text: "La clasificacion sera eliminada permanentemente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!'
    }).catch(swal.noop).then((eliminar) => {
      if (eliminar) {
        this._clasificacionService.deleteClasificacionProducto(IdClasificacion).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminada!',
                'La clasificacion ha sido eliminada exitosamente',
                'success'
              ).then(() => {
               this.getClasificacionesRender();
              })
            } else {
              swal(
                'Error inesperado',
                'Ha ocurrido un error en la eliminación, intenta nuevamente!',
                'error'
              )
            }
          }, error =>{
            if(error.status = 500){
              swal(
                'Error inesperado',
                'Ha ocurrido un error en el servidor, intenta nuevamente!',
                'error'
              )
            }
          }
        )

      }
    });

  }


  cleanAddForm(){
    this.formAddClasificacion.reset();
  }

}
