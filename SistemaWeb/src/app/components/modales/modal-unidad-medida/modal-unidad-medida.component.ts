import {AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UnidadMedidaService} from '../../../services/shared/unidad-medida.service';
import {UnidadMedida} from '../../../models/UnidadMedida';
import {ModalDirective} from 'ng-uikit-pro-standard';
import {ClasificacionProductoService} from '../../../services/shared/clasificacion-producto.service';
import {ClasificacionProducto} from '../../../models/ClasificacionProducto';
import {ClasificacionUnidadMedidaService} from '../../../services/shared/clasificacion-unidad-medida.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {Utils} from '../../Utils';
import swal from 'sweetalert2';
import {ClasificacionUnidadDeMedida} from '../../../models/ClasificacionUnidadDeMedida';
declare var $: any;

@Component({
  selector: 'modal-unidad-medida',
  templateUrl: './modal-unidad-medida.component.html'
})
export class ModalUnidadMedidaComponent implements OnInit, AfterViewInit {

    public unidadMedida: UnidadMedida;
    public clasificaciones: ClasificacionProducto[];
    public tituloPantalla = 'Unidad de Medida';
    public clasificacionesUnidad: ClasificacionUnidadDeMedida[];
    formAddUnidadMedida: FormGroup;

    @ViewChild('modalAddUnidadMedida') modalAddUnidadMedida: ModalDirective;

    @Input() mostrarModal: boolean;
    @Output() resultadoConsulta: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private _UnidadMedidaServicio: UnidadMedidaService
        , private _clasificacionService: ClasificacionProductoService
        , private _clasificacionUnidad: ClasificacionUnidadMedidaService
        , private fBuilderUnidadMedida: FormBuilder
    ) {
        this.initFormAdd();
        this.getClasificacionUnidades();
        this.unidadMedida = new UnidadMedida();

    }

    ngOnInit() {

    }

    ngAfterViewInit(){
        this.modalAddUnidadMedida.show();
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

    initFormAdd() {
        this.formAddUnidadMedida = this.fBuilderUnidadMedida.group({

            'nombreUnidadMedida': new FormControl('', [
                Validators.required
                , Validators.minLength(2)
                , Validators.maxLength(100)
                , CustomValidators.nospaceValidator
            ]) ,
            'simboloUnidadMedida': new FormControl('', [
                Validators.required
                , Validators.minLength(2)
                , Validators.maxLength(3)
                , CustomValidators.nospaceValidator
            ]),
            'clasificacionesUnidad': new FormControl('', [
                Validators.required
            ])
        });
    }

    createUnidadMedida(Modal) {

        this.unidadMedida.NombreUnidad = this.formAddUnidadMedida.value.nombreUnidadMedida;
        this.unidadMedida.Simbolo = this.formAddUnidadMedida.value.simboloUnidadMedida;
        this.unidadMedida.NImportancia = 1;

        this._UnidadMedidaServicio.createUnidadMedida(this.unidadMedida).subscribe(
            response => {

                if (response.IdUnidadMedida) {
                    swal(
                        'Unidad medida',
                        'La unidad ha sido creada exitosamente!',
                        'success'
                    ).then(() => {
                        Modal.hide();
                        this.formAddUnidadMedida.reset();
                        this.unidadMedida = new UnidadMedida();
                        this.resultadoConsulta.emit(true);
                    });
                } else {
                    Utils.showMsgInfo('Ha ocurrido un error al insertar la unidad, intentalo nuevamente', this.tituloPantalla);
                }
            },
            error => {
                Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
            }
        );
    }

    getClasificacionUnidades() {
            this._clasificacionUnidad.getClasificacionUnidadesMedida().subscribe(
            response => {
                if (response.clasificaciones) {
                    this.clasificacionesUnidad = response.clasificaciones;
                }
            }, error => {
                Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
            }
        );
    }

    changeClasificacionUnidad(event) {

        if (event === null) {
            this.unidadMedida.IdClasificacionUnidadMedida  = null;
        } else {
            this.unidadMedida.IdClasificacionUnidadMedida = event.IdClasificacionUnidadMedida;
        }
    }

    public hideModal() {
        this.modalAddUnidadMedida.hide();
        this.resultadoConsulta.emit(false);
    }

}
