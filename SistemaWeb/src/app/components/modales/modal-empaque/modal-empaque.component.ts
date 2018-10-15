import {AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ng-uikit-pro-standard';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmpaqueService} from '../../../services/shared/empaque.service';
import {Empaque} from '../../../models/Empaque';
import {CustomValidators} from '../../../validadores/CustomValidators';
import swal from 'sweetalert2';
import {Utils} from '../../Utils';

@Component({
  selector: 'modal-empaque',
  templateUrl: './modal-empaque.component.html',
  styleUrls: ['./modal-empaque.component.scss'],
    exportAs: 'modalEmpaque'
})
export class ModalEmpaqueComponent implements OnInit, AfterViewInit {

  @ViewChild('modalAddEmpaque') modalAddEmpaque: ModalDirective;

  @Input() mostrarModal: boolean;
  @Output() resultadoModal: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  @Output() resultadoConsulta: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isVisible = false;

  public empaque: Empaque;
  public formAddEmpaque: FormGroup;

  constructor(
      private _empaqueService: EmpaqueService
      , private formBuilderEmpaque: FormBuilder
  ) {
      this.empaque = new Empaque();

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

  ngOnInit() {
      this.initFormAddEmpaque();

  }

  show() {
        this.isVisible = true;
  }

  ngAfterViewInit() {
      this.modalAddEmpaque.show();
  }

    /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddEmpaque() {

      this.formAddEmpaque = this.formBuilderEmpaque.group({
          'nombreEmpaque': new FormControl('', [

              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(100),
              CustomValidators.nospaceValidator
          ])

          , 'descripcionEmpaque': new FormControl('', [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100),
              CustomValidators.nospaceValidator
          ])
      });

  }

  createEmpaque(Modal) {
    this.getValuesFormAddEmpaque();

    this._empaqueService.createEmpaque(this.empaque).subscribe(
        response => {

            if (response.IdEmpaque) {
                swal(
                    'Empaque',
                    'El Empaque ha sido creado exitosamente!',
                    'success'
                ).then(() => {
                    Modal.hide();
                    this.formAddEmpaque.reset();
                    this.resultadoConsulta.emit(true);
                });

            } else {
                Utils.showMsgInfo('Ha ocurrido un error inesperado al crear el empaque,intentalo nuevamente', 'Empaque');
            }
        }, error => {
            Utils.showMsgError(Utils.msgError(error));
        }
    );
  }

  getValuesFormAddEmpaque() {
    this.empaque.NombreEmpaque = this.formAddEmpaque.value.nombreEmpaque;
    this.empaque.Descripcion = this.formAddEmpaque.value.descripcionEmpaque;
  }

  public hideModal() {
    this.modalAddEmpaque.hide();
    this.resultadoConsulta.emit(false);
  }

}
