import { Component, OnInit, ViewChild } from '@angular/core';
import {ClasificacionProductoService} from '../../services/clasificacion-producto.service';
import {ActivatedRoute, Router} from "@angular/router";
import {ClasificacionProducto} from "../../models/ClasificacionProducto";
import {FormGroup, FormControl, FormArray, NgForm, Validators} from '@angular/forms';
import { Subject } from 'rxjs/Rx';
import swal from 'sweetalert2';
import {DataTableDirective} from "angular-datatables";
import {idioma_espanol} from "../../services/global";
declare var $:any;

@Component({
  selector: 'app-clasificacion-producto',
  templateUrl: './clasificacion-producto.component.html',
  styleUrls: ['./clasificacion-producto.component.css'],
  providers: [ClasificacionProductoService]
})
export class ClasificacionProductoComponent implements OnInit {

  @ViewChild('formClasificacion') formClasificacion: NgForm;


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
    private _route: ActivatedRoute,
    private _router: Router,
    private _clasificacionService : ClasificacionProductoService
  ) {
    this.initConstructorClasificacion();
  }

  ngOnInit() {


    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      /*,select: true*/
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
    this.clasificacion = new ClasificacionProducto(null,null,null,null);
  }

  createClasificacion(myForm: NgForm){


    this.clasificacion.DescripcionClasificacion = this.formClasificacion.value.descripcion;
    this.clasificacion.NombreClasificacion = this.formClasificacion.value.nombre;
    this.formClasificacion.reset;

    this._clasificacionService.createClasificacionProducto(this.clasificacion).subscribe(
      response =>{

        if(response.IdClasificacion){
          console.log('Creado con exito');
        }
      },
      error=>{

      }
    )

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

    this.formAddClasificacion = new FormGroup({
      'nombreClasificacion': new FormControl()
      , 'descripcionClasificacion': new FormControl()
    });

  }

  initFormUpdateClasificacion(){

    this.formUpdateClasificacion = new FormGroup({
      'nombreClasificacion': new FormControl()
      , 'descripcionClasificacion': new FormControl()
    });
  }

  getValuesFormAddClasificacion(){

    this.clasificacion.NombreClasificacion = this.formAddClasificacion.value.nombreClasificacion;
    this.clasificacion.DescripcionClasificacion = this.formAddClasificacion.value.descripcionClasificacion;

  }

  getValuesFormUpdateClasificacion(){

    this.clasificacion.NombreClasificacion= this.formUpdateClasificacion.value.nombreClasificacion;
    this.clasificacion.DescripcionClasificacion = this.formUpdateClasificacion.value.descripcionClasificacion;
  }

  showModalUpdateClasificacion(clasificacion){

    $('#modalUpdateClasificacion').modal('show');
    let Clasificacion : ClasificacionProducto;
    Clasificacion = clasificacion;

    this.clasificacion.IdClasificacion = Clasificacion.IdClasificacion;

    this.formUpdateClasificacion.reset();
    this.formUpdateClasificacion.setValue({
      nombreClasificacion: Clasificacion.NombreClasificacion
      , descripcionClasificacion: Clasificacion.DescripcionClasificacion
    });


  }

  createClasificacionProducto(){
    this.getValuesFormAddClasificacion();

    this._clasificacionService.createClasificacionProducto(this.clasificacion).subscribe(
      response => {

        if (response.IdClasficcacion) {

          swal(
            'Clasificaciom',
            'La clasificacion ha sido creada exitosamente!',
            'success'
          ).then(() => {
            $('#modalAddClasificacion').modal('toggle');
            this.formAddClasificacion.reset();
            this.clasificacion = new ClasificacionProducto(null,null,null,null);
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

    this._clasificacionService.updateClasificacionProducto(this.clasificacion,ClasificacionProducto).subscribe(
      response =>{
        if(response.success){
          swal(
            'Clasificacion',
            'La clasificacion ha sido actualizada exitosamente!',
            'success'
          ).then(() => {
            $('#modalUpdateClasificacion').modal('toggle');
            this.formUpdateClasificacion.reset();
            this.getClasificacionesRender();
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

    this.clasificacion = new ClasificacionProducto(null, null, null, null);

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
    }).then((eliminar) => {
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




}
