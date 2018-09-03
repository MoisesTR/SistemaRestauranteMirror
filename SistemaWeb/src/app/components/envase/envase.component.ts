import {Component, OnInit, ViewChild} from '@angular/core';
import {EnvaseService} from '../../services/shared/envase.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {idioma_espanol} from '../../services/shared/global';
import {Envase} from '../../models/Envase';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import {CustomValidators} from '../../validadores/CustomValidators';
import {Utils} from '../Utils';
import {ModalDirective} from 'ng-uikit-pro-standard';
declare var $:any;

@Component({
  selector: 'app-envase',
  templateUrl: './envase.component.html',
  styleUrls: ['./envase.component.css'],
  providers: [EnvaseService]
})
export class EnvaseComponent implements OnInit, InvocarFormulario {

  public envase: Envase;
  public envases: Envase[];
  public tituloPantalla = 'Envase';

  public formAddEnvase: FormGroup;
  public formUpdateEnvase: FormGroup;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild('modalAddEnvase') modalAddEnvase: ModalDirective;
  @ViewChild('modalUpdateEnvase') modalUpdateEnvase: ModalDirective;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _envaseService : EnvaseService,
    private _formBuilderEnvase : FormBuilder
  ) {
    this.envase = new Envase();
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


    });

      this.settingsDatatable();
      this.getEnvases();
      this.initFormAddEnvase();
      this.initFormUpdateEnvase();

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
                    this.InvocarModal(this.modalAddEnvase, this.formAddEnvase);
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

  getEnvases() {
    this._envaseService.getEnvases().subscribe(
      response => {
        if (response.envases) {
          this.envases = response.envases;
          this.dtTrigger.next();
        } else {

        }
      }, error => {
        Utils.showMsgError(Utils.msgError(error));
      }
    );
  }

  getEnvasesRender() {
    this._envaseService.getEnvases().subscribe(
      response => {
        if (response.envases) {
          this.envases = response.envases;
          this.rerender();
        }
      }, error => {

      }
    );
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddEnvase() {

    this.formAddEnvase = this._formBuilderEnvase.group({
      'nombreEnvase': new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.nospaceValidator
        ])
      , 'descripcionEnvase': new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(100),
            CustomValidators.nospaceValidator
        ]

      )
    });

  }

  initFormUpdateEnvase() {

    this.formUpdateEnvase = new FormGroup({
      'nombreEnvase': new FormControl('',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.nospaceValidator
        ]
         )
      , 'descripcionEnvase': new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.nospaceValidator
        ]
        )
    });
  }

  getValuesFormAddEnvase() {
    this.envase.NombreEnvase = this.formAddEnvase.value.nombreEnvase;
    this.envase.Descripcion = this.formAddEnvase.value.descripcionEnvase;

  }

  getValuesFormUpdateEnvase() {
    this.envase.NombreEnvase= this.formUpdateEnvase.value.nombreEnvase;
    this.envase.Descripcion = this.formUpdateEnvase.value.descripcionEnvase;
  }

  showModalUpdateEnvase(envase : Envase){

    this.envase.IdEnvase  = envase.IdEnvase;

    this.formUpdateEnvase.reset();
    this.formUpdateEnvase.setValue({
      nombreEnvase: envase.NombreEnvase
      , descripcionEnvase: envase.Descripcion
    });
    this.modalUpdateEnvase.show();
  }

  createEnvaseProducto(Modal) {
    this.getValuesFormAddEnvase();
    this._envaseService.createEnvase(this.envase).subscribe(
      response => {
        if (response.IdEnvase) {

          swal(
            'Envase',
            'El envase ha sido creado exitosamente!',
            'success'
          ).then(() => {
            Modal.hide();
            this.envase = new Envase();
            this.formAddEnvase.reset();
            this.getEnvasesRender();
          });

        } else {
         Utils.showMsgInfo('Ha ocurrido un error al crear el envase, intentalo nuevamente');
        }
      }, error => {
       Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    );
  }

  updateEnvase() {

    this.getValuesFormUpdateEnvase();
    this._envaseService.updateEnvase(this.envase).subscribe(
      response => {
        if (response.success) {
          swal(
            this.tituloPantalla,
            'El envase ha sido actualizado exitosamente!',
            'success'
          ).then(() => {
            this.modalUpdateEnvase.hide();
            this.formUpdateEnvase.reset();
            this.getEnvasesRender();
            this.envase = new Envase();
          });

        } else {
         Utils.showMsgInfo('Ha ocurrido un error al actualizar', this.tituloPantalla);
        }
      }, error =>{
        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    )


  }

  deleteEnvase(IdEnvase) {

    swal({
      title: 'Estas seguro(a)?',
      text: 'El envase sera eliminado permanentemente!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
        if (result.value) {
            this._envaseService.deleteEnvase(IdEnvase).subscribe(
                response => {
                    if (response.success) {
                        swal(
                            this.tituloPantalla,
                            'El envase ha sido eliminado exitosamente',
                            'success'
                        ).then(() => {
                            this.getEnvasesRender();
                        });
                    } else {
                        Utils.showMsgInfo('Ha ocurrido un error al eliminar', this.tituloPantalla);
                    }
                }, error => {
                    Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
                }
            );
        } else if (result.dismiss === swal.DismissReason.cancel) {

        }
    });
  }

  InvocarModal(Modal, Formulario) {
      Utils.invocacionModal(Modal, Formulario);
  }
}
