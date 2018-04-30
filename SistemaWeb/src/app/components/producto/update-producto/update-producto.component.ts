import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Proveedor} from '../../../models/Proveedor';
import {Producto} from '../../../models/Producto';
import {CategoriaProducto} from '../../../models/CategoriaProducto';
import {Envase} from '../../../models/Envase';
import {UnidadMedida} from '../../../models/UnidadMedida';
import {ClasificacionProducto} from '../../../models/ClasificacionProducto';
import {SubClasificacionProducto} from '../../../models/SubClasificacionProducto';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UploadService} from '../../../services/upload.service';
import {ClasificacionProductoService} from '../../../services/clasificacion-producto.service';
import {ProductoService} from '../../../services/producto.service';
import {CARPETA_PRODUCTOS, Global} from '../../../services/global';
import {SubClasificacionProductoService} from '../../../services/sub-clasificacion-producto.service';
import {CategoriaProductoService} from '../../../services/categoria-producto.service';
import {CustomValidators} from '../../../validadores/CustomValidators';
import swal from 'sweetalert2';
import {Utilidades} from '../../Utilidades';
import {isNull} from 'util';

declare var $:any;
@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent implements OnInit {

  public producto : Producto;
  formUpdateProducto: FormGroup;
  public proveedores: Proveedor [];
  public categorias: CategoriaProducto[];
  public envases: Envase[];
  public unidadesMedida : UnidadMedida[];
  public clasificaciones: ClasificacionProducto[];
  public subclasificaciones: SubClasificacionProducto[];
  public url: string;
  public removioImagen : boolean = false;

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
    this.producto = new Producto();

  }

  ngOnInit() {

    this.initFormUpdateProducto();
    this.getProducto();
    this.getClasificaciones();
    this.getSubClasificaciones();
    this.getCategorias();

  }

  private initFormUpdateProducto() {
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

  onUpSelectClasificacion(event){

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

  onUpSelectSubClasificacion(event){
    this.producto.IdSubclasificacion = event.IdSubClasificacion;
  }

  onUpCategoria(event){
    this.producto.IdCategoria = event.IdCategoria;
  }


  inicializarValoresFormularioProducto(){
    this.formUpdateProducto.controls['nombreProducto'].setValue(this.producto.NombreProducto);
    this.formUpdateProducto.controls['descripcionProducto'].setValue(this.producto.Descripcion);

  }

  validarCampos(){

    this.obtenerDatosFormularioProducto();
    this.cargarImagen();
  }

  getProducto(){
    this._route.params.forEach((params: Params)=>{

        let id = params['id'];
        this.producto.IdProducto = id;

        this._productoService.getProducto(id).subscribe(
          response =>{
            if(response.producto){
              this.producto = response.producto;

              //Inicializar componentes de la vista
              $(document).ready(()=>{

                var imagenProducto =  this.url + 'getImagen/'+ CARPETA_PRODUCTOS + '/' + this.producto.Imagen;
                var drEvent;

                if(this.producto.Imagen.length > 0) {
                    drEvent = $('.dropify').dropify({
                        defaultFile: imagenProducto
                    });
                }  else {
                    drEvent = $('.dropify').dropify();
                }

                  drEvent.on('dropify.afterClear', (event, element) => {
                      this.removioImagen = true;
                      this.filesToUpload = null;
                  });

              });
              this.inicializarValoresFormularioProducto();
            } else {
              this._router.navigate(['/producto/list']);
            }
          }, error =>{

          }
        )
    });
  }

  getSubClasificaciones(){
    this._subclasificacionService.getSubClasificaciones().subscribe(
      response =>{
        if(response.subclasificaciones){
          this.subclasificaciones = response.subclasificaciones;
        } else {

        }
      },error=>{

      }
    )
  }

  cargarImagen(){

    if(!isNull(this.filesToUpload)) {
      this.removioImagen = false;
    }

    if( (!this.removioImagen && this.producto.Imagen) || isNull(this.filesToUpload)) {
        this.actualizarProducto();
    } else {
        this._uploadService.makeFileRequest(
            this.url+'uploadImage'
            , CARPETA_PRODUCTOS
            , this.producto.Imagen
            , this.removioImagen
            , []
            , this.filesToUpload
            , 'token'
            , 'image').then((result:any)=>{
            this.producto.Imagen = result.image;
            this.actualizarProducto();

        },error =>{
            Utilidades.msgErrorImage(error);
        });
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
            this._router.navigate(['/producto']);
          })
        }
      }, error =>{
        Utilidades.showMsgError(Utilidades.mensajeError(error),'Producto');
      }
    )
  }

  public filesToUpload: Array<File> = null;
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;

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

  }

}
