import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
import {CustomValidators} from "../../../validadores/CustomValidators";
import swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit,AfterViewInit {

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

  ngAfterViewInit(): void {
    var str:string = null;
    $('#clasificacion').change((e)=> {

      str = $( ".selectclasificacion" ).val()[0]

      if(str != null){
        /* console.log(str.split(':')[1]);*/
        let variable:number;
        /*   variable = parseInt(str.split(':')[1]);*/
        variable = parseInt(str);

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

      if($( ".selectsubclasificacion" ).val()[0] != null){
        this.producto.IdSubclasificacion = parseInt($( ".selectsubclasificacion" ).val()[0]);
      }


    });
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

    this.getClasificaciones()
    this.getSubClasificaciones();
    this.getCategorias();

    this.formUpdateProducto =  this.formBuilderUProducto.group({
      'nombreProducto': new FormControl('',[
          Validators.required
          , Validators.minLength(5)
          , Validators.maxLength(100)
          , CustomValidators.espaciosVacios
        ]

      ),
      'descripcionProducto': new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(300)
        , CustomValidators.espaciosVacios
      ]),

    })

    this.getProducto();

  }

  inicializarValoresFormularioProducto(){
    this.formUpdateProducto.controls['nombreProducto'].setValue(this.producto.NombreProducto);
    this.formUpdateProducto.controls['descripcionProducto'].setValue(this.producto.Descripcion);

    $('.selectclasificacion').val(this.producto.IdClasificacion).trigger('change.select2');
    $('.selectsubclasificacion').val(this.producto.IdSubclasificacion).trigger('change.select2');
    $('.selectcategoria').val(this.producto.IdCategoria).trigger('change.select2');
  }

  validarCampos(){
    this.obtenerDatosFormularioProducto();
    this.cargarImagen();
  }

  getProducto(){
    this._route.params.forEach((params: Params)=>{
        let id = params['id'];
        this.producto.IdProducto = id;
        console.log('el id'+id)
        this._productoService.getProducto(id).subscribe(
          response =>{
            if(response.producto){
              this.producto = response.producto;
              this.inicializarValoresFormularioProducto();
            } else {
              this._router.navigate(['producto/list']);
            }
          }, error =>{

          }
        )
    });
  }



  cargarImagen(){
    if(this.filesToUpload != null){

      this._uploadService.makeFileRequest(
        this.url+'productoUploadImage',
        [],
        this.filesToUpload,
        'token',
        'image').then((result:any)=>{
        this.producto.Imagen = result.image;
        this.actualizarProducto();

      },error =>{
        swal(
          'Producto',
          'Ha ocurrido un error en la carga de la imagen, intenta nuevamente!',
          'error'
        )
      });
    } else {
      this.actualizarProducto();
    }

  }

  actualizarProducto(){

    this._productoService.updateProducto(this.producto).subscribe(
      response =>{
        if(response.success){
          swal(
            'Producto',
            'El producto ha sido actualizado exitosamente!',
            'success'
          ).then(() => {

            this._router.navigate(['menu/producto']);

          })

        }

      }, error =>{
        swal(
          'Producto',
          'Ha ocurrido un error interno en el servidor, intente nuevamente',
          'error'
        )

      }
    )
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

  getSubClasificaciones(){

    this._subclasificacionService.getSubClasificaciones().subscribe(

      response =>{
        if(response.subclasificaciones){
          this.subclasificaciones = response.subclasificaciones;
        }
      }, error=>{

      }
    )
  }

  getCategorias(){

    this._categoriaService.getCategoriasProductos().subscribe(

      response =>{
        if(response.categorias){
          this.categorias = response.categorias;
        }
      }, error=>{

      }
    )
  }

  obtenerDatosFormularioProducto() {

    this.producto.NombreProducto = this.formUpdateProducto.value.nombreProducto;
    this.producto.Descripcion = this.formUpdateProducto.value.descripcionProducto;
    this.producto.IdEstado = 1;

    let categoria:string = null;
    categoria = $(".selectcategoria").val()[0];

    if(categoria != null) {
      let variable: number;
      /* variable = parseInt(categoria.split(':')[1]);*/
      variable = parseInt(categoria);

      this.producto.IdCategoria = variable;

    } else {

    }
  }



}
