import {Component, OnInit, ViewChild} from '@angular/core';
import {SubClasificacionProductoService} from '../../services/sub-clasificacion-producto.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SubClasificacionProducto} from '../../models/SubClasificacionProducto';
import {Subject} from 'rxjs/Rx';
import {idioma_espanol} from '../../services/global';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataTableDirective} from 'angular-datatables';
import {CustomValidators} from '../../validadores/CustomValidators';
import swal from 'sweetalert2';
import {ClasificacionProductoService} from '../../services/clasificacion-producto.service';
import {ClasificacionProducto} from '../../models/ClasificacionProducto';

declare var $:any;

@Component({
  selector: 'app-sub-clasificacion-producto',
  templateUrl: './sub-clasificacion-producto.component.html',
  styleUrls: ['./sub-clasificacion-producto.component.css'],
  providers: [SubClasificacionProductoService]
})

export class SubClasificacionProductoComponent implements OnInit {

  public subclasificacion: SubClasificacionProducto;
  public subclasificaciones: SubClasificacionProducto[];
  public clasificaciones: ClasificacionProducto;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
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
    this.subclasificacion = new SubClasificacionProducto();

    this.initCustomValidatorsFormSubClasificacion();
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
        ,'clasificacion' : new FormControl('',[
        Validators.required
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
      ,'clasificacion' : new FormControl('',[
        Validators.required
      ])
    })
  }

  settingsDatatables(){
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

  }
  ngOnInit() {

    this.settingsDatatables();

    //Investigar que la longitud sea extensa en la mascara
    $('.letras').mask('Aaaaaa ',{'translation': {
        A: {pattern: /[A-Za-z]/}
      }
    });

    this.getSubClasificaciones();
    this.getClasificaciones();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }


  getSubClasificaciones(){
    this._subClasificacionService.getSubClasificaciones().subscribe(
      response => {

        if(response.subclasificaciones){
          this.subclasificaciones = response.subclasificaciones;
          this.dtTrigger.next();
        } else {

        }
      }, error => {

      }, ()=> {

      }
    )
  }

  showModalUpdateSubClasificacion(subclasificacion){

    $('#modalUpdateSubClasificacion').modal('show');

    this.subclasificacion.IdSubClasificacion = subclasificacion.IdSubClasificacion;
    this.subclasificacion.NombreSubClasificacion = subclasificacion.NombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = subclasificacion.DescripcionSubClasificacion;

    this.formUpdateSubClasificacion.reset();
    this.formUpdateSubClasificacion.setValue({
      nombreSubClasificacion: subclasificacion.NombreSubClasificacion
      , descripcionSubClasificacion: subclasificacion.DescripcionSubClasificacion
      , clasificacion : subclasificacion.IdClasificacion
    })

  }

  capturarDatosIngresados(){
    this.subclasificacion.NombreSubClasificacion = this.formAddSubClasificacion.value.nombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = this.formAddSubClasificacion.value.descripcionSubClasificacion;

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
          ).then( () =>  {
            $('#modalAddSubClasificacion').modal('toggle');
            this.formAddSubClasificacion.reset();
          })
        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar el producto, intenta nuevamente!',
            'error'
          )
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
    this.subclasificacion = new SubClasificacionProducto();

  }

  capturarDatosActualizados(){
    this.subclasificacion.NombreSubClasificacion = this.formUpdateSubClasificacion.value.nombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = this.formUpdateSubClasificacion.value.descripcionSubClasificacion;
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

    this.subclasificacion = new SubClasificacionProducto();

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

  onAddSelectClasificacion(event){
    this.subclasificacion.IdClasificacion = event.IdClasificacion;
  }
  onUpdateSelectClasificacion(event){
    this.subclasificacion.IdClasificacion = event.IdClasificacion;
  }
}