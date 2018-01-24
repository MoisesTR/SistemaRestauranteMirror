import { Component, OnInit, ViewChild } from '@angular/core';
import {EnvaseService} from "../../services/envase.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";
import {Envase} from "../../models/Envase";
import {FormGroup, FormControl, FormArray, NgForm, Validators, FormBuilder} from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from "angular-datatables";
import {CustomValidators} from "../../validadores/CustomValidators";
declare var $:any;

@Component({
  selector: 'app-envase',
  templateUrl: './envase.component.html',
  styleUrls: ['./envase.component.css'],
  providers: [EnvaseService]
})
export class EnvaseComponent implements OnInit {

  @ViewChild('formEnvase') formEnvase: NgForm;

  public envase : Envase;
  public envases: Envase[];
  public mensaje : string;

  public formAddEnvase: FormGroup;
  public formUpdateEnvase: FormGroup;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _envaseService : EnvaseService,
    private _formBuilderEnvase : FormBuilder
  ) {
    this.envase = new Envase(null,null,null,null);
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

      $('.dropify').dropify();

      $(".selectcategoria").select2({
        maximumSelectionLength: 1
      });

      $(".selectsubclasificacion").select2({
        maximumSelectionLength: 1
      });

      $(".selectproveedor").select2({
        maximumSelectionLength: 1
      });

      $(".selectenvase").select2({
        maximumSelectionLength: 1
      });

      $(".selectempaque").select2({
        maximumSelectionLength: 1
      });

      $(".selectunidadmedida").select2({
        maximumSelectionLength: 1
      });

      $(".selectclasificacion").select2({
        maximumSelectionLength: 1
      });

      $(".selectestado").select2({
        maximumSelectionLength: 1
      });

      $(".selectvalorunidadmedida").select2({
        maximumSelectionLength: 1
      });

    });

      this.settingsDatatable();
      this.getEnvase();
      this.initFormAddEnvase();
      this.initFormUpdateEnvase();

  }

    settingsDatatable(){

      /*PROPIEDADES GENERALES DE LA DATATABLE*/
      this.dtOptions = <DataTables.Settings>{
        pagingType: 'full_numbers'
        , pageLength: 10
        , 'lengthChange': false
        , language: idioma_espanol
      };
    }

 rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });

    }



private initConstructorEnvase() {
    this.envase = new Envase(null,null,null,null);
  }


  getEnvase(){
    this._envaseService.getEnvases().subscribe(
      response => {

        if(response.envases){
          this.envases = response.envases;
          this.dtTrigger.next();
        } else {

        }
      },error => {
        console.log(<any>error);
      }
    )
  }

  getEnvasesRender(){
    this._envaseService.getEnvases().subscribe(
      response => {
        if(response.envases){
          this.envases = response.envases;
          this.rerender();
        }
      }, error =>{

      }
    );
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddEnvase(){

    this.formAddEnvase = this._formBuilderEnvase.group({
      'nombreEnvase': new FormControl('',[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.espaciosVacios
        ])
      , 'descripcionEnvase': new FormControl('',[
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
            CustomValidators.espaciosVacios
        ]

      )
    });

  }

  initFormUpdateEnvase(){

    this.formUpdateEnvase = new FormGroup({
      'nombreEnvase': new FormControl('',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.espaciosVacios
        ]
         )
      , 'descripcionEnvase': new FormControl('',[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.espaciosVacios
        ]
        )
    });
  }

  getValuesFormAddEnvase(){

    this.envase.NombreEnvase = this.formAddEnvase.value.nombreEnvase;
    this.envase.Descripcion = this.formAddEnvase.value.descripcionEnvase;

  }

  getValuesFormUpdateEnvase(){

    this.envase.NombreEnvase= this.formUpdateEnvase.value.nombreEnvase;
    this.envase.Descripcion = this.formUpdateEnvase.value.descripcionEnvase;
  }

  showModalUpdateEnvase(envase){

    $('#modalUpdateEnvase').modal('show');
    let Envase : Envase;
    Envase = envase;

    this.envase.IdEnvase  = Envase.IdEnvase;

    this.formUpdateEnvase.reset();
    this.formUpdateEnvase.setValue({
      nombreEnvase: Envase.NombreEnvase
      , descripcionEnvase: Envase.Descripcion
    });


  }

  createEnvaseProducto(){
    this.getValuesFormAddEnvase();
    this._envaseService.createEnvase(this.envase).subscribe(
      response => {
        if (response.IdEnvase) {

          swal(
            'Envase',
            'El envase ha sido creado exitosamente!',
            'success'
          ).then(() => {
            $('#modalAddEnvase').modal('toggle');

            this.envase = new Envase(null,null,null,null);
            this.formAddEnvase.reset();
            this.getEnvasesRender();
          })

        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar Envase, intenta nuevamente!',
            'error'
          )
        }
      }, error => {
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

  getEnvaseProducto(IdEnvase){

    this._envaseService.getEnvase(IdEnvase).subscribe(
      response => {

        if(!response.envase){

        } else {
          this.envase = response.envase;
        }
      },error => {
        console.log(<any>error);
      }
    )
  }

  updateEnvase(){

    this.getValuesFormUpdateEnvase();

    this._envaseService.updateEnvase(this.envase,Envase).subscribe(
      response =>{
        if(response.success){
          swal(
            'Envase',
            'El envase ha sido actualizado exitosamente!',
            'success'
          ).then(() => {
            $('#modalUpdateEnvase').modal('toggle');
            this.formUpdateEnvase.reset();
            this.getEnvasesRender();
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

    this.envase = new Envase(null, null, null, null);

  }

  deleteEnvase(IdEnvase){

    swal({
      title: "Estas seguro(a)?",
      text: "La envase sera eliminada permanentemente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!'
    }).then((eliminar) => {
      if (eliminar) {
        this._envaseService.deleteEnvase(IdEnvase).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminada!',
                'La envase ha sido eliminada exitosamente',
                'success'
              ).then(() => {
               this.getEnvasesRender();
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

  clearAddForm(){
    this.formAddEnvase.reset();
  }
}
