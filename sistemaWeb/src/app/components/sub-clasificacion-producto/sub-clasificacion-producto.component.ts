import {Component, OnInit, ViewChild} from '@angular/core';
import {SubClasificacionProductoService} from "../../services/sub-clasificacion-producto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubClasificacionProducto} from "../../models/SubClasificacionProducto";
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";
import {FormGroup, FormControl, FormArray, NgForm, Validators, FormBuilder} from '@angular/forms';
import {DataTableDirective} from "angular-datatables";
import {CustomValidators} from "../../validadores/CustomValidators";
import swal from 'sweetalert2';
import {ClasificacionProductoService} from "../../services/clasificacion-producto.service";
import {ClasificacionProducto} from "../../models/ClasificacionProducto";
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
  public clasificaciones: ClasificacionProducto;

  public mensaje : string;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  formAddSubClasificacion : FormGroup;
  formUpdateSubClasificacion: FormGroup;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _subClasificacionService : SubClasificacionProductoService
    , private _clasificacionService: ClasificacionProductoService
    , private formBuilderSubClasificacion : FormBuilder

  ) {
    this.initConstructorSubClasificacion();
    this.initCustomValidatorsFormSubClasificacion();
  }

  private initConstructorSubClasificacion(){
    this.subclasificacion = new SubClasificacionProducto(null,null,null,null,null);
  }

  private initCustomValidatorsFormSubClasificacion(){

    this.formAddSubClasificacion = this.formBuilderSubClasificacion.group({
      'nombreSubClasificacion' : new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(100)
        , CustomValidators.espaciosVacios
      ])
      , 'descripcionSubClasificacion' : new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(300)
        , CustomValidators.espaciosVacios
      ])
    })

    this.formUpdateSubClasificacion = this.formBuilderSubClasificacion.group({
      'nombreSubClasificacion' : new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(100)
        , CustomValidators.espaciosVacios
      ])
      , 'descripcionSubClasificacion' : new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(300)
        , CustomValidators.espaciosVacios
      ])
    })
  }

  ngOnInit() {
    this.dtOptions = <DataTables.Settings>{
      autoWidth: false
      , pagingType: 'full_numbers'
      , pageLength: 10
      , 'lengthChange': false
      , searching: true
      , ordering: true
      , language: idioma_espanol
    };
    $(document).ready(function(){
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
    });
    this.getSubClasificaciones();
    this.getClasificaciones();
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


  getSubClasificaciones(){
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


  createSubCasificacion(){

    this.capturarDatosIngresados();

    this._subClasificacionService.createSubClasificacionProducto(this.subclasificacion).subscribe(
      response => {

        if (response.IdSubclasificacion) {

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
        this.getSubClasificaciones();
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

  capturarDatosIngresados(){

    this.subclasificacion.NombreSubClasificacion = this.formAddSubClasificacion.value.nombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = this.formAddSubClasificacion.value.descripcionSubClasificacion;

    let IdClasificacion:string = null;
    IdClasificacion = $(".selectclasificacion").val()[0];

    if(IdClasificacion != null) {
      this.subclasificacion.IdClasificacion = parseInt(IdClasificacion);
    } else {
      console.log('esta vacio')
    }
    console.log(this.subclasificacion);
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

  capturarDatosActualizados(){
    this.subclasificacion.NombreSubClasificacion = this.formUpdateSubClasificacion.value.nombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = this.formUpdateSubClasificacion.value.descripcionSubClasificacion;

    let IdClasificacion:string = null;
    IdClasificacion = $(".selectclasificacion").val()[0];

    if(IdClasificacion != null) {
      this.subclasificacion.IdClasificacion = parseInt(IdClasificacion);
    } else {
      console.log('esta vacio')
    }
    console.log(this.subclasificacion);
  }

  deleteSubClasificacion(IdSubClasificacion){
   /* swal({
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

                this.getSubClasificaciones();
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
    });*/
  }

  getDataNewSubClasificacion(){

  }
  getClasificaciones(){

    this._clasificacionService.getClasificaciones().subscribe(
      response => {
        if(response.clasificaciones){
          this.clasificaciones = response.clasificaciones;
        } else {
          console.log('Ha ocurrido un error obteniendo las clasificaciones');
        }

      }, error => {
        console.log(<any>error);
      }
    )
  }

}
