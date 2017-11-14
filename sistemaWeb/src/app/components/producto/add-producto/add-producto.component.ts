import {AfterViewInit, Component, Directive, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {Provedor} from "../../../models/Provedor";
import {ActivatedRoute, Router} from "@angular/router";
import {ProveedorService} from "../../../services/proveedor.service";
import {CategoriaProductoService} from "../../../services/categoria-producto.service";
import {CategoriaProducto} from "../../../models/CategoriaProducto";
import {Envase} from "../../../models/Envase";
import {EnvaseService} from "../../../services/envase.service";
import {UnidadMedida} from "../../../models/UnidadMedida";
import {UploadService} from "../../../services/upload.service";
import {Global} from "../../../services/global";
import {Producto} from "../../../models/Producto";
declare var $:any;
import {FormGroup, FormControl, FormArray, NgForm, Validators} from '@angular/forms';
@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})


export class AddProductoComponent implements OnInit, OnChanges, AfterViewInit {
  ngAfterViewInit(): void {
    $(document).ready(function(){

      $('.selectclasificacion').val(['1', '3']);
      $('.selectclasificacion').trigger('change');
    });

  }
  ngOnChanges(changes: SimpleChanges): void {

    console.log('cambiaste');
   /* this.formAddProducto.get('proveedor').valueChanges.subscribe(val => {
      console.log({val});
    });*/
  }

  public producto : Producto;
  formAddProducto: FormGroup;
  public proveedores: Provedor [];
  public categorias: CategoriaProducto[];
  public envases: Envase[];
  public unidadesMedida : UnidadMedida[];
  public url: string;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _proveedorService: ProveedorService
    , private _categoriaService: CategoriaProductoService
    , private _envaseService: EnvaseService
    , private _uploadService : UploadService

  ) {
    this.url = Global.url;
    this.producto = new Producto(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  }

  ngOnInit() {

    $(document).ready(function(){

      $('.dropify').dropify();

      $(".selectcategoria").select2({
        maximumSelectionLength: 1
      });

      $(".selectcsubclasificacion").select2({
        maximumSelectionLength: 1
      });

      $(".selectproveedor").select2({
        maximumSelectionLength: 1
      });

      $(".selectenvase").select2({
        maximumSelectionLength: 1
      });

      $(".selectempaque").select2({
        maximumSelectionLength: 1
      });

      $(".selectunidadmedida").select2({
        maximumSelectionLength: 1
      });

      $(".selectclasificacion").select2({
        maximumSelectionLength: 1
      });

      $(".selectestado").select2({
        maximumSelectionLength: 1
      });

      $(".selectvalorunidadmedida").select2({
        maximumSelectionLength: 1
      });



    });
    this.cargarCategorias();
    this.formAddProducto = new FormGroup({
      'nombreProducto': new FormControl(),
      'descripcionProducto': new FormControl(),
      'subclasificacion' : new FormControl(),
      'categoria' : new FormControl(),
      'imagen' : new FormControl(),
      'clasificacion': new FormControl('',Validators.required)

    });


  }



cambios(){
    console.log('hola');
}

  cargarCategorias(){

    this._categoriaService.getCategoriasProductos().subscribe(
      response =>{
        if(response.categorias){
          this.categorias = response.categorias;

        } else {

        }
      }, error =>{

      }
    )

  }

  uploadImage(){
    this._uploadService.makeFileRequest(
      this.url+'productoUploadImage',
      [],
      this.filesToUpload,
      'token',
      'image').then((result:any)=>{
        this.producto.Imagen = result.image;
        console.log(this.producto.Imagen);
    });

  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput:any){

    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);

  }
  createProducto(myForm: NgForm){

    /*this.uploadImage();*/
    let variable = null;
    variable = $( ".selectclasificacion" ).val();

    console.log(variable[0]);

    if(variable[0] == null){
      console.log('No hay dato en la variable');
    }
  /*  this.formAddProducto.controls['make'].valueChanges.subscribe((value) => {
      console.log(value);

    });*/
    /*console.log(myForm.value.proveedor);*/

  }

}
