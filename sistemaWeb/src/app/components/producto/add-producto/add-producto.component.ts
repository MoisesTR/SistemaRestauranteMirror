import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush

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
  onAddSelectClasificacion(event){

    this.producto.IdClasificacion = event.IdClasificacion;

    this._subclasificacionService.getSubClasificacionesByIdClasificacion(event.IdClasificacion).subscribe(
      response =>{
        if(response.subclasificaciones){
          this.subclasificaciones = response.subclasificaciones;
        }
      }, error=>{

      }
    )

  }

  onAddSelectSubClasificacion(event){
    // console.log(event.IdSubClasificacion)
    this.producto.IdSubclasificacion = event.IdSubClasificacion;
  }

  onAddCategoria(event){
    this.producto.IdCategoria = event.IdCategoria;
  }

  getClasificaciones(){

    this._clasificaionService.getClasificaciones().subscribe(

      response =>{
        if(response.clasificaciones){
          this.clasificaciones = [];
          this.clasificaciones.push(response.clasificaciones)
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

  getValueForm(){
    this.producto.NombreProducto = this.formAddProducto.value.nombreProducto;
    this.producto.Descripcion = this.formAddProducto.value.descripcionProducto;
    this.producto.IdEstado = 1;
  }
  crearProducto(){
    this.getValueForm();
    this._productoService.createProducto(this.producto).subscribe(
      response =>{
        if(response.IdProducto){
          swal(
            'Producto',
            'El producto ha sido creado exitosamente!',
            'success'
          ).then(() => {
            this._router.navigate(['/producto']);
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
      'clasificacion': new FormControl('',[
        Validators.required
      ]),
      'subclasificacion': new FormControl('',[
        Validators.required
      ]),

      'categoria': new FormControl('',[
        Validators.required
      ]),

    })
  }

}
