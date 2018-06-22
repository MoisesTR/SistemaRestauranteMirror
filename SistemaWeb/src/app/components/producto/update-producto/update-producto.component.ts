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
import {ProductoProveedor} from '../../../models/ProductoProveedor';
import {ProveedorService} from '../../../services/proveedor.service';
import {EmpaqueService} from '../../../services/empaque.service';
import {EnvaseService} from '../../../services/envase.service';
import {UnidadMedidaService} from '../../../services/unidad-medida.service';
import {Empaque} from '../../../models/Empaque';

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
  public unidades : UnidadMedida[];
  public empaques : Empaque[];
  public clasificaciones: ClasificacionProducto[];
  public subclasificaciones: SubClasificacionProducto[];
  public url: string;
  public removioImagen : boolean = false;
  public filesToUpload: Array<File> = null;

  constructor(
      private _route: ActivatedRoute
      , private _router: Router
      , private _uploadService: UploadService
      , private _proveedorService : ProveedorService
      , private _categoriaService: CategoriaProductoService
      , private _clasificacionService: ClasificacionProductoService
      , private _subclasificacionService: SubClasificacionProductoService
      , private  _empaqueService : EmpaqueService
      , private _envaseService : EnvaseService
      , private _unidadService : UnidadMedidaService
      , private _productoService: ProductoService
    , private _deleteImageService : DeleteImageService
    , private formBuilderUProducto : FormBuilder
  ) {
    this.url = Global.url;
    this.producto = new Producto();

  }

  ngOnInit() {

    this.initFormUpdateProducto();
    this.getProducto();
    this.getProveedores();
    this.getCategorias();
    this.getClasificaciones();
    this.getSubClasificaciones();
    this.getEmpaques();
    this.getEnvases();
    this.getUnidadesDeMedida();


  }

  showCardImg(){
        var x = document.getElementById("imagen-productos");
        var f = document.getElementById("formulario-productos");
        var proveedor = document.getElementById("proveedor");
        var categoria = document.getElementById("selectCategoria");
        var clasificacion = document.getElementById("upclasificacion");
        var subclasificacion = document.getElementById("upsubclasificacion");
        var empaque = document.getElementById("empaque");
        var envase = document.getElementById("envase");
        var unidadmedida = document.getElementById("unidadmedida");

        if (x.style.display === "none") {
        // Mostrar card de agregar imagen    
        // Pequeño
        
        // Funcion que permite que la animación del card funcione las n veces que sea presionado el botón            
        $("#btn-animation").click(function() {
            $("#imagen-productos").toggleClass("animated");
        }); 
        f.classList.remove('col-lg-12');
        f.classList.add('col-lg-8');
        f.classList.remove('col-md-12');
        f.classList.add('col-md-8');
        proveedor.classList.add('select-no-margin');
        categoria.classList.add('select-no-margin');
        clasificacion.classList.add('select-no-margin');
        subclasificacion.classList.add('select-no-margin');
        empaque.classList.add('select-no-margin');
        envase.classList.add('select-no-margin');
        unidadmedida.classList.add('select-no-margin');
        x.style.display = "block";

        } else {
        // Ocultar card de agregar imagen

        // Funcion que permite que la animación del card funcione las n veces que sea presionado el botón            
        $("#btn-animation").click(function() {
            $("#imagen-productos").toggleClass("animated");
        });
        f.classList.remove('col-lg-8');
        f.classList.add('col-lg-12');
        f.classList.remove('col-md-8');
        f.classList.add('col-md-12');
        proveedor.classList.remove('select-no-margin');
        categoria.classList.remove('select-no-margin');
        clasificacion.classList.remove('select-no-margin');
        subclasificacion.classList.remove('select-no-margin');
        empaque.classList.remove('select-no-margin');
        envase.classList.remove('select-no-margin');
        unidadmedida.classList.remove('select-no-margin');
        x.style.display = "none";
        }
    }

  private initFormUpdateProducto() {
    this.formUpdateProducto =  this.formBuilderUProducto.group({
        'nombreProducto': new FormControl('',[
            Validators.required
            , Validators.minLength(5)
            , Validators.maxLength(100)
            , CustomValidators.espaciosVacios
        ]),
        'descripcionProducto': new FormControl('',[
            Validators.required
            , Validators.minLength(5)
            , Validators.maxLength(300)
            , CustomValidators.espaciosVacios
        ]),
        'proveedor': new FormControl('',[
            Validators.required
        ]),
        'categoria': new FormControl('',[
            Validators.required
        ]),
        'clasificacion': new FormControl('',[
            Validators.required
        ]),
        'subclasificacion': new FormControl('',[
            Validators.required
        ]),
        'empaque': new FormControl('',[
        ]),
        'envase': new FormControl('',[
        ]),
        'unidadmedida': new FormControl('',[
            Validators.required
        ]),
        'cantidadEmpaque': new FormControl('',[
        ]),

        'valorUnidadMedida': new FormControl('',[
            Validators.required
        ]),
        'diasCaducidad': new FormControl('',[
            Validators.required
        ])
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

    onChangeProveedor(event){

        if(isNull(event)) {
            this.producto.IdProveedor = null;
        } else {
            this.producto.IdProveedor = event.IdProveedor;
        }
    }

    onChangeSubclasificacion(event){
        if(isNull(event) || isUndefined(event)){
            this.producto.IdSubClasificacion = null;
        } else {
            this.producto.IdSubClasificacion = event.IdSubClasificacion;
        }
    }

    onChangeUnidadMedida(event){
        if(isNull(event)) {
            this.producto.IdUnidadMedida = null;
        } else {
            this.producto.IdUnidadMedida = event.IdUnidadMedida;
        }
    }


    onChangeEnvase(event : ProductoProveedor){

        if(isNull(event)) {
            this.producto.IdEnvase = null;
        } else {
            this.producto.IdEnvase = event.IdEnvase;
        }
    }

    onChangeEmpaque(event){

        if(isNull(event)) {
            this.producto.IdEmpaque = null;
        } else {
            this.producto.IdEmpaque = event.IdEmpaque;
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
    this.formUpdateProducto.controls['diasCaducidad'].setValue(this.producto.DiasCaducidad);
    this.formUpdateProducto.controls['valorUnidadMedida'].setValue(this.producto.ValorUnidadMedida);
    this.formUpdateProducto.controls['cantidadEmpaque'].setValue(this.producto.CantidadEmpaque);

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
      this.producto.CantidadEmpaque = this.formUpdateProducto.value.cantidadEmpaque;
      this.producto.ValorUnidadMedida = this.formUpdateProducto.value.valorUnidadMedida;
      this.producto.DiasCaducidad = this.formUpdateProducto.value.diasCaducidad;
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

    getProveedores(){
        this._proveedorService.getProveedores().subscribe(
            response =>{
                if(response.proveedores){
                    this.proveedores = response.proveedores;
                }
            }, error =>{
                Utilidades.showMsgError(Utilidades.mensajeError(error))
            }
        )
    }

    getClasificaciones(){

    this._clasificacionService.getClasificaciones().subscribe(

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

    getEmpaques(){
        this._empaqueService.getEmpaques().subscribe(
            response =>{
                if(response.empaques){
                    this.empaques = response.empaques;
                }
            }
            , error =>{
                Utilidades.showMsgError(Utilidades.mensajeError(error))
            }
        )
    }

    getEnvases(){
        this._envaseService.getEnvases().subscribe(
            response =>{
                if(response.envases){
                    this.envases = response.envases;
                }
            }, error =>{
                Utilidades.showMsgError(Utilidades.mensajeError(error))
            }
        )
    }

    getUnidadesDeMedida(){
        this._unidadService.getUnidadesMedida().subscribe(
            response => {
                if(response.unidadesmedida){
                    this.unidades = response.unidadesmedida;
                }
            }, error =>{

            }
        )
    }

}
