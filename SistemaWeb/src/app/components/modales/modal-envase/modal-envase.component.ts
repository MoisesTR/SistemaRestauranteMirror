import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EnvaseService} from '../../../services/shared/envase.service';
import {Envase} from '../../../models/Envase';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalDirective} from 'ng-uikit-pro-standard';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {Utils} from '../../Utils';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'modal-envase',
  templateUrl: './modal-envase.component.html'
})
export class ModalEnvaseComponent implements OnInit {

    public envase: Envase;
    public tituloPantalla = 'Envase';
    public formAddEnvase: FormGroup;

    @Input() mostrarModal: boolean;
    @Output() resultadoConsulta: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('modalAddEnvase') modalAddEnvase: ModalDirective;

    constructor(
        private _route: ActivatedRoute
        , private _router: Router
        , private _envaseService: EnvaseService
        , private _formBuilderEnvase: FormBuilder
    ) {
        this.envase = new Envase();
    }


    ngOnInit() {
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

    eventClick(event) {
        if ( event.dismissReason !== null && event.dismissReason !== undefined ) {
            if ( (event.dismissReason).toString() === ( 'backdrop-click')) {
                this.hideModal();
            }
        }
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

    getValuesFormAddEnvase() {
        this.envase.NombreEnvase = this.formAddEnvase.value.nombreEnvase;
        this.envase.Descripcion = this.formAddEnvase.value.descripcionEnvase;
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
                        this.resultadoConsulta.emit(true);
                    });

                } else {
                    Utils.showMsgInfo('Ha ocurrido un error al crear el envase, intentalo nuevamente');
                }
            }, error => {
                Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
            }
        );
    }

    public hideModal() {
        this.modalAddEnvase.hide();
        this.resultadoConsulta.emit(false);
    }

}
