import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import swal from 'sweetalert2'
import {Proveedor} from '../../../models/Proveedor';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriaProductoService} from '../../../services/categoria-producto.service';
import {CategoriaProducto} from '../../../models/CategoriaProducto';
import {Envase} from '../../../models/Envase';
import {UploadService} from '../../../services/upload.service';
import {CARPETA_PRODUCTOS, Global} from '../../../services/global';
import {Producto} from '../../../models/Producto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClasificacionProducto} from '../../../models/ClasificacionProducto';
import {ClasificacionProductoService} from '../../../services/clasificacion-producto.service';
import {SubClasificacionProductoService} from '../../../services/sub-clasificacion-producto.service';
import {SubClasificacionProducto} from '../../../models/SubClasificacionProducto';
import {ProductoService} from '../../../services/producto.service';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {Utilidades} from '../../Utilidades';
import {isNull, isUndefined} from 'util';
import {SelectComponent} from '../../../typescripts/pro/material-select';
import {EmpaqueService} from '../../../services/empaque.service';
import {EnvaseService} from '../../../services/envase.service';
import {Empaque} from '../../../models/Empaque';
import {UnidadMedida} from '../../../models/UnidadMedida';
import {UnidadMedidaService} from '../../../services/unidad-medida.service';
import {ProveedorService} from '../../../services/proveedor.service';
import {ProductoProveedor} from '../../../models/ProductoProveedor';


