import {Component, OnInit, ViewChild} from '@angular/core';
import { CategoriaProductoService} from '../../services/categoria-producto.service'
import { ActivatedRoute, Router} from "@angular/router";
import { CategoriaProducto } from '../../models/CategoriaProducto';
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";
import {FormGroup, FormControl, FormArray, NgForm, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from "angular-datatables";
import {CustomValidators} from "../../validadores/CustomValidators";

declare var $:any;

@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css'],
  providers: [CategoriaProductoService]
})
export class CategoriaProductoComponent implements OnInit {

  public categoriaProducto: CategoriaProducto;
  public categoriasProductos: CategoriaProducto[];
  public mensaje : string;

  public formAddCategoria: FormGroup;
  public formUpdateCategoria: FormGroup;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoriaProductoServicio : CategoriaProductoService
  ) {
    this.categoriaProducto = new CategoriaProducto(null,null,null,null);
  }

  ngOnInit() {

    this.settingsDatatable();
    this.getCategorias();
    this.initFormAddCategoria();
    this.initFormUpdateCategoria();

    this.onChanges();
  }

  cleanForm(){
    this.formAddCategoria.reset();
  }
  onChanges(): void {
    this.formAddCategoria.valueChanges.subscribe(val => {
     console.log('Mensaje');
    });
  }
  settingsDatatable(){

    /*PROPIEDADES GENERALES DE LA DATATABLE*/
    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      /*,select: true*/
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

  getCategorias(){

    this._categoriaProductoServicio.getCategoriasProductos().subscribe(
      response => {
        if(response.categorias){
          this.categoriasProductos = response.categorias;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );
  }

  getCategoriasRender(){
    this._categoriaProductoServicio.getCategoriasProductos().subscribe(
      response => {
        if(response.categorias){
          this.categoriasProductos = response.categorias;
          this.rerender();
        }
      }, error =>{

      }
    );
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddCategoria(){

    this.formAddCategoria = new FormGroup({
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

  initFormUpdateCategoria(){

    this.formUpdateCategoria = new FormGroup({
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

  getValuesFormUpdateCategoria(){

    this.categoriaProducto.NombreCategoria = this.formUpdateCategoria.value.nombreCategoria;
    this.categoriaProducto.DescripcionCategoria = this.formUpdateCategoria.value.descripcionCategoria;
  }

  showModalUpdateCategoria(categoria){

    $('#modalUpdateCategoria').modal('show');
    let Categoria : CategoriaProducto;
    Categoria = categoria;

    this.categoriaProducto.IdCategoria = Categoria.IdCategoria;

    this.formUpdateCategoria.reset();
    this.formUpdateCategoria.setValue({
      nombreCategoria: Categoria.NombreCategoria
      , descripcionCategoria: Categoria.DescripcionCategoria
    });


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
            $('#modalAddCategoria').modal('toggle');
            this.formAddCategoria.reset();
            this.categoriaProducto = new CategoriaProducto(null,null,null,null);
            this.getCategoriasRender();
          })

        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar la categoria, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');

        }
        this.getCategoriasProductos();
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
  }

  getCategoriaProducto(IdCategoria){

    this._categoriaProductoServicio.getCategoriaProducto(IdCategoria).subscribe(
      response => {

        if(!response.categoria){

        } else {
          this.categoriaProducto = response.categoria;
        }
      },error => {
        console.log(<any>error);
      }
    )
  }

  getCategoriasProductos(){
    this._categoriaProductoServicio.getCategoriasProductos().subscribe(
      response => {

        if(!response.Categorias){
          console.log('Ha ocurrido un error');
        } else {
          this.categoriasProductos = response.categorias;
        }
      },error => {
        console.log(<any>error);
    }
    )
  }

  updateCategoria(){

    this.getValuesFormUpdateCategoria();

    this._categoriaProductoServicio.updateCategoriaProducto(this.categoriaProducto).subscribe(
      response =>{
        if(response.success){
          swal(
            'Categoría',
            'La categoría ha sido actualizada exitosamente!',
            'success'
          ).then(() => {
            $('#modalUpdateCategoria').modal('toggle');
            this.formUpdateCategoria.reset();
            this.getCategoriasRender();
          })


        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error en la actualizacion, intenta nuevamente!',
            'error'
          )
        }
      }, error =>{
        if (error.status == 500) {
          swal(
            'Error inesperado',
            'Ha ocurrido un error en el servidor, intenta nuevamente!',
            'error'
          )
        }
      }
    )

    this.categoriaProducto = new CategoriaProducto(null, null, null, null);

  }

  deleteCategoria(IdCategoria){

    swal({
      title: "Estas seguro(a)?",
      text: "La categoria sera eliminada permanentemente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!'
    }).then((eliminar) => {
      if (eliminar) {
        this._categoriaProductoServicio.deleteCategoriaProducto(IdCategoria).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminada!',
                'La categoría ha sido eliminada exitosamente',
                'success'
              ).then(() => {
               this.getCategoriasRender();
              })
            } else {
              swal(
                'Error inesperado',
                'Ha ocurrido un error en la eliminación, intenta nuevamente!',
                'error'
              )
            }
          }, error =>{
            if(error.status = 500){
              swal(
                'Error inesperado',
                'Ha ocurrido un error en el servidor, intenta nuevamente!',
                'error'
              )
            }
          }
        )

      }
    });

  }

}
