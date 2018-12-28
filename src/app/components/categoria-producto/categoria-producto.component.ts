import {Component, OnInit, ViewChild} from '@angular/core';
import {CategoriaProductoService} from '../../services/shared/categoria-producto.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriaProducto} from '../../models/CategoriaProducto';
import {Subject} from 'rxjs';
import {idioma_espanol} from '../../services/shared/global';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import {CustomValidators} from '../../validadores/CustomValidators';
import {ModalDirective} from 'ng-uikit-pro-standard';
import {Utils} from '../Utils';

declare var $: any;

@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css'],
  providers: [CategoriaProductoService]
})
export class CategoriaProductoComponent implements OnInit, InvocarFormulario {

  public categoriaProducto: CategoriaProducto;
  public categoriasProductos: CategoriaProducto[];
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  @ViewChild('modalAddCategoria') modalAddCategoria: ModalDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  public formAddCategoria: FormGroup;
  public formUpdateCategoria: FormGroup;
  public tituloPantalla = 'Categoria';

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _categoriaProductoServicio: CategoriaProductoService
    , private _formBuilderCategoria: FormBuilder
  ) {
    this.categoriaProducto = new CategoriaProducto();
  }


  ngOnInit() {
    this.settingsDatatable();
    this.getCategorias();
    this.initFormAddCategoria();
    this.initFormUpdateCategoria();

  }

  settingsDatatable() {

    /*PROPIEDADES GENERALES DE LA DATATABLE*/
      this.dtOptions = <DataTables.Settings>{
          pagingType: 'full_numbers'
          , pageLength: 10
          , language: idioma_espanol
          , 'lengthChange': false
          , responsive : true
          , dom: 'Bfrtip',
          buttons: [
              {
                  text: 'Agregar',
                  key: '1',
                  className: 'btn orange-chang float-right-dt',
                  action:  (e, dt, node, config) => {
                      // this._router.navigate(['producto/add']);
                      this.InvocarModal(this.modalAddCategoria, this.formAddCategoria);
                  }
              }
          ]
      };
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  getCategorias() {

    this._categoriaProductoServicio.getCategoriasProductos().subscribe(
      response => {
        if (response.categorias) {
          this.categoriasProductos = response.categorias;
          this.dtTrigger.next();
        }
      }, error => {

      }
    );
  }

  getCategoriasRender() {
    this._categoriaProductoServicio.getCategoriasProductos().subscribe(
      response => {
        if (response.categorias) {
          this.categoriasProductos = response.categorias;
          this.rerender();
        }
      }, error => {

      }
    );
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

  initFormUpdateCategoria() {

    this.formUpdateCategoria = this._formBuilderCategoria.group({
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

  getValuesFormUpdateCategoria() {
    this.categoriaProducto.NombreCategoria = this.formUpdateCategoria.value.nombreCategoria;
    this.categoriaProducto.DescripcionCategoria = this.formUpdateCategoria.value.descripcionCategoria;
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
            this.categoriaProducto = new CategoriaProducto();
            this.getCategoriasRender();
          });

        } else {
            Utils.showMsgError('Ha ocurrido un error al insertar la categoria, intenta nuevamente!', this.tituloPantalla);
        }
      }, error => {
          Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    );
  }

  updateCategoria(Modal) {

    this.getValuesFormUpdateCategoria();

    this._categoriaProductoServicio.updateCategoriaProducto(this.categoriaProducto).subscribe(
      response => {
        if (response.success) {
          swal(
            'Categoría',
            'La categoría ha sido actualizada exitosamente!',
            'success'
          ).then(() => {
            Modal.hide();
            this.formUpdateCategoria.reset();
            this.getCategoriasRender();
            this.categoriaProducto = new CategoriaProducto();
          });

        } else {
          Utils.showMsgError('Ha ocurrido un error inesperado en la actualización , intenta nuevamente');
        }
      }, error => {
          Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    );

  }


  invocarModalUpdate(Modal, Categoria: CategoriaProducto) {

      this.categoriaProducto.IdCategoria = Categoria.IdCategoria;
      this.categoriaProducto.NombreCategoria = Categoria.NombreCategoria;
      this.categoriaProducto.DescripcionCategoria = Categoria.DescripcionCategoria;

      this.formUpdateCategoria.reset();
      this.formUpdateCategoria.setValue( {
          nombreCategoria: Categoria.NombreCategoria
          , descripcionCategoria: Categoria.DescripcionCategoria
      });

    Modal.show();
  }

  deleteCategoria(IdCategoria) {

    swal({
      title: 'Estas seguro(a)?',
      text: 'La categoria sera eliminada permanentemente!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            this._categoriaProductoServicio.deleteCategoriaProducto(IdCategoria).subscribe(
                response => {
                    if (response.success) {
                        swal(
                            'Eliminada!',
                            'La categoría ha sido eliminada exitosamente',
                            'success'
                        ).then(() => {
                            this.getCategoriasRender();
                        });
                    } else {
                        Utils.showMsgInfo('Ha ocurrido un error al eliminar', this.tituloPantalla);
                    }
                }, error => {
                    Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
                }
            );
        } else if (result.dismiss === swal.DismissReason.cancel) {

        }
    });
  }

  InvocarModal(Modal, Formulario) {
      Utils.invocacionModal(Modal, Formulario);
  }

}
