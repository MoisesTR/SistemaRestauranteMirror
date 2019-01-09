import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {CategoriaProductoService} from '@app/services/service.index';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriaProducto} from '@app/models/CategoriaProducto';
import {CustomValidators} from '@app/validadores/CustomValidators';
import swal from 'sweetalert2';
import {Utils} from '../../Utils';
import {ModalDirective} from 'ng-uikit-pro-standard';
import {ISubscription} from 'rxjs-compat/Subscription';

@Component({
  selector: 'modal-categoria',
  templateUrl: './modal-categoria.component.html'
})
export class ModalCategoriaComponent implements OnInit, OnDestroy {

  @ViewChild('modalAddCategoria') modalAddCategoria: ModalDirective;
  @Output() resultadoConsulta: EventEmitter<boolean> = new EventEmitter<boolean>();
  public formAddCategoria: FormGroup;
  public categoriaProducto: CategoriaProducto;
  private subscription: ISubscription;
  private peticionEnCurso: boolean = false;

  constructor(
      public _categoriaProductoService: CategoriaProductoService
      , private _formBuilderCategoria: FormBuilder
  ) {
      this.categoriaProducto = new CategoriaProducto();
  }

  ngOnInit() {
    this.initFormAddCategoria();
    this.subscripcionModal();
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

  subscripcionModal() {
      this.subscription = this._categoriaProductoService.notificacion.subscribe(
        mostrarModal => {
            if (mostrarModal) {
                this.formAddCategoria.reset();
                this.modalAddCategoria.show()
            } else {
                this.hideModalAndEmitResult();
            }
        });
  }

  getValuesFormAddCategoria() {
      this.categoriaProducto.NombreCategoria = this.formAddCategoria.value.nombreCategoria;
      this.categoriaProducto.DescripcionCategoria = this.formAddCategoria.value.descripcionCategoria;
  }

  createCategoriaProducto() {
      this.peticionEnCurso = true;
      this.getValuesFormAddCategoria();

      this._categoriaProductoService.createCategoriaProducto(this.categoriaProducto).subscribe(
          response => {
              if (response.IdCategoria) {
                  swal(
                      'Categoría',
                      'La categoría ha sido creada exitosamente!',
                      'success'
                  ).then(() => {
                      this.resetAndHideModal();
                      this.resultadoConsulta.emit(true);
                  });
              } else {
                  Utils.showMsgInfo('Ha ocurrido un error inesperado al crear la categoria,intentalo nuevamente', 'Categoria');
              }
          }, error => {
              Utils.showMsgError(Utils.msgError(error));
          }, () => {
              this.peticionEnCurso = false;
          }
      );
  }

  hideModalAndEmitResult() {
      this.resetAndHideModal();
      this.resultadoConsulta.emit(false);
  }

  resetAndHideModal() {
      this.formAddCategoria.reset();
      this.modalAddCategoria.hide();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
