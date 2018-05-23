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
import {isNull, isUndefined} from 'util';
import {DeleteImageService} from '../../../services/delete-image-service';

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
  public filesToUpload: Array<File> = null;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _categoriaService: CategoriaProductoService
    , private _uploadService : UploadService
    , private _clasificaionService: ClasificacionProductoService
    , private _subclasificacionService: SubClasificacionProductoService
    , private _productoService : ProductoService
    , private _deleteImageService : DeleteImageService
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

  onChangeClasificacion(event){

      if(isNull(event)) {
          this.producto.IdClasificacion = null;
      } else {
          this.producto.IdClasificacion = event.IdClasificacion;

          this._subclasificacionService.getSubClasificacionesByIdClasificacion(event.IdClasificacion).subscribe(
              response =>{
                  if(response.subclasificaciones){
                      this.subclasificaciones = response.subclasificaciones;
                  }
              }, error=>{
                    Utilidades.showMsgError(Utilidades.mensajeError(error),'Producto');
              }
          )
      }

  }

  onChangeSubclasificacion(event){

      if(isNull(event)){
          this.producto.IdSubClasificacion = null;
      } else{
          this.producto.IdSubClasificacion = event.IdSubClasificacion;
      }
  }



  onChangeCategoria(event){

      if(isNull(event)) {
          this.producto.IdCategoria = null;
      } else {
          this.producto.IdCategoria = event.IdCategoria;
      }

  }


  inicializarValoresFormularioProducto(){
    this.formUpdateProducto.controls['nombreProducto'].setValue(this.producto.NombreProducto);
    this.formUpdateProducto.controls['descripcionProducto'].setValue(this.producto.Descripcion);

  }

  validarCampos(){
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

                    this.filesToUpload = [];
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
    //si es nulo significa que dejo la misma imagen que traia o en dado caso tambien imagen que no traia
    if( (isNull(this.filesToUpload) && !this.removioImagen) ||  (this.producto.Imagen == '' && this.removioImagen)) {
        this.actualizarProducto();

    } else if(isNull(this.filesToUpload) && this.removioImagen && this.producto.Imagen != ''){

        this._deleteImageService.deleteImage(CARPETA_PRODUCTOS,this.producto.Imagen).subscribe(
            response => {
                if(response.success){
                    this.producto.Imagen = '';
                    this.actualizarProducto();
                }
            }, error =>{
                Utilidades.msgErrorImage(error,'Producto');
            }
        )

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
            Utilidades.msgErrorImage(error,'Producto');
        });
    }
  }

  getValuesFormUpdate() {
      this.producto.NombreProducto = this.formUpdateProducto.value.nombreProducto;
      this.producto.Descripcion = this.formUpdateProducto.value.descripcionProducto;
      this.producto.IdEstado = 1;
  }

  actualizarProducto(){
    this.getValuesFormUpdate();

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


  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
    this.removioImagen = false;

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

}
