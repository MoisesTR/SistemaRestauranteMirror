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
import {FormGroup, FormControl, FormArray, NgForm, Validators, FormBuilder} from '@angular/forms';
import {ClasificacionProducto} from "../../../models/ClasificacionProducto";
import {ClasificacionProductoService} from "../../../services/clasificacion-producto.service";
import {SubClasificacionProductoService} from "../../../services/sub-clasificacion-producto.service";
import {SubClasificacionProducto} from "../../../models/SubClasificacionProducto";
import {ProductoService} from "../../../services/producto.service";
import {CustomValidators} from "../../../validadores/CustomValidators";
import {Utilidades} from "../../Utilidades";

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css'],

})

export class AddProductoComponent implements OnInit, AfterViewInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {

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

    $(document).ready(function(){

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
    this.getCategorias();
    this.getClasificaciones();
     /* this.getSubClasificaciones();*/

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

    this.onChanges();

  }

  onChanges(): void{
    this.formAddProducto.valueChanges.subscribe(valor => {
      console.log('hola');
    });
  }

  obtenerDatosFormNuevoProducto() {

    this.producto.NombreProducto = this.formAddProducto.value.nombreProducto;
    this.producto.Descripcion = this.formAddProducto.value.descripcionProducto;
    this.producto.IdEstado = 1;

    let categoria:string = null;
    categoria = $(".selectcategoria").val()[0];

    if(categoria != null) {
      let variable: number;
     /* variable = parseInt(categoria.split(':')[1]);*/
      variable = parseInt(categoria);

      this.producto.IdCategoria = variable;


    } else {
      console.log('esta vacio')
    }
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
          Utilidades.mensajeError(<any>error),
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


  validarCamposProduto(){

    this.obtenerDatosFormNuevoProducto();
    this.guardarImagenProducto();

  }

}
