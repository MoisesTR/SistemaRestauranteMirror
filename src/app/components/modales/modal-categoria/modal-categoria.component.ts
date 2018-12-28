import {AfterViewInit, Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CategoriaProductoService} from '../../../services/shared/categoria-producto.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriaProducto} from '../../../models/CategoriaProducto';
import {ModalDirective} from 'ng-uikit-pro-standard';
import {CustomValidators} from '../../../validadores/CustomValidators';
import swal from 'sweetalert2';
import {Utils} from '../../Utils';

@Component({
  selector: 'modal-categoria',
  templateUrl: './modal-categoria.component.html'
})
export class ModalCategoriaComponent implements OnInit, AfterViewInit {

  public categoriaProducto: CategoriaProducto;
  @ViewChild('modalAddCategoria') modalAddCategoria: ModalDirective;
  @Input() mostrarModal: boolean;
  @Output() resultadoModal: EventEmitter<ModalDirective> = new EventEmitter<ModalDirective>();
  @Output() resultadoConsulta: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isVisible = false;
  public isModalShown = false;
  public formAddCategoria: FormGroup;


  constructor(
      private _categoriaProductoServicio: CategoriaProductoService
      , private _formBuilderCategoria: FormBuilder
  ) {
      this.categoriaProducto = new CategoriaProducto();
  }

  ngOnInit() {

    this.initFormAddCategoria();

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
      if (event.keyCode === 27) {
          this.hideModal();
      }
  }

  show() {
      this.isVisible = true;
  }

  ngAfterViewInit() {
        this.modalAddCategoria.show();
  }


    eventoClick(event) {
        if (!Utils.notNullOrUndefined(event.dismissReason) ) {
            if ( (event.dismissReason).toString() === ( 'backdrop-click')) {
                this.hideModal();
            }
        }
  }

    /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddCategoria() {

      this.formAddCategoria = this._formBuilderCategoria.group({
          'nombreCategoria': new FormControl('',
              [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(100),
                  CustomValidators.nospaceValidator
              ])
          , 'descripcionCategoria': new FormControl('',
              [
                  Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(300),
                  CustomValidators.nospaceValidator
              ])
      });

  }

  getValuesFormAddCategoria() {
      this.categoriaProducto.NombreCategoria = this.formAddCategoria.value.nombreCategoria;
      this.categoriaProducto.DescripcionCategoria = this.formAddCategoria.value.descripcionCategoria;
  }

  createCategoriaProducto() {
      this.getValuesFormAddCategoria();

      this._categoriaProductoServicio.createCategoriaProducto(this.categoriaProducto).subscribe(
          response => {

              if (response.IdCategoria) {

                  swal(
                      'Categoría',
                      'La categoría ha sido creada exitosamente!',
                      'success'
                  ).then(() => {
                      this.modalAddCategoria.hide();
                      this.formAddCategoria.reset();
                      this.resultadoConsulta.emit(true);
                  });

              } else {
                  Utils.showMsgInfo('Ha ocurrido un error inesperado al crear el empaque,intentalo nuevamente', 'Categoria');


              }
              /* this.getCategoriasProductos();*/
          }, error => {
              Utils.showMsgError(Utils.msgError(error));

          }
      );
  }


  public showModal(): void {
      this.isModalShown = true;
  }

  public hideModal() {
      this.modalAddCategoria.hide();
      this.resultadoConsulta.emit(false);
  }

}
