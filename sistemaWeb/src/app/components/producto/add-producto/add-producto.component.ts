import {AfterViewInit, Component, Directive, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import swal from 'sweetalert2';
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
import {ClasificacionProducto} from "../../../models/ClasificacionProducto";
import {ClasificacionProductoService} from "../../../services/clasificacion-producto.service";
import {SubClasificacionProductoService} from "../../../services/sub-clasificacion-producto.service";
import {SubClasificacionProducto} from "../../../models/SubClasificacionProducto";
import {ProductoService} from "../../../services/producto.service";

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css'],

})


export class AddProductoComponent implements OnInit, AfterViewInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {

    console.log('cambio')
  }

  ngAfterViewInit(): void {
    var str:string = null;
    $('#clasificacion').change((e)=> {

      str = $( ".selectclasificacion" ).val()[0]
      if(str != null){
        console.log(str.split(':')[1]);
        let variable:number;
        variable = parseInt(str.split(':')[1]);
        console.log('arriba')
        console.log(variable)

        this._subclasificacionService.getSubClasificacionByIdClasificacion(variable).subscribe(

          response =>{
            if(response.subclasificaciones){

              this.subclasificaciones = response.subclasificaciones;
              console.log(this.subclasificaciones);
              $('.selectsubclasificacion').val(null)
                .trigger('change');

            }
          }, error=>{

          }
        )
      }
    });

    $('#subclasificacion').change((e)=> {

      this.producto.IdSubclasificacion = parseInt($( ".selectsubclasificacion" ).val()[0]);

    });
  }


  public producto : Producto;
  formAddProducto: FormGroup;
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
    this.cargarCategorias();
    this.getClasificaciones();
    /*this.getSubClasificacionByIdClasificacion(1);*/
    this.getSubClasificaciones();


    this.formAddProducto = new FormGroup({
      'nombreProducto': new FormControl(),
      'descripcionProducto': new FormControl(),
      'categoria' : new FormControl(),
      'imagen' : new FormControl(),
      'clasificacion': new FormControl('',Validators.required)

    });


  }


  getDataNewProducto() {
    this.producto.NombreProducto = this.formAddProducto.value.nombreProducto;
    this.producto.Descripcion = this.formAddProducto.value.descripcionProducto;
    this.producto.IdEstado = 1;
    /*this.producto.Imagen = */

    let categoria:string = null;
    categoria = $(".selectcategoria").val()[0];

    if(categoria != null) {
      let variable: number;
      variable = parseInt(categoria.split(':')[1]);

      this.producto.IdCategoria = variable;
      console.log(variable)
    }



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

  getSubClasificacionByIdClasificacion(IdClasificacion){

    this._subclasificacionService.getSubClasificacionByIdClasificacion(IdClasificacion).subscribe(

      response =>{
        if(response.subclasificaciones){
          this.subclasificaciones = response.subclasificaciones;
        }
      }, error =>{

      }
    )

  }

  getSubClasificaciones(){
    this._subclasificacionService.getSubClasificaciones().subscribe(

      response =>{
        if(response.subclasificaciones){
          this.subclasificaciones = response.subclasificaciones;
          console.log(this.subclasificaciones)
        }
      }, error=>{

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
      this._productoService.createProducto(this.producto).subscribe(
        response =>{
          if(response.IdProducto){
            swal(
              'Producto',
              'El producto ha sido creado exitosamente!',
              'success'
            ).then(() => {

              this._router.navigate(['menu/producto']);

            })

          }

        }, error =>{

        }
      )
    });

  }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput:any){

    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);

  }
  createProducto(myForm: NgForm){

    this.getDataNewProducto();
    this.uploadImage();



   /* let variable = null;
    variable = $( ".selectclasificacion" ).val();

    console.log(variable[0]);

    if(variable[0] == null){
      console.log('No hay dato en la variable');
    }*/
  /*  this.formAddProducto.controls['make'].valueChanges.subscribe((value) => {
      console.log(value);

    });*/
    /*console.log(myForm.value.proveedor);*/

  }

}