declare var $:any;

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class AddProductoComponent implements OnInit {

    public producto: Producto;
    formAddProducto: FormGroup;
    public proveedores: Proveedor [];
    public categorias: CategoriaProducto[];
    public clasificaciones: ClasificacionProducto[];
    public subclasificaciones: SubClasificacionProducto[];
    public envases: Envase[];
    public empaques : Empaque[];
    public unidades : UnidadMedida[];
    public url: string;
    public tituloPantalla: string = 'Productos';
    public showModalCategoria: boolean = false;
    public showModalClasificacion: boolean = false;
    public showModalSubclasificacion: boolean = false;
    @ViewChild('selectClasificacion') public ngSelect: SelectComponent;
    groupByFn = (item) => item.Habilitado;

    constructor(private _route: ActivatedRoute
        , private _router: Router
        , private _uploadService: UploadService
        , private _proveedorService : ProveedorService
        , private _categoriaService: CategoriaProductoService
        , private clasificacionService: ClasificacionProductoService
        , private _subclasificacionService: SubClasificacionProductoService
        , private  _empaqueService : EmpaqueService
        , private _envaseService : EnvaseService
        , private _unidadService : UnidadMedidaService
        , private _productoService: ProductoService
        , private _fAddProducto: FormBuilder) {
        this.url = Global.url;
        this.producto = new Producto();

    }

    ngOnInit() {
        $(document).ready(() => {
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

        this.getProveedores();
        this.getCategorias();
        this.getEnvases();
        this.getEmpaques();
        this.getUnidadesDeMedida();
        this.initFormAddProducto();

    }

    showCardImg(){
        var x = document.getElementById("imagen-productos");
        var f = document.getElementById("formulario-productos");
        var proveedor = document.getElementById("proveedor");
        var categoria = document.getElementById("categoria");
        var clasificacion = document.getElementById("clasificacion");
        var subclasificacion = document.getElementById("subclasificacion");
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
        f.classList.remove('col-lg-8');
        f.classList.add('col-lg-12');
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

    getCategorias() {

        this._categoriaService.getCategoriasProductos().subscribe(
            response => {
                if (response.categorias) {
                    this.categorias = response.categorias;
                } else {

                }
            }, error => {
                console.log(error);
            }
        )

    }

    onChangeClasificacion(event) {

        if(isNull(event) || isUndefined(event)){
            this.producto.IdClasificacion = null;
            this.subclasificaciones = [];
        } else {
            this.producto.IdClasificacion = event.IdClasificacion;
            this._subclasificacionService.getSubClasificacionesByIdClasificacion(event.IdClasificacion).subscribe(
                response => {
                    if (response.subclasificaciones) {
                        this.subclasificaciones = [];
                        this.subclasificaciones.push(response.subclasificaciones);
                        this.subclasificaciones = response.subclasificaciones;
                    }
                }, error => {

                }
            )
        }
    }

    onChangeCategoria(event){

        if(isNull(event) || isUndefined(event)){
            this.producto.IdCategoria = null;
            this.clasificaciones = [];
        } else {
            this.producto.IdCategoria = event.IdCategoria;
            this.clasificacionService.getClasificacionesByIdCategoria(1,this.producto.IdCategoria).subscribe(
                response =>{
                    if(response.clasificaciones){
                        this.clasificaciones = response.clasificaciones;
                    } else {
                        Utilidades.showMsgInfo('No se ha podido obtener las clasificaciones','Producto');
                    }
                }, error=>{
                    Utilidades.showMsgError(Utilidades.mensajeError(error));
                }
            )
        }
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

 customSearchFn(term: string, item: SubClasificacionProducto) {
    term = term.toLocaleLowerCase();
    return item.NombreSubClasificacion.toLocaleLowerCase().indexOf(term) > -1 || item.DescripcionSubClasificacion.toLocaleLowerCase() === term;
 }

  guardarImagenProducto(){

    if(this.filesToUpload != null){
      this._uploadService.makeFileRequest(
        this.url+'uploadImage/',
        CARPETA_PRODUCTOS,
          '',
        false,
        [],
        this.filesToUpload,
        'token',
        'image').then((result:any ) => {
        this.producto.Imagen = result.image;
        this.crearProducto();
      },error =>{
         Utilidades.msgErrorImage(error);
      });
    } else {
      this.producto.Imagen = '';
      this.crearProducto();
    }
  }

  getValueForm(){
    this.producto.NombreProducto = this.formAddProducto.value.nombreProducto;
    this.producto.Descripcion = this.formAddProducto.value.descripcionProducto;
    this.producto.IdEstado = 1;
    this.producto.DiasCaducidad = 30;
    this.producto.CantidadEmpaque = this.formAddProducto.value.cantidadEmpaque;
    this.producto.Costo = this.formAddProducto.value.costo;
    this.producto.ValorUnidadMedida = this.formAddProducto.value.valorunidadmedida;

  }

  crearProducto(){
    this.getValueForm();

    console.log(this.producto);
    this._productoService.createProducto(this.producto).subscribe(
      response =>{
        if(response.IdProducto){
            swal({
                title: 'Producto Creado exitosamente!',
                text: 'Deseas agregar otro producto?',
                type: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SI',
                cancelButtonText: 'NO'
            }).then((result) => {
                if (result.value) {
                    this.formAddProducto.reset();
                    this.producto = new Producto();
                    this.filesToUpload = null;
                    $(".dropify-clear").click()
                } else if (result.dismiss === swal.DismissReason.cancel) {
                    this._router.navigate(['/producto'])
                }
            })
        }
      }, error =>{
        Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
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

        'valorunidadmedida': new FormControl('',[
            Validators.required
        ]),
        'costo': new FormControl('',[
            Validators.required
        ])
    })
  }

  //Metodos para invocar a las modales
  showModalCategoriaM(){
      this.showModalCategoria = true;
  }

  resultadoConsultaCategoria(event) {
    this.showModalCategoria = false;

    if(event) {
        this.getCategorias();
    }
  }

  showModalClasificacionM(){
      this.showModalClasificacion = true;
  }

  resultadoConsultaClasificacion(event) {
    this.showModalClasificacion = false;

    if(event){
        this.clasificacionService.getClasificacionesByIdCategoria(1,this.producto.IdCategoria).subscribe(
            response =>{
                if(response.clasificaciones){
                    this.clasificaciones = response.clasificaciones;
                }
            }, error =>{
                Utilidades.showMsgError(Utilidades.mensajeError(error));
            }
        )
    }
  }

  showModalSubclasificacionM(){
      this.showModalSubclasificacion  = true;
  }

  resultadoConsultaSubclasificacion(event) {
    this.showModalSubclasificacion = false;

    if(event) {
        this.getCategorias();
    }

  }

}
