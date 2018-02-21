import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {Provedor} from '../../../models/Provedor';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriaProductoService} from '../../../services/categoria-producto.service';
import {CategoriaProducto} from '../../../models/CategoriaProducto';
import {Envase} from '../../../models/Envase';
import {UnidadMedida} from '../../../models/UnidadMedida';
import {UploadService} from '../../../services/upload.service';
import {Global} from '../../../services/global';
import {Producto} from '../../../models/Producto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClasificacionProducto} from '../../../models/ClasificacionProducto';
import {ClasificacionProductoService} from '../../../services/clasificacion-producto.service';
import {SubClasificacionProductoService} from '../../../services/sub-clasificacion-producto.service';
import {SubClasificacionProducto} from '../../../models/SubClasificacionProducto';
import {ProductoService} from '../../../services/producto.service';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {Utilidades} from '../../Utilidades';


declare var $:any;

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css'],

})

export class AddProductoComponent implements OnInit {

  public producto : Producto;
  formAddProducto: FormGroup;
  public proveedores: Provedor [];
  public categorias: CategoriaProducto[];
  public envases: Envase[];
  public unidadesMedida : UnidadMedida[];
  public clasificaciones: ClasificacionProducto[];
  public subclasificaciones: SubClasificacionProducto[];
  public url: string;
  public optionsSelect2: Select2Options;
  public todoValidado = 0;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _categoriaService: CategoriaProductoService
    , private _uploadService : UploadService
    , private _clasificaionService: ClasificacionProductoService
    , private _subclasificacionService: SubClasificacionProductoService
    , private _productoService : ProductoService
    , private _fAddProducto: FormBuilder
  ) {
    this.url = Global.url;
    this.producto = new Producto(null,null,null,null,null,null,null,null,null,null);

    //Opciones o configuraciones generales de los select2
    this.optionsSelect2 = {
      multiple: true
      , maximumSelectionLength : 1
      , width: '100%'
    }

  }

  ngOnInit() {

    $(document).ready(()=>{
      $(".letras").keypress(function (key) {
        if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas
          && (key.charCode < 65 || key.charCode > 90) //letras minusculas
          && (key.charCode != 45) //retroceso
          && (key.charCode != 241) //ñ
          && (key.charCode != 209) //Ñ
          && (key.charCode != 32) //espacio
          && (key.charCode != 225) //á
          && (key.charCode != 233) //é
          && (key.charCode != 237) //í
          && (key.charCode != 243) //ó
          && (key.charCode != 250) //ú
          && (key.charCode != 193) //Á
          && (key.charCode != 201) //É
          && (key.charCode != 205) //Í
          && (key.charCode != 211) //Ó
          && (key.charCode != 218) //Ú
        )
          return false;
      });
      $('.dropify').dropify();

    });

    this.getCategorias();
    this.getClasificaciones();
    this.initFormAddProducto();
    this.onChanges();

  }

  onChanges(): void{
    this.formAddProducto.valueChanges.subscribe(valor => {
    });
  }

  changeSelectCategoria(event){

    let idCategoria = event.value[0];

    if(idCategoria != null){
      this.producto.IdCategoria = idCategoria;
    } else {
      this.producto.IdCategoria = null;
    }

    this.validarSelect2Campos();
  }

  changeSelectClasificacion(event){

    let idClasificacion = event.value[0];

    if(idClasificacion != null) {
      this.producto.IdClasificacion = idClasificacion;
      this._subclasificacionService.getSubClasificacionesByIdClasificacion(idClasificacion).subscribe(

            response =>{
              if(response.subclasificaciones){
                this.subclasificaciones = response.subclasificaciones;
              }
            }, error=>{

            }
          )
    } else {
      this.subclasificaciones = null;
      this.producto.IdClasificacion = null;
      this.producto.IdSubclasificacion = null;
    }
    this.validarSelect2Campos();
  }

  changeSelectSubClasificacion(event){

    let idSubClasificacion = event.value[0];

    if(idSubClasificacion != null){
      this.producto.IdSubclasificacion = idSubClasificacion;
    } else {
      this.producto.IdSubclasificacion = null;
    }
    this.validarSelect2Campos();
  }

  obtenerDatosFormNuevoProducto() {

    this.producto.NombreProducto = this.formAddProducto.value.nombreProducto;
    this.producto.Descripcion = this.formAddProducto.value.descripcionProducto;
    this.producto.IdEstado = 1;

  }


  getCategorias(){

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

          this.clasificaciones = response.clasificaciones;;

        }
      }, error=>{

      }
    )
  }
  guardarImagenProducto(){

    if(this.filesToUpload != null){

      this._uploadService.makeFileRequest(
        this.url+'productoUploadImage',
        [],
        this.filesToUpload,
        'token',
        'image').then((result:any)=>{
        this.producto.Imagen = result.image;
        this.crearProducto();

      },error =>{
        swal(
          'Producto',
          'Ha ocurrido un error en la carga de la imagen, intenta nuevamente!',
          'error'
        )
      });
    } else {
      this.producto.Imagen = 'nodisponible.png';
      this.crearProducto();
    }

  }
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

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  validarCamposProduto(){
    this.obtenerDatosFormNuevoProducto();
    this.guardarImagenProducto();
  }

  private initFormAddProducto() {
    this.formAddProducto =  this._fAddProducto.group({
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
  }

  validarSelect2Campos(){

    if( this.producto.IdClasificacion == null || this.producto.IdSubclasificacion == null || this.producto.IdCategoria == null){
      this.todoValidado = 0;
    } else {
      this.todoValidado = 1;
    }
  }
}
