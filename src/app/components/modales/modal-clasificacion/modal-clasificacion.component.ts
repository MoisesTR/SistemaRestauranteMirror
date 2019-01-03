import {AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ClasificacionProducto} from '@app/models/ClasificacionProducto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriaProducto} from '@app/models/CategoriaProducto';
import {ModalDirective} from 'ng-uikit-pro-standard';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriaProductoService, ClasificacionProductoService} from '@app/services/service.index';
import swal from 'sweetalert2';
import {Utils} from '../../Utils';
import {CustomValidators} from '@app/validadores/CustomValidators';

@Component({
  selector: 'modal-clasificacion',
  templateUrl: './modal-clasificacion.component.html',
  styleUrls: ['./modal-clasificacion.component.scss']
})
export class ModalClasificacionComponent implements OnInit, AfterViewInit {

  public clasificacion: ClasificacionProducto;
  public formAddClasificacion: FormGroup;
  public categorias: CategoriaProducto[];
  public tituloPantalla  = 'Clasificación';
  public isVisible = false;

  @ViewChild('modalAddClasificacion') modalAddClasificacion: ModalDirective;
  @Input() mostrarModal: boolean;
  @Output() resultadoModal: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  @Output() resultadoConsulta: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private _route: ActivatedRoute
      , private _router: Router
      , private _clasificacionService: ClasificacionProductoService
      , private _categoriaService: CategoriaProductoService
      , private formBuilderClasificacion: FormBuilder
  ) {
      this.clasificacion = new ClasificacionProducto();
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
      if (event.keyCode === 27) {
          this.hideModal();
      }
  }

  eventoClick(event) {
      if ( event.dismissReason !== null && event.dismissReason !== undefined ) {
          if ( (event.dismissReason).toString() === ( 'backdrop-click')) {
              this.hideModal();
          }
      }
  }

  show() {
    this.isVisible = true;
  }

  ngAfterViewInit() {
    this.modalAddClasificacion.show();
  }


  ngOnInit() {
      this.initFormAddClasificacion();
      this.getCategorias();
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddClasificacion() {

      this.formAddClasificacion = this.formBuilderClasificacion.group({
          'nombreClasificacion': new FormControl('', [
              Validators.required
              , Validators.minLength(3)
              , Validators.maxLength(100)
              , CustomValidators.nospaceValidator
          ])
          , 'descripcionClasificacion': new FormControl('', [
              Validators.required
              , Validators.minLength(3)
              , Validators.maxLength(300)
              , CustomValidators.nospaceValidator
          ])
          , 'categoria': new FormControl('', [
              Validators.required
          ])
      });

  }

  getCategorias() {
      this._categoriaService.getCategoriasProductos().subscribe(
          response => {
              if (response.categorias) {
                  this.categorias = response.categorias;
              } else {
                  Utils.showMsgInfo('Ha ocurrido un error al cargar las categorias', this.tituloPantalla);
              }
          }, error => {
              Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
          }, () => {

          }
      );
  }

  createClasificacion() {

      this.clasificacion.DescripcionClasificacion = this.formAddClasificacion.value.descripcionClasificacion;
      this.clasificacion.NombreClasificacion = this.formAddClasificacion.value.nombreClasificacion;

      this._clasificacionService.createClasificacionProducto(this.clasificacion).subscribe(
          response => {

              if (response.IdClasificacion) {
                  swal(
                      'Clasificación',
                      'La clasificación ha sido creada exitosamente!',
                      'success'
                  ).then(() => {
                      this.modalAddClasificacion.hide();
                      this.formAddClasificacion.reset();
                      this.clasificacion = new ClasificacionProducto();
                      this.resultadoConsulta.emit(true);
                  });
              } else {
                  Utils.showMsgError('Ha ocurrido un error al insertar la categoria, intenta nuevamente!', this.tituloPantalla);
              }
          },
          error => {
              Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
          }
      );
  }

  onChangeCategoria(event) {
        if (event === null) {
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
