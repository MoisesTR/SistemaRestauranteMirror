import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Provedor} from '../../../models/Provedor';
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
import {Global} from '../../../services/global';
import {SubClasificacionProductoService} from '../../../services/sub-clasificacion-producto.service';
import {CategoriaProductoService} from '../../../services/categoria-producto.service';
import {CustomValidators} from '../../../validadores/CustomValidators';
import swal from 'sweetalert2';
import {Observable} from 'rxjs/Observable';

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
  public optionsSelect2: Select2Options;
  public valorInicialClasificacion: Observable<string>;
  public valorInicialSubClasificacion: Observable<string>;
  public valorInicialCategoria: Observable<string>;

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


    this.optionsSelect2 = {
      multiple: true
      , maximumSelectionLength: 1
      , width: '100%'
    }

  }

  ngOnInit() {

    this.initValidatorsFormProducto();
    this.getProducto();
    this.getClasificaciones();
    this.getSubClasificaciones();
    this.getCategorias();


  }

  initValidatorsFormProducto(){

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

  }

  inicializarValoresFormularioProducto(){
    this.formUpdateProducto.controls['nombreProducto'].setValue(this.producto.NombreProducto);
    this.formUpdateProducto.controls['descripcionProducto'].setValue(this.producto.Descripcion);

    this.valorInicialClasificacion = Observable.create(obs => {
      obs.next(this.producto.IdClasificacion);
      obs.complete();
    }).delay(100);

    this.valorInicialSubClasificacion = Observable.create(obs => {
      obs.next(this.producto.IdSubclasificacion);
      obs.complete();
    }).delay(100);

    this.valorInicialCategoria = Observable.create(obs => {
      obs.next(this.producto.IdCategoria);
      obs.complete();
    }).delay(100);

  }

  validarCampos(){

    this.obtenerDatosFormularioProducto();
    this.cargarImagen();
  }

  changedSelectCategoria(event){

    let idCategoria = event.value[0];

    if(idCategoria != null) {
      this.producto.IdCategoria = idCategoria;
    }
  }

  changedSelectSubClasificacion(event){
    let idSubClasificacion = event[0];

    if(idSubClasificacion) {
      this.producto.IdSubclasificacion = idSubClasificacion;
    }
  }

  changedSelectClasificacion(event){
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
    }
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
                var imagenProducto =  this.url + 'productoGetImage/' + this.producto.Imagen;

                $('.dropify').dropify({
                  defaultFile: imagenProducto
                });


              });
              this.inicializarValoresFormularioProducto();
            } else {
              this._router.navigate(['producto/list']);
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
