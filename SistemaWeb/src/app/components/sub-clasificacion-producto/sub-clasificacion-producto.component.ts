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
import {Utilidades} from '../Utilidades';
import {ModalDirective} from '../../typescripts/free/modals';
import {isNull} from "util";

declare var $:any;

@Component({
  selector: 'app-sub-clasificacion-producto',
  templateUrl: './sub-clasificacion-producto.component.html',
  styleUrls: ['./sub-clasificacion-producto.component.css'],
  providers: [SubClasificacionProductoService]
})

export class SubClasificacionProductoComponent implements OnInit, InvocarFormulario {


  public subclasificacion: SubClasificacionProducto;
  public subclasificaciones: SubClasificacionProducto[];
  public clasificaciones: ClasificacionProducto;

  @ViewChild('modalAddSubclasificacion') modalAddSubclasificacion : ModalDirective;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  formAddSubClasificacion : FormGroup;
  formUpdateSubClasificacion: FormGroup;

  public tituloPantalla  : string  = 'Subclasificación';

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

  settingsDatatable(){

      /*PROPIEDADES GENERALES DE LA DATATABLE*/
      this.dtOptions = <DataTables.Settings>{
          pagingType: 'full_numbers'
          , pageLength: 10
          , language: idioma_espanol
          , 'lengthChange': false
          , responsive : true
          , dom: 'Bfrtip',
          buttons: [
              {
                  text: 'Agregar',
                  key: '1',
                  className: 'btn orange-chang float-right-dt',
                  action:  (e, dt, node, config) => {
                      this.InvocarModal(this.modalAddSubclasificacion,this.formAddSubClasificacion);
                  }
              }
          ]
      };
  }

  ngOnInit() {

    this.settingsDatatable();

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

  getSubClasificacionesRender(){
      this._subClasificacionService.getSubClasificaciones().subscribe(
          response => {

              if(response.subclasificaciones){
                  this.subclasificaciones = response.subclasificaciones;
                  this.rerender();
              } else {

              }
          }, error => {

          }, ()=> {

          }
      )
  }

  capturarDatosIngresados(){
    this.subclasificacion.NombreSubClasificacion = this.formAddSubClasificacion.value.nombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = this.formAddSubClasificacion.value.descripcionSubClasificacion;
  }

  createSubCasificacion(Modal){

    this.capturarDatosIngresados();

    this._subClasificacionService.createSubClasificacionProducto(this.subclasificacion).subscribe(
      response => {
        if (response.IdSubclasificacion) {
          swal(
            'Subclasificación',
            'la Subclasificación ha sido creado exitosamente!',
            'success'
          ).then( () =>  {
            Modal.hide();
            this.formAddSubClasificacion.reset();
          })
        } else {
            Utilidades.showMsgError('Ha ocurrido un error al insertar la subclasificación, intenta nuevamente!',this.tituloPantalla);
        }
        this.getSubClasificacionesRender();
      }, error => {
          console.log(error);
        Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
      }
    )
    this.subclasificacion = new SubClasificacionProducto();
  }

  capturarDatosActualizados(){
    this.subclasificacion.NombreSubClasificacion = this.formUpdateSubClasificacion.value.nombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = this.formUpdateSubClasificacion.value.descripcionSubClasificacion;
  }

  updateSubClasificacion(Modal){

    this.capturarDatosActualizados();
    this._subClasificacionService.updateSubClasificacionProducto(this.subclasificacion).subscribe(
      response =>{
        if(response.success){
          swal(
            'Subclasificación',
            'La Subclasificación ha sido actualizado exitosamente!',
            'success'
          ).catch(swal.noop).then( () => {
            Modal.hide();
            this.formUpdateSubClasificacion.reset();
            this.getSubClasificacionesRender();
          })

        } else {
          Utilidades.showMsgError('Ha ocurrido un error en la actualización, intentalo nuevamente',this.tituloPantalla);
        }
      }, error =>{
       Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
      }
    )
    this.subclasificacion = new SubClasificacionProducto();
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
        this._subClasificacionService.deleteSubclasificacion(IdSubClasificacion).subscribe(
          response =>{
            if(response.success){
              swal(
                this.tituloPantalla,
                'La Subclasificación ha sido eliminada exitosamente',
                'success'
              ).then(() => {

                this.getSubClasificacionesRender();
              })
            } else {
              Utilidades.showMsgInfo('Ha ocurrido un error al eliminar, intentalo nuevamente',this.tituloPantalla);
            }
          }, error =>{
            Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
          }
        )

      }
    });
  }

  getClasificaciones(){

    this._clasificacionService.getClasificaciones().subscribe(
      response => {
        if(response.clasificaciones){
          this.clasificaciones = response.clasificaciones;
        } else {
          Utilidades.showMsgInfo('Ha ocurrido un error obteniendo las clasificaciones',this.tituloPantalla);
        }

      }, error => {
        Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
      }
    )
  }



  InvocarModal(Modal, Formulario) {
    Utilidades.invocacionModal(Modal,Formulario);
  }

  invocarModalUpdateSubClasificacion(Modal,Subclasificacion : SubClasificacionProducto){

    this.subclasificacion.IdSubClasificacion = Subclasificacion.IdSubClasificacion;
    this.subclasificacion.NombreSubClasificacion = Subclasificacion.NombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = Subclasificacion.DescripcionSubClasificacion;
    this.subclasificacion.IdClasificacion = Subclasificacion.IdClasificacion;

    this.formUpdateSubClasificacion.reset();
    this.formUpdateSubClasificacion.setValue({
        nombreSubClasificacion: Subclasificacion.NombreSubClasificacion
        , descripcionSubClasificacion: Subclasificacion.DescripcionSubClasificacion
        , clasificacion : Subclasificacion.IdClasificacion
    })

    Modal.show();

  }

  onChangeClasificacion(event){
      if(isNull(event)) {
          this.subclasificacion.IdClasificacion  = null;
      } else {
          this.subclasificacion.IdClasificacion = event.IdClasificacion;
      }
  }
}
