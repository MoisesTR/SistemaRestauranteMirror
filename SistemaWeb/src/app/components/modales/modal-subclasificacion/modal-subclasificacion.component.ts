import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {SubClasificacionProducto} from '../../../models/SubClasificacionProducto';
import {ClasificacionProducto} from '../../../models/ClasificacionProducto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SubClasificacionProductoService} from '../../../services/sub-clasificacion-producto.service';
import {ClasificacionProductoService} from '../../../services/clasificacion-producto.service';
import {CustomValidators} from '../../../validadores/CustomValidators';
import swal from "sweetalert2";
import {Utilidades} from '../../Utilidades';
import {isNull, isUndefined} from 'util';
import {ModalDirective} from '../../../typescripts/free/modals';

@Component({
  selector: 'modal-subclasificacion',
  templateUrl: './modal-subclasificacion.component.html'
})
export class ModalSubclasificacionComponent implements OnInit {

  public subclasificacion: SubClasificacionProducto;
  public clasificaciones: ClasificacionProducto;
  formAddSubClasificacion : FormGroup;
  public tituloPantalla  : string  = 'Subclasificación';

  @ViewChild('modalAddSubclasificacion') modalAddSubclasificacion  : ModalDirective;

  @Input() mostrarModal : boolean;
  @Output() resultadoModal : EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  @Output() resultadoConsulta : EventEmitter<boolean> = new EventEmitter<boolean>();
  public isVisible: boolean = false;


  constructor(
      private _route: ActivatedRoute
      , private _router: Router
      , private _subClasificacionService : SubClasificacionProductoService
      , private _clasificacionService: ClasificacionProductoService
      , private formBuilderSubClasificacion : FormBuilder

  ) {
      this.subclasificacion = new SubClasificacionProducto();
      this.initFormAddSubclasificacion();
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

  show() {
    this.isVisible = true;
  }

  ngAfterViewInit(){
    this.modalAddSubclasificacion.show();
  }

  private initFormAddSubclasificacion(){

      this.formAddSubClasificacion = this.formBuilderSubClasificacion.group({
          'nombreSubClasificacion' : new FormControl('',[
              Validators.required
              , Validators.minLength(5)
              , Validators.maxLength(100)
              , CustomValidators.espaciosVacios
          ])
          , 'descripcionSubClasificacion' : new FormControl('',[
              Validators.required
              , Validators.minLength(5)
              , Validators.maxLength(300)
              , CustomValidators.espaciosVacios
          ])
          ,'clasificacion' : new FormControl('',[
              Validators.required
          ])
      })

  }

  ngOnInit() {
      this.getClasificaciones();

  }

  capturarDatosIngresados(){
    this.subclasificacion.NombreSubClasificacion = this.formAddSubClasificacion.value.nombreSubClasificacion;
    this.subclasificacion.DescripcionSubClasificacion = this.formAddSubClasificacion.value.descripcionSubClasificacion;
  }

  createSubCasificacion(Modal){

      this.capturarDatosIngresados();

      this._subClasificacionService.createSubClasificacionProducto(this.subclasificacion).subscribe(
          response => {
              if (response.IdSubclasificacion) {
                  swal(
                      'Subclasificación',
                      'la Subclasificación ha sido creado exitosamente!',
                      'success'
                  ).then( () =>  {
                      Modal.hide();
                      this.formAddSubClasificacion.reset();
                      this.resultadoConsulta.emit(true);
                  })
              } else {
                  Utilidades.showMsgError('Ha ocurrido un error al insertar la subclasificación, intenta nuevamente!',this.tituloPantalla);
              }
          }, error => {
              Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
          }
      )
  }

  getClasificaciones(){

      this._clasificacionService.getClasificaciones().subscribe(
          response => {
              if(response.clasificaciones){
                  this.clasificaciones = response.clasificaciones;
              } else {
                  Utilidades.showMsgInfo('Ha ocurrido un error obteniendo las clasificaciones',this.tituloPantalla);
              }

          }, error => {
              Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
          }
      )

  }

  onChangeClasificacion(event){
      if(isNull(event)) {
          this.subclasificacion.IdClasificacion  = null;
      } else {
          this.subclasificacion.IdClasificacion = event.IdClasificacion;
      }
  }

  public hideModal() {
    this.modalAddSubclasificacion.hide();
    this.resultadoConsulta.emit(false);
  }

}
