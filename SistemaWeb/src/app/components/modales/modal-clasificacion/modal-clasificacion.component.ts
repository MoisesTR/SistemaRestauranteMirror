import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ClasificacionProducto} from '../../../models/ClasificacionProducto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriaProducto} from '../../../models/CategoriaProducto';
import {ModalDirective} from '../../../typescripts/free/modals';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriaProductoService} from '../../../services/categoria-producto.service';
import {ClasificacionProductoService} from '../../../services/clasificacion-producto.service';
import swal from "sweetalert2";
import {Utilidades} from '../../Utilidades';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {isNull, isUndefined} from 'util';

@Component({
  selector: 'app-modal-clasificacion',
  templateUrl: './modal-clasificacion.component.html',
  styleUrls: ['./modal-clasificacion.component.scss']
})
export class ModalClasificacionComponent implements OnInit {

  public clasificacion : ClasificacionProducto;
  public formAddClasificacion: FormGroup;
  public categorias : CategoriaProducto[];
  public tituloPantalla : string = 'Clasificación';
  public isVisible: boolean = false;

  @ViewChild('modalAddClasificacion') modalAddClasificacion : ModalDirective;
  @Input() mostrarModal : boolean;
  @Output() resultadoModal : EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  @Output() resultadoConsulta : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private _route: ActivatedRoute
      , private _router: Router
      , private _clasificacionService : ClasificacionProductoService
      , private _categoriaService : CategoriaProductoService
      , private formBuilderClasificacion : FormBuilder
  ) {
      this.clasificacion = new ClasificacionProducto();
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
    this.modalAddClasificacion.show();
  }


  ngOnInit() {
      this.initFormAddClasificacion();
      this.getCategorias();
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddClasificacion(){

      this.formAddClasificacion = this.formBuilderClasificacion.group({
          'nombreClasificacion': new FormControl('',[
              Validators.required
              , Validators.minLength(5)
              , Validators.maxLength(100)
              , CustomValidators.espaciosVacios
          ])
          , 'descripcionClasificacion': new FormControl('',[
              Validators.required
              , Validators.minLength(5)
              , Validators.maxLength(300)
              , CustomValidators.espaciosVacios
          ])
          , 'categoria': new FormControl('',[
              Validators.required
          ])
      });

  }

  getCategorias() {
      this._categoriaService.getCategoriasProductos().subscribe(
          response => {
              if(response.categorias){
                  this.categorias = response.categorias;
              } else {
                  Utilidades.showMsgInfo('Ha ocurrido un error al cargar las categorias',this.tituloPantalla);
              }
          }, error => {
              Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
          }, () =>{

          }
      )
  }

  createClasificacion(){

      this.clasificacion.DescripcionClasificacion = this.formAddClasificacion.value.descripcionClasificacion;
      this.clasificacion.NombreClasificacion = this.formAddClasificacion.value.nombreClasificacion;

      this._clasificacionService.createClasificacionProducto(this.clasificacion).subscribe(
          response =>{

              if(response.IdClasificacion){
                  swal(
                      'Clasificación',
                      'La clasificación ha sido creada exitosamente!',
                      'success'
                  ).then(() => {
                      this.modalAddClasificacion.hide();
                      this.formAddClasificacion.reset();
                      this.clasificacion = new ClasificacionProducto();
                      this.resultadoConsulta.emit(true);
                  })
              } else {
                  Utilidades.showMsgError('Ha ocurrido un error al insertar la categoria, intenta nuevamente!',this.tituloPantalla);
              }
          },
          error=>{
              Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
          }
      )
      // this.formAddClasificacion.reset;
  }

  onChangeCategoria(event) {
        if(isNull(event)){
            this.clasificacion.IdCategoria = null;
        } else {
            this.clasificacion.IdCategoria = event.IdCategoria;
        }
  }

  public hideModal() {
    this.modalAddClasificacion.hide();
    this.resultadoConsulta.emit(false);
  }

}
