import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {UnidadMedidaService} from '../../../services/unidad-medida.service';
import {UnidadMedida} from '../../../models/UnidadMedida';
import {ModalDirective} from '../../../typescripts/free/modals';
import {ClasificacionProductoService} from '../../../services/clasificacion-producto.service';
import {ClasificacionProducto} from '../../../models/ClasificacionProducto';
import {ClasificacionUnidadMedidaService} from '../../../services/clasificacion-unidad-medida.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {Utilidades} from '../../Utilidades';
import swal from 'sweetalert2';
import {isNull, isUndefined} from 'util';
import {ClasificacionUnidadDeMedida} from '../../../models/ClasificacionUnidadDeMedida';
declare var $:any;

@Component({
  selector: 'modal-unidad-medida',
  templateUrl: './modal-unidad-medida.component.html'
})
export class ModalUnidadMedidaComponent implements OnInit {

    public unidadMedida : UnidadMedida;
    public clasificaciones: ClasificacionProducto[];
    public tituloPantalla : string = 'Unidad de Medida';
    public clasificacionesUnidad: ClasificacionUnidadDeMedida[];
    formAddUnidadMedida : FormGroup

    @ViewChild('modalAddUnidadMedida') modalAddUnidadMedida  : ModalDirective;

    @Input() mostrarModal : boolean;
    @Output() resultadoConsulta : EventEmitter<boolean> = new EventEmitter<boolean>();
    public isVisible: boolean = false;

    constructor(
        private _UnidadMedidaServicio : UnidadMedidaService
        , private _clasificacionService : ClasificacionProductoService
        , private _clasificacionUnidad: ClasificacionUnidadMedidaService
        , private fBuilderUnidadMedida: FormBuilder
    ) {
        this.initFormAdd();
        this.getClasificacionUnidades();
        this.unidadMedida = new UnidadMedida();

    }

    ngOnInit() {

        $(document).ready(function () {
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


    eventoClick(event){
        console.log(event.dismissReason)
        if( !isNull(event.dismissReason) && !isUndefined(event.dismissReason) )
            if( (event.dismissReason).toString() == ( 'backdrop-click')) {
                this.hideModal();
            }
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
                        this.resultadoConsulta.emit(true);
                    })
                } else {
                    Utilidades.showMsgInfo('Ha ocurrido un error al insertar la unidad, intentalo nuevamente',this.tituloPantalla);
                }
            },
            error=>{
                Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
            }
        )

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

    changeClasificacionUnidad(event) {

        if(isNull(event)) {
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
