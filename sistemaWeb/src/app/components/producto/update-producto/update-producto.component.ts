import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Provedor} from "../../../models/Provedor";
import {Producto} from "../../../models/Producto";
import {CategoriaProducto} from "../../../models/CategoriaProducto";
import {Envase} from "../../../models/Envase";
import {UnidadMedida} from "../../../models/UnidadMedida";
import {ClasificacionProducto} from "../../../models/ClasificacionProducto";
import {SubClasificacionProducto} from "../../../models/SubClasificacionProducto";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UploadService} from "../../../services/upload.service";
import {ClasificacionProductoService} from "../../../services/clasificacion-producto.service";
import {ProductoService} from "../../../services/producto.service";
import {Global} from "../../../services/global";
import {SubClasificacionProductoService} from "../../../services/sub-clasificacion-producto.service";
import {CategoriaProductoService} from "../../../services/categoria-producto.service";

declare var $:any;
@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  public producto : Producto;
  formUpdateProducto: FormGroup;
  public proveedores: Provedor [];
  public categorias: CategoriaProducto[];
  public envases: Envase[];
  public unidadesMedida : UnidadMedida[];
  public clasificaciones: ClasificacionProducto[];
  public subclasificaciones: SubClasificacionProducto[];
  public url: string;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _categoriaService: CategoriaProductoService
    , private _uploadService : UploadService
    , private _clasificaionService: ClasificacionProductoService
    , private _subclasificacionService: SubClasificacionProductoService
    , private _productoService : ProductoService
    , private formBuilderUProducto : FormBuilder
  ) {
    this.url = Global.url;
    this.producto = new Producto(null,null,null,null,null,null,null,null,null,null);
  }

  ngOnInit() {

    $(document).ready(function(){

      /*$("#imageProducto").attr("data-default-file", this.url + 'productoGetImage/' + this.producto.Imagen);*/
      $('.dropify').dropify();

      $(".selectcategoria").select2({
        maximumSelectionLength: 1
      });

      $(".selectsubclasificacion").select2({
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

    this.getClasificaciones();
    this.formUpdateProducto = this.formBuilderUProducto.group({
      'nombreProducto' : new FormControl(this.producto.NombreProducto)
      , 'descripcionProducto': new FormControl(this.producto.NombreProducto)
    })

    this.getProducto();

  }

  updateProducto(){

  }

  getProducto(){
    this._route.params.forEach((params: Params)=>{
        let id = params['id'];
        console.log('el id'+id)
        this._productoService.getProducto(id).subscribe(
          response =>{
            if(response.producto){
              this.producto = response.producto;
              this.setValuesProducto();
            } else {
              this._router.navigate(['producto/list']);
            }
          }, error =>{

          }
        )
    });
  }

  setValuesProducto(){
    this.formUpdateProducto.controls['nombreProducto'].setValue(this.producto.NombreProducto);
    this.formUpdateProducto.controls['descripcionProducto'].setValue(this.producto.Descripcion);

    $('.selectclasificacion').val(this.producto.IdSubclasificacion).trigger('change.select2');
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

  getClasificaciones(){

    this._clasificaionService.getClasificaciones().subscribe(

      response =>{
        if(response.clasificaciones){
          this.clasificaciones = response.clasificaciones;
        }
      }, error=>{

      }
    )
  }

}
