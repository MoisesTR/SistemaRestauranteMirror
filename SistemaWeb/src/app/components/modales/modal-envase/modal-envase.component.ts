import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {EnvaseService} from '../../../services/envase.service';
import {Envase} from '../../../models/Envase';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from '../../../typescripts/free/modals';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataTableDirective} from 'angular-datatables';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {isNull, isUndefined} from 'util';
import {Utilidades} from '../../Utilidades';
import swal from "sweetalert2";
declare var $:any;

@Component({
  selector: 'modal-envase',
  templateUrl: './modal-envase.component.html'
})
export class ModalEnvaseComponent implements OnInit {

    public envase : Envase;
    public tituloPantalla : string = 'Envase';
    public formAddEnvase: FormGroup;

    @Input() mostrarModal : boolean;
    @Output() resultadoConsulta : EventEmitter<boolean> = new EventEmitter<boolean>();
    public isVisible: boolean = false;

    @ViewChild('modalAddEnvase') modalAddEnvase : ModalDirective;


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

      this.initFormAddEnvase();
    }

    ngAfterViewInit(){
        this.modalAddEnvase.show();
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
        if (event.keyCode === 27) {
            this.hideModal();
        }
    }


    eventoClick(event){
        console.log(event.dismissReason)
        if( !isNull(event.dismissReason) && !isUndefined(event.dismissReason) )
            if( (event.dismissReason).toString() == ( 'backdrop-click')) {
                this.hideModal();
            }
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

    getValuesFormAddEnvase(){
        this.envase.NombreEnvase = this.formAddEnvase.value.nombreEnvase;
        this.envase.Descripcion = this.formAddEnvase.value.descripcionEnvase;
    }

    createEnvaseProducto(Modal){
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
                        this.resultadoConsulta.emit(true);
                    })

                } else {
                    Utilidades.showMsgInfo('Ha ocurrido un error al crear el envase, intentalo nuevamente');
                }
            }, error => {
                Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla)
            }
        )
    }


    public hideModal() {
        this.modalAddEnvase.hide();
        this.resultadoConsulta.emit(false);
    }

}
