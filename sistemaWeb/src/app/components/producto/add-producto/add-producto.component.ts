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
import {ClasificacionProducto} from "../../../models/ClasificacionProducto";
import {ClasificacionProductoService} from "../../../services/clasificacion-producto.service";
import {SubClasificacionProductoService} from "../../../services/sub-clasificacion-producto.service";
import {SubClasificacionProducto} from "../../../models/SubClasificacionProducto";
import {ProductoService} from "../../../services/producto.service";
<<<<<<< Updated upstream
=======
import {CustomValidators} from "../../../validadores/CustomValidators";
import {Utilidades} from "../../Utilidades";
>>>>>>> Stashed changes

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css'],

})

<<<<<<< Updated upstream

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
=======
export class AddProductoComponent implements OnInit, AfterViewInit {
>>>>>>> Stashed changes


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
    , private _clasificacionService: ClasificacionProductoService
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
<<<<<<< Updated upstream
    this.cargarCategorias();
    this.getClasificaciones();
    /*this.getSubClasificacionByIdClasificacion(1);*/
    this.getSubClasificaciones();
=======

    this.getCategorias();
    this.getClasificaciones();
    this.initFormAddProducto();
    this.onChanges();

  }

  initFormAddProducto() {
    this.formAddProducto =  this._fAddProducto.group({
      'nombreProducto': new FormControl('',[
          Validators.required
          , Validators.minLength(5)
          , Validators.maxLength(100)
          , CustomValidators.espaciosVacios
        ]
>>>>>>> Stashed changes


<<<<<<< Updated upstream
    this.formAddProducto = new FormGroup({
      'nombreProducto': new FormControl(),
      'descripcionProducto': new FormControl(),
      'categoria' : new FormControl(),
      'imagen' : new FormControl(),
      'clasificacion': new FormControl('',Validators.required)

    });

=======
    })
  }
>>>>>>> Stashed changes

  }

<<<<<<< Updated upstream
=======
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

  obtenerDatosFormNuevoProducto() {
>>>>>>> Stashed changes

  getDataNewProducto() {
    this.producto.NombreProducto = this.formAddProducto.value.nombreProducto;
    this.producto.Descripcion = this.formAddProducto.value.descripcionProducto;

   /* if(subclasificacion != null) {
      let variable: number;
      variable = parseInt(subclasificacion.split(':')[1]);
      console.log(variable);
      this.producto.IdSubclasificacion = variable;

    }*/

    let categoria:string = null;
    categoria = $(".selectcategoria").val()[0];

    if(categoria != null) {
      let variable: number;
<<<<<<< Updated upstream
      variable = parseInt(categoria.split(':')[1]);

      this.producto.IdCategoria = variable;
      console.log(variable)
    }

    console.log(this.producto);

=======
      variable = parseInt(categoria);
      this.producto.IdCategoria = variable;
    } else {
      console.log('esta vacio')
    }
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
    this._clasificaionService.getClasificaciones().subscribe(
=======
    this._clasificacionService.getClasificaciones().subscribe(
>>>>>>> Stashed changes

      response =>{
        if(response.clasificaciones){
          this.clasificaciones = response.clasificaciones;
        }
      }, error=>{

      }
    )
  }

<<<<<<< Updated upstream
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
=======
  guardarImagenProducto(){

    if(this.filesToUpload != null){

      this._uploadService.makeFileRequest(
        this.url+'productoUploadImage',
        [],
        this.filesToUpload,
        'token',
        'image').then((result:any)=>{
>>>>>>> Stashed changes
        this.producto.Imagen = result.image;
        console.log(this.producto.Imagen);
    });

  }
<<<<<<< Updated upstream
=======
  crearProducto(){

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
        swal(
          'Producto',
          Utilidades.mensajeError(error),
          'error'
        )
      }
    )
  }
>>>>>>> Stashed changes

  //Subir un archivo
  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;

  }
  createProducto(myForm: NgForm){

    this.getDataNewProducto();

    this._productoService.createProducto(this.producto).subscribe(
      response =>{

      }, error =>{

      }
    )
    this.uploadImage();
   /* let variable = null;
    variable = $( ".selectclasificacion" ).val();

<<<<<<< Updated upstream
    console.log(variable[0]);

    if(variable[0] == null){
      console.log('No hay dato en la variable');
    }*/
  /*  this.formAddProducto.controls['make'].valueChanges.subscribe((value) => {
      console.log(value);
=======
  validarCamposProduto(){
>>>>>>> Stashed changes

    });*/
    /*console.log(myForm.value.proveedor);*/

  }

}
