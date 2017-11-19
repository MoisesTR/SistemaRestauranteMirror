import {Component, OnInit, ViewChild} from '@angular/core';
import {SubClasificacionProductoService} from "../../services/sub-clasificacion-producto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubClasificacionProducto} from "../../models/SubClasificacionProducto";
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";
import {FormGroup, FormControl, FormArray, NgForm, Validators} from '@angular/forms';
import {DataTableDirective} from "angular-datatables";
import {CustomValidators} from "../../validadores/CustomValidators";
import swal from 'sweetalert2';
declare var $:any;


@Component({
  selector: 'app-sub-clasificacion-producto',
  templateUrl: './sub-clasificacion-producto.component.html',
  styleUrls: ['./sub-clasificacion-producto.component.css'],
  providers: [SubClasificacionProductoService]
})
export class SubClasificacionProductoComponent implements OnInit {

  public subclasificacion : SubClasificacionProducto;
  public subclasificaciones: SubClasificacionProducto[];
  public mensaje : string;

  @ViewChild(DataTableDirective)
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  dtElement: DataTableDirective;

  formAddSubClasificacion : FormGroup;
  formUpdateSubClasificacion: FormGroup;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _subClasificacionService : SubClasificacionProductoService
  ) {
    this.initConstructorSubClasificacion();
  }

  private initConstructorSubClasificacion(){
    this.subclasificacion = new SubClasificacionProducto(null,null,null,null,null);
  }

  ngOnInit() {
    this.dtOptions = {
      autoWidth : false
      , pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      , searching: true
      , ordering:  true
    };

    $(".selectclasificacion").select2({
      maximumSelectionLength: 1
    });

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

    this.listarSubclasificaciones();
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


  listarSubclasificaciones(){
    this._subClasificacionService.getSubClasificaciones().subscribe(
      response => {

        if(response.subclasificaciones){
          this.subclasificaciones = response.subclasificaciones;
          this.rerender();
        } else {

        }
      }, error => {

        if(error.status == 500){

        }
      }
    )

    this.formAddSubClasificacion  = new FormGroup({
        'nombreSubClasificacion' : new FormControl('',
          [
            Validators.required
            , Validators.minLength(5)
            , Validators.maxLength(1000)
            , CustomValidators.espaciosVacios
          ]
        ),

      'descripcionSubClasificacion' : new FormControl('',
        [
          Validators.required
          , Validators.min(5)
          , Validators.maxLength(300)
          , CustomValidators.espaciosVacios
        ]
        )
    })

    this.formUpdateSubClasificacion = new FormGroup({
      'nombreSubClasificacion' : new FormControl('',
        [
          Validators.required
          , Validators.minLength(5)
          , Validators.maxLength(1000)
          , CustomValidators.espaciosVacios
        ]
      ),

      'descripcionSubClasificacion' : new FormControl('',
        [
          Validators.required
          , Validators.min(5)
          , Validators.maxLength(300)
          , CustomValidators.espaciosVacios
        ]
      )
    })
  }

  showModalUpdateSubClasificacion(subclasificacion){

    $('#modalUpdateSubClasificacion').modal('show');
    let SubClasificacion : SubClasificacionProducto;
    SubClasificacion = subclasificacion;

    this.subclasificacion.IdSubClasificacion = SubClasificacion.IdSubClasificacion;

    this.formUpdateSubClasificacion.reset();
    this.formUpdateSubClasificacion.setValue({
      nombreSubClasificacion: SubClasificacion.NombreSubClasificacion
      , descripcionSubClasificacion: SubClasificacion.DescripcionSubClasificacion

    })

  }

  capturarDatosActualizados(){
    this.subclasificacion.NombreSubClasificacion = this.formUpdateSubClasificacion.value.nombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = this.formUpdateSubClasificacion.value.descripcionCategoria;
  }
  capturarDatosIngresados(){
    this.subclasificacion.NombreSubClasificacion = this.formAddSubClasificacion.value.nombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = this.formAddSubClasificacion.value.descripcionCategoria;
  }

  getSubclasificacion(){

  }

  getSubClasificaciones(){

  }

  createSubCasificacion(){

    this.capturarDatosIngresados();
    this._subClasificacionService.createSubClasificacionProducto(this.subclasificacion).subscribe(
      response => {

        if (response.IdSubClasificacion) {

          swal(
            'Subclasificación',
            'la Subclasificación ha sido creado exitosamente!',
            'success'
          ).then(function () {
            $('#modalAddSubClasificacion').modal('toggle');

            this.formUpdateSubClasificacion.reset();
          })


        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar el producto, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');

        }
        this.listarSubclasificaciones();
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
    this.subclasificacion = new SubClasificacionProducto(null,null,null,null,null);

  }

  updateSubClasificacion(){

    this.capturarDatosActualizados();
    this._subClasificacionService.updateSubClasificacionProducto(this.subclasificacion).subscribe(
      response =>{
        if(response.success){
          swal(
            'Subclasificación',
            'La Subclasificación ha sido actualizado exitosamente!',
            'success'
          ).then(function () {
            $('#modalupdatesubclasificacion').modal('toggle');

            this.formUpdateSubClasificacion.reset();
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

    this.subclasificacion = new SubClasificacionProducto(null,null,null,null,null);

  }

  deleteSubClasificacion(IdSubClasificacion){
    swal({
      title: "Estas seguro(a)?",
      text: "La Subclasificación sera eliminada permanentemente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!'
    }).then((eliminar) => {
      if (eliminar) {
        this._subClasificacionService.deleteSubClasificacionProducto(IdSubClasificacion).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminado!',
                'La Subclasificación ha sido eliminada exitosamente',
                'success'
              ).then(() => {

                this.listarSubclasificaciones();
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
