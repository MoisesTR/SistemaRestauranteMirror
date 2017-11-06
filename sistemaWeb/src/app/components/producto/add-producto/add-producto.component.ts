import {Component, Directive, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup, NG_VALIDATORS, NgForm, ValidationErrors,
  Validator
} from "@angular/forms";
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

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css']
})


export class AddProductoComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {

    this.formAddProducto.get('proveedor').valueChanges.subscribe(val => {
      console.log({val});
    });
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
    });

    $(".selectcategoria").select2({
      maximumSelectionLength: 1
    });

    $(".selectcsubclasificación").select2({
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

    this.formAddProducto = new FormGroup({
      'proveedor': new FormControl(),
      'nombreProducto': new FormControl()

    });
    $(".selectcargo").select2();

    this.cargarProveedores();
    this.cargarCategorias();
    this.cargarEnvases();

  }

  cargarProveedores(){

    this._proveedorService.getProveedores().subscribe(
      response =>{
        if(response.proveedores){
          this.proveedores = response.proveedores;
        } else {

        }
      }, error =>{

      }
    )
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

  cargarEnvases(){
    this._envaseService.getEnvases().subscribe(
      response =>{
        if(response.envases){
          this.envases = response.envases;
        } else {

        }
      }, error =>{

      }
    )
  }

  cargarUnidadesDeMedida(){

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


    this.uploadImage();
  /*  this.formAddProducto.controls['make'].valueChanges.subscribe((value) => {
      console.log(value);

    });*/
    /*console.log(myForm.value.proveedor);*/

  }

}
