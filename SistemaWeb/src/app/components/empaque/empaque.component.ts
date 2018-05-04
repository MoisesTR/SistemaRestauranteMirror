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
import {Utilidades} from '../Utilidades';
import {ModalDirective} from '../../typescripts/free/modals';

declare var $:any;

@Component({
  selector: 'app-empaque',
  templateUrl: './empaque.component.html',
  styleUrls: ['./empaque.component.css'],
  providers: [EmpaqueService]
})
export class EmpaqueComponent implements OnInit, InvocarFormulario{

  public empaque: Empaque;
  public empaques: Empaque[];
  public tituloPantalla : string = 'Empaque';

  public formAddEmpaque: FormGroup;
  public formUpdateEmpaque: FormGroup;

  @ViewChild('modalAddEmpaque') modalAddEmpaque : ModalDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _EmpaqueServicio : EmpaqueService
    , private formBuilderEmpaque: FormBuilder
  ) {
    this.empaque = new Empaque();
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
                      this.InvocarModal(this.modalAddEmpaque,this.formAddEmpaque);
                  }
              }
          ]
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


  createEmpaque(Modal){
    this.getValuesFormAddEmpaque();

    this._EmpaqueServicio.createEmpaque(this.empaque).subscribe(
      response => {

        if (response.IdEmpaque) {
          swal(
            'Empaque',
            'El Empaque ha sido creado exitosamente!',
            'success'
          ).then(() => {
            Modal.hide();
            this.formAddEmpaque.reset();
            this.empaque = new Empaque();
            this.getEmpaquesRender();
          })

        } else {
          Utilidades.showMsgInfo('Ha ocurrido un error el insertar el empaque, intenta nuevamnete!!',this.tituloPantalla);
        }
        this.getEmpaquesProductos();
      }, error => {
        Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
      }
    )
  }

  getValuesFormAddEmpaque(){
    this.empaque.NombreEmpaque = this.formAddEmpaque.value.nombreEmpaque;
    this.empaque.Descripcion = this.formAddEmpaque.value.descripcionEmpaque;
  }

  getValuesFormUpdateEmpaque(){
    this.empaque.NombreEmpaque= this.formUpdateEmpaque.value.nombreEmpaque;
    this.empaque.Descripcion = this.formUpdateEmpaque.value.descripcionEmpaque;
  }
  getEmpaquesProductos(){
    this._EmpaqueServicio.getEmpaques().subscribe(
      response => {

        if(!response.empaques){
          Utilidades.showMsgInfo('Ha ocurrido un error al obtener los empaques',this.tituloPantalla);
        } else {
          this.empaques = response.empaques;
        }
      },error => {
        Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
    }
    )
  }

  updateEmpaque(Modal){

    this.getValuesFormUpdateEmpaque();
    this._EmpaqueServicio.updateEmpaque(this.empaque).subscribe(
      response =>{
        if(response.success){
          swal(
            'Empaque',
            'El empaque ha sido actualizado exitosamente!',
            'success'
          ).catch(swal.noop).then(() => {
            Modal.hide();
            this.formUpdateEmpaque.reset();
            this.getEmpaquesRender();
            this.empaque = new Empaque();
          })

        } else {
          Utilidades.showMsgInfo('Ha ocurrido un error en la actualización',this.tituloPantalla);
        }
      }, error =>{
        Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
      }
    )


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

  InvocarModal(Modal, Formulario) {
    Utilidades.invocacionModal(Modal,Formulario);
  }

  invocarModalUpdate(Modal,Empaque : Empaque){

      this.empaque.IdEmpaque  = Empaque.IdEmpaque;
      this.empaque.NombreEmpaque = Empaque.NombreEmpaque;
      this.empaque.Descripcion = Empaque.Descripcion;

      console.log(this.empaque);

      this.formUpdateEmpaque.reset();
      this.formUpdateEmpaque.setValue({
          nombreEmpaque: Empaque.NombreEmpaque
          , descripcionEmpaque: Empaque.Descripcion
      });

      Modal.show();

  }
}
