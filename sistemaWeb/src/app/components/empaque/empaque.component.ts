import {Component, OnInit, ViewChild} from '@angular/core';
import {EmpaqueService} from '../../services/empaque.service';
import {Empaque} from '../../models/Empaque';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Rx';
import swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import {idioma_espanol} from '../../services/global';
import {CustomValidators} from '../../validadores/CustomValidators';

declare var $:any;

@Component({
  selector: 'app-empaque',
  templateUrl: './empaque.component.html',
  styleUrls: ['./empaque.component.css'],
  providers: [EmpaqueService]
})
export class EmpaqueComponent implements OnInit {

  public empaque: Empaque;
  public empaques: Empaque[];
  public mensaje : string;

  public formAddEmpaque: FormGroup;
  public formUpdateEmpaque: FormGroup;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

   @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _EmpaqueServicio : EmpaqueService
    , private formBuilderEmpaque: FormBuilder
  ) {
    this.empaque = new Empaque(null,null,null,null);
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
    this.getEmpaques();
    this.initFormAddEmpaque();
    this.initFormUpdateEmpaque();

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

  private initConstructorEmpaque() {
    this.empaque = new Empaque(null, null, null,null);
  }

  getEmpaques(){

      this._EmpaqueServicio.getEmpaques().subscribe(
        response => {
          if(response.empaques){
            this.empaques= response.empaques;
            this.dtTrigger.next();
          }
        }, error =>{

        }
      );
    }

  getEmpaquesRender(){
    this._EmpaqueServicio.getEmpaques().subscribe(
      response => {
        if(response.empaques){
          this.empaques = response.empaques;
          this.rerender();
        }
      }, error =>{

      }
    );
  }




  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddEmpaque(){

    this.formAddEmpaque = this.formBuilderEmpaque.group({
      'nombreEmpaque': new FormControl('',[

          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.espaciosVacios
        ])

      , 'descripcionEmpaque': new FormControl('',[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.espaciosVacios
      ])
    });

  }

  initFormUpdateEmpaque(){

    this.formUpdateEmpaque = this.formBuilderEmpaque.group({
      'nombreEmpaque': new FormControl('',[

        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        CustomValidators.espaciosVacios
      ])
      , 'descripcionEmpaque': new FormControl('',
        [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
            CustomValidators.espaciosVacios
        ])
    });
  }

  showModalUpdateEmpaque(empaque){

    $('#modalUpdateEmpaque').modal('show');
    let Empaque : Empaque;
    Empaque = empaque;

    this.empaque.IdEmpaque  = Empaque.IdEmpaque;

    this.formUpdateEmpaque.reset();
    this.formUpdateEmpaque.setValue({
      nombreEmpaque: Empaque.NombreEmpaque
      , descripcionEmpaque: Empaque.Descripcion
    });

  }


  createEmpaque(){
    this.getValuesFormAddEmpaque();

    this._EmpaqueServicio.createEmpaque(this.empaque).subscribe(
      response => {

        if (response.IdEmpaque) {
          swal(
            'Empaque',
            'El Empaque ha sido creado exitosamente!',
            'success'
          ).then(() => {
            $('#modalAddEmpaque').modal('toggle');
            this.formAddEmpaque.reset();
            this.empaque= new Empaque(null,null,null,null);
            this.getEmpaquesRender();
          })

        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar Empaque, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');

        }
        this.getEmpaquesProductos();
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

  getValuesFormAddEmpaque(){

    this.empaque.NombreEmpaque = this.formAddEmpaque.value.nombreEmpaque;
    this.empaque.Descripcion = this.formAddEmpaque.value.descripcionEmpaque;
    console.log(this.empaque);
  }

  getValuesFormUpdateEmpaque(){

    this.empaque.NombreEmpaque= this.formUpdateEmpaque.value.nombreEmpaque;
    this.empaque.Descripcion = this.formUpdateEmpaque.value.descripcionEmpaque;


  }
  getEmpaque(IdEmpaque){

    this._EmpaqueServicio.getEmpaque(IdEmpaque).subscribe(
      response => {

        if(!response.empaque){

        } else {
          this.empaque = response.empaque;
        }
      },error => {
        console.log(<any>error);
      }
    )
  }

  getEmpaquesProductos(){
    this._EmpaqueServicio.getEmpaques().subscribe(
      response => {

        if(!response.empaques){
          console.log('Ha ocurrido un error');
        } else {
          this.empaques = response.empaques;
        }
      },error => {
        console.log(<any>error);
    }
    )
  }

  updateEmpaque(){

    this.getValuesFormUpdateEmpaque();
    //Codigo temporal
    $('#modalUpdateEmpaque').modal('toggle');
    this.formUpdateEmpaque.reset();
    //

    /*this._EmpaqueServicio.updateEmpaque(this.empaque,Empaque).subscribe(
      response =>{
        if(response.success){
          swal(
            'Empaque',
            'El empaque ha sido actualizado exitosamente!',
            'success'
          ).then(() => {
            $('#modalUpdateEmpaque').modal('toggle');
            this.formUpdateEmpaque.reset();
            this.getEmpaquesRender();
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
    )*/

    this.empaque = new Empaque(null, null, null, null);

  }

  deleteEmpaque(IdEmpaque){

    swal({
      title: "Estas seguro(a)?",
      text: "La empaque sera eliminada permanentemente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!'
    }).then((eliminar) => {
      if (eliminar) {
        this._EmpaqueServicio.deleteEmpaque(IdEmpaque).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminada!',
                'La empaque ha sido eliminada exitosamente',
                'success'
              ).then(() => {
               this.getEmpaquesRender();
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
    this.formAddEmpaque.reset();
  }


}
