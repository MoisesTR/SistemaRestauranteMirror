import {Component, OnInit, ViewChild} from '@angular/core';
import {UnidadMedida} from '../../models/UnidadMedida';
import {UnidadMedidaService} from '../../services/unidad-medida.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs/Rx';
import {idioma_espanol} from '../../services/global';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import {CustomValidators} from '../../validadores/CustomValidators';
import {ClasificacionProducto} from '../../models/ClasificacionProducto';
import {ClasificacionProductoService} from '../../services/clasificacion-producto.service';
import {ClasificacionUnidadMedidaService} from '../../services/clasificacion-unidad-medida.service';
import {ClasificacionUnidadDeMedida} from '../../models/ClasificacionUnidadDeMedida';
import {Utilidades} from '../Utilidades';
declare var $:any;

@Component({
  selector: 'app-unidadmedida',
  templateUrl: './unidadmedida.component.html',
  styleUrls: ['./unidadmedida.component.css'],
  providers:[UnidadMedidaService]
})

export class UnidadmedidaComponent implements OnInit, InvocarFormulario{


  public unidadMedida : UnidadMedida;
  public unidadesMedida : UnidadMedida[];
  public clasificaciones: ClasificacionProducto[];
  public mensaje : string;
  public formUpdateUnidadMedida: FormGroup;
  public clasificacionesUnidad: ClasificacionUnidadDeMedida[];

  tOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  formAddUnidadMedida : FormGroup

  public optionsSelect2 : Select2Options;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  @ViewChild(DataTableDirective)
  dtOptions: DataTables.Settings = {};

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _UnidadMedidaServicio : UnidadMedidaService
    , private _clasificacionService : ClasificacionProductoService
    , private _clasificacionUnidad: ClasificacionUnidadMedidaService
    , private fBuilderUnidadMedida: FormBuilder
    ) {

    this.unidadMedida = new UnidadMedida();

  }

  ngOnInit() {
    $(document).ready(function(){
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
    this._UnidadMedidaServicio.getUnidadesMedida().subscribe(
      response => {
        if(response.unidadesmedida){
          this.unidadesMedida = response.unidadesmedida;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );


    this.initFormAdd();
    this.initFormUpdate();
    this.getClasificaciones();
    this.getClasificacionUnidades();

  }

  settingsDatatable(){
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

  initFormAdd(){
    this.formAddUnidadMedida = this.fBuilderUnidadMedida.group({

      'nombreUnidadMedida': new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(100)
        , CustomValidators.espaciosVacios
      ]) ,
      'simboloUnidadMedida': new FormControl('',[
        Validators.required
        , Validators.minLength(2)
        , Validators.maxLength(3)
        , CustomValidators.espaciosVacios
      ]),
      'clasificacionesUnidad': new FormControl('',[
        Validators.required
      ])
    })
  }

  initFormUpdate(){
    this.formUpdateUnidadMedida = this.fBuilderUnidadMedida.group({

      'nombreUnidadMedida': new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(100)
        , CustomValidators.espaciosVacios
      ]) ,
      'simboloUnidadMedida': new FormControl('',[
        Validators.required
        , Validators.minLength(2)
        , Validators.maxLength(3)
        , CustomValidators.espaciosVacios
      ]) ,
      'clasificacionesUnidad': new FormControl('',[
          Validators.required
      ])
    })
  }

  getClasificacionUnidades(){
    this._clasificacionUnidad.getClasificacionUnidadesMedida().subscribe(
      response =>{
        if(response.clasificaciones){
          this.clasificacionesUnidad = response.clasificaciones;
        }
      }, error =>{

      }
    )
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });

    }

  createUnidadMedida(Modal){

    this.unidadMedida.NombreUnidad = this.formAddUnidadMedida.value.nombreUnidadMedida;
    this.unidadMedida.Simbolo = this.formAddUnidadMedida.value.simboloUnidadMedida;

    this._UnidadMedidaServicio.createUnidadMedida(this.unidadMedida).subscribe(
      response =>{

        if(response.IdUnidadMedida){
          swal(
            'Unidad medida',
            'La unidad ha sido creada exitosamente!',
            'success'
          ).then(() => {
            Modal.hide();
            this.formAddUnidadMedida.reset();
            this.unidadMedida = new UnidadMedida();
            this.getUnidadesMedidaRender();
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

        }
      }
    )

  }

  getUnidaMedida(){

      this._UnidadMedidaServicio.getUnidadesMedida().subscribe(
        response => {
          if(response.unidadesMedida){
            this.unidadesMedida= response.unidadesMedida;
            this.dtTrigger.next();
          }
        }, error =>{

        }
      );
    }


    getUnidadesMedidaRender(){

      this._UnidadMedidaServicio.getUnidadesMedida().subscribe(
        response =>{
          if(response.unidadesmedida){
            this.unidadesMedida = response.unidadesmedida;
            this.rerender();

          } else {

          }
        }, error =>{

        }
      )
    }

    getClasificaciones(){
      this._clasificacionService.getClasificaciones().subscribe(
        response =>{
          if(response.clasificaciones){
            this.clasificaciones = response.clasificaciones;
          } else {

          }
        }
      )
    }

  deleteUnidadMedida(IdUnidad){

    swal({
      title: "Estas seguro(a)?",
      text: "La categoria sera eliminada permanentemente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!'
    }).then((eliminar) => {
      if (eliminar) {
        this._UnidadMedidaServicio.deleteUnidadMedida(IdUnidad).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminada!',
                'La unidad de medida ha sido eliminada exitosamente',
                'success'
              ).then(() => {
                this.getUnidadesMedidaRender();
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

  updateUnidadMedida(Modal){

    Modal.hide();
  }

  InvocarModal(Modal, Formulario) {
    Utilidades.invocacionModal(Modal,Formulario);
  }

  invocarModalUpdate(Modal,Unidad){

      this.unidadMedida.IdUnidadMedida = Unidad.IdUnidadMedida;
      this.unidadMedida.IdClasificacionUnidadMedida = Unidad.IdClasificacionUnidadMedida;

      this.formUpdateUnidadMedida.reset();
      this.formUpdateUnidadMedida.setValue({
          nombreUnidadMedida: Unidad.NombreUnidad
          , simboloUnidadMedida: Unidad.Simbolo
          , clasificacionesUnidad : Unidad.IdClasificacionUnidadMedida
      });

    Modal.show();
  }

  onAddSelectClasificacionesUnidad(event){
    this.unidadMedida.IdClasificacionUnidadMedida = event.IdClasificacionUnidadMedida;
  }

  onAddUpdateUnidadMedida(event){
    this.unidadMedida.IdClasificacionUnidadMedida = event.IdClasificacionUnidadMedida;
  }

}