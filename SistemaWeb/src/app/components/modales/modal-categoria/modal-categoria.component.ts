import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CategoriaProductoService} from '../../../services/categoria-producto.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriaProducto} from '../../../models/CategoriaProducto';
import {ModalDirective} from '../../../typescripts/free/modals';
import {CustomValidators} from '../../../validadores/CustomValidators';
import swal from 'sweetalert2';
import {isNull} from 'util';

@Component({
  selector: 'modal-categoria',
  templateUrl: './modal-categoria.component.html'
})
export class ModalCategoriaComponent implements OnInit {

  public categoriaProducto: CategoriaProducto;
  @ViewChild('modalAddCategoria') modalAddCategoria : ModalDirective;
  @Input() mostrarModal : boolean;
  @Output() resultadoModal : EventEmitter<boolean> = new EventEmitter<boolean>();
  public isModalShown:boolean = false;
  public formAddCategoria: FormGroup;


  constructor(
      private _categoriaProductoServicio : CategoriaProductoService
      , private _formBuilderCategoria: FormBuilder
  ) {
      this.categoriaProducto = new CategoriaProducto();
  }

  ngOnInit() {

    this.initFormAddCategoria();
    this.showModal();

  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
      if (event.keyCode === 27) {
          this.hideModal();
      }
  }

  eventoClick(event : ModalDirective){

      if( !isNull(event.dismissReason) )
          if( (event.dismissReason).toString() == ( 'backdrop-click')) {
              this.hideModal();
          }
  }

    /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddCategoria(){

      this.formAddCategoria = this._formBuilderCategoria.group({
          'nombreCategoria': new FormControl('',
              [
                  Validators.required,
                  Validators.minLength(5),
                  Validators.maxLength(100),
                  CustomValidators.espaciosVacios
              ])
          , 'descripcionCategoria': new FormControl('',
              [
                  Validators.required,
                  Validators.minLength(5),
                  Validators.maxLength(300),
                  CustomValidators.espaciosVacios
              ])
      });

  }

  getValuesFormAddCategoria(){
      this.categoriaProducto.NombreCategoria = this.formAddCategoria.value.nombreCategoria;
      this.categoriaProducto.DescripcionCategoria = this.formAddCategoria.value.descripcionCategoria;
  }

  createCategoriaProducto(){
      this.getValuesFormAddCategoria();

      this._categoriaProductoServicio.createCategoriaProducto(this.categoriaProducto).subscribe(
          response => {

              if (response.IdCategoria) {

                  swal(
                      'Categoría',
                      'La categoría ha sido creada exitosamente!',
                      'success'
                  ).then(() => {
                      this.formAddCategoria.reset();
                  })

              } else {
                  swal(
                      'Error inesperado',
                      'Ha ocurrido un error al insertar la categoria, intenta nuevamente!',
                      'error'
                  )
                  console.log('Ha ocurrido un error en el servidor, intenta nuevamente');

              }
              /* this.getCategoriasProductos();*/
          }, error => {
              if (error.status == 500) {
                  swal(
                      'Error inesperado',
                      'Ha ocurrido un error en el servidor, intenta nuevamente!',
                      'error'
                  )
                  console.log('Ha ocurrido un error en el servidor, intenta nuevamente');
              }

          }
      )

      this.resultadoModal.emit(true);
  }


  public showModal():void {
      this.isModalShown = true;
  }

  public hideModal() {
      this.modalAddCategoria.hide();
      this.resultadoModal.emit(true);
  }


}
