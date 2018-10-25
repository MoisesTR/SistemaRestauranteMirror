import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import swal from 'sweetalert2';
import {Proveedor} from '../../../models/Proveedor';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriaProductoService} from '../../../services/shared/categoria-producto.service';
import {CategoriaProducto} from '../../../models/CategoriaProducto';
import {Envase} from '../../../models/Envase';
import {UploadService} from '../../../services/shared/upload.service';
import {CARPETA_PRODUCTOS, Global} from '../../../services/shared/global';
import {Producto} from '../../../models/Producto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ClasificacionProducto} from '../../../models/ClasificacionProducto';
import {ClasificacionProductoService} from '../../../services/shared/clasificacion-producto.service';
import {SubClasificacionProductoService} from '../../../services/shared/sub-clasificacion-producto.service';
import {SubClasificacionProducto} from '../../../models/SubClasificacionProducto';
import {ProductoService} from '../../../services/shared/producto.service';
import {CustomValidators} from '../../../validadores/CustomValidators';
import {Utils} from '../../Utils';
import {EmpaqueService} from '../../../services/shared/empaque.service';
import {EnvaseService} from '../../../services/shared/envase.service';
import {Empaque} from '../../../models/Empaque';
import {UnidadMedida} from '../../../models/UnidadMedida';
import {UnidadMedidaService} from '../../../services/shared/unidad-medida.service';
import {ProveedorService} from '../../../services/shared/proveedor.service';
import {ProductoProveedor} from '../../../models/ProductoProveedor';
import {ProductoProveedorService} from '../../../services/shared/producto-proveedor.service';
import {SelectComponent} from 'ng-uikit-pro-standard';
import {MensajesError} from '../../mensajesError';
import {PreviousRouteService} from '../../../services/service.index';

declare var $: any;

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.component.html',
  styleUrls: ['./add-producto.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class AddProductoComponent implements OnInit {

    public producto: Producto;
    public productoProveedor: ProductoProveedor;
    formAddProducto: FormGroup;
    public proveedores: Proveedor [];
    public categorias: CategoriaProducto[];
    public clasificaciones: ClasificacionProducto[];
    public subclasificaciones: SubClasificacionProducto[];
    public envases: Envase[];
    public empaques: Empaque[];
    public unidades: UnidadMedida[];
    public url: string;
    public filesToUpload: Array<File>;
    public tituloPantalla = 'Productos';
    public showModalCategoria = false;
    public showModalClasificacion = false;
    public showModalSubclasificacion = false;
    public showModalEmpaque = false;
    public showModalEnvase = false;
    public showModalUnidadMedida = false;
    @ViewChild('selectClasificacion') public ngSelect: SelectComponent;
    public mensajesError: MensajesError;
    public error = 'nada';
    public previousUrl: string;
    public tipoInsumoSeleccionado = 1;
    public proveedorSelecionado: number;
    Insumo = [
        {Id: 1, TipoInsumo: 'Alimento'}
        , {Id: 2, TipoInsumo: 'Limpieza'}
        , {Id: 3, TipoInsumo: 'Utensilios'},
    ];
    groupByFn = (item) => item.Habilitado;

    constructor(private _route: ActivatedRoute
        , private _router: Router
        , private _previousRouteService: PreviousRouteService
        , private _uploadService: UploadService
        , private _proveedorService: ProveedorService
        , private _categoriaService: CategoriaProductoService
        , private clasificacionService: ClasificacionProductoService
        , private _subclasificacionService: SubClasificacionProductoService
        , private  _empaqueService: EmpaqueService
        , private _envaseService: EnvaseService
        , private _unidadService: UnidadMedidaService
        , private _productoService: ProductoService
        , private _productoProveedorService: ProductoProveedorService
        , private cdr: ChangeDetectorRef
        , private _fAddProducto: FormBuilder) {
        this.url = Global.url;
        this.producto = new Producto();
        this.productoProveedor = new ProductoProveedor();

    }

    ngOnInit() {
        this.previousUrl = this._previousRouteService.getPreviousUrl();

        $(document).ready(() => {
            $('.letras').keypress(function (key) {
                if ((key.charCode < 97 || key.charCode > 122) // letras mayusculas
                    && (key.charCode < 65 || key.charCode > 90) // letras minusculas
                    && (key.charCode < 48 || key.charCode > 57) // numeros permitidos
                    && (key.charCode !== 241) // ñ
                    && (key.charCode !== 209) // Ñ
                    && (key.charCode !== 32) // espacio
                    && (key.charCode !== 225) // á
                    && (key.charCode !== 233) // é
                    && (key.charCode !== 237) // í
                    && (key.charCode !== 243) // ó
                    && (key.charCode !== 250) // ú
                    && (key.charCode !== 193) // Á
                    && (key.charCode !== 201) // É
                    && (key.charCode !== 205) // Í
                    && (key.charCode !== 211) // Ó
                    && (key.charCode !== 218) // Ú
                ) {
                    return false;
                }
            });
            $('.dropify').dropify();
        });

        this.getProveedores();
        this.getCategorias();
        this.getEnvases();
        this.getEmpaques();
        this.getUnidadesDeMedida();
        this.initFormAddProducto();
        this.mensajesError = new MensajesError();

    }

    showCardImg() {
        const x = document.getElementById('imagen-productos');
        const f = document.getElementById('formulario-productos');
        const proveedor = document.getElementById('proveedor');
        const categoria = document.getElementById('categoria');
        const clasificacion = document.getElementById('clasificacion');
        const subclasificacion = document.getElementById('subclasificacion');
        const empaque = document.getElementById('empaque');
        const envase = document.getElementById('envase');
        const unidadmedida = document.getElementById('unidadmedida');

        if (x.style.display === 'none') {
        //  Mostrar card de agregar imagen
        // Pequeño

        //  Funcion que permite que la animación del card funcione las n veces que sea presionado el botón
        $('#btn-animation').click(function() {
            $('#imagen-productos').toggleClass('animated');
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
        x.style.display = 'block';

        } else {
        // Ocultar card de agregar imagen

        // Funcion que permite que la animación del card funcione las n veces que sea presionado el botón
        $('#btn-animation').click(function() {
            $('#imagen-productos').toggleClass('animated');
        });
        f.classList.remove('col-lg-8');
        f.classList.add('col-lg-12');
        proveedor.classList.remove('select-no-margin');
        categoria.classList.remove('select-no-margin');
        clasificacion.classList.remove('select-no-margin');
        subclasificacion.classList.remove('select-no-margin');
        empaque.classList.remove('select-no-margin');
        envase.classList.remove('select-no-margin');
        unidadmedida.classList.remove('select-no-margin');
        x.style.display = 'none';
        }
    }

    getProveedores() {
        this._proveedorService.getProveedores().subscribe(
            response => {
                if (response.proveedores) {
                    this.proveedores = response.proveedores;
                }
            }, error => {
                Utils.showMsgError(Utils.msgError(error));
            }
        );
    }

    getCategorias() {

        this._categoriaService.getCategoriasProductos().subscribe(
            response => {
                if (response.categorias) {
                    this.categorias = response.categorias;
                } else {

                }
            }, error => {
                Utils.showMsgError(Utils.msgError(error));
            }
        );

    }

    onChangeClasificacion(event) {

        if (event === null || event === undefined) {
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
                    Utils.showMsgError(Utils.msgError(error));
                }
            );
        }
    }

    onChangeCategoria(event) {

        if (event === null || event === undefined) {
            this.producto.IdCategoria = null;
            this.clasificaciones = [];
        } else {
            this.producto.IdCategoria = event.IdCategoria;
            this.clasificacionService.getClasificacionesByIdCategoria(1, this.producto.IdCategoria).subscribe(
                response => {
                    if (response.clasificaciones) {
                        this.clasificaciones = response.clasificaciones;
                    } else {
                        Utils.showMsgInfo('No se ha podido obtener las clasificaciones', 'Producto');
                    }
                }, error => {
                    Utils.showMsgError(Utils.msgError(error));
                }
            );
        }
    }

    getEmpaques() {
        this._empaqueService.getEmpaques().subscribe(
            response => {
                if (response.empaques) {
                    this.empaques = response.empaques;
                }
            }
            , error => {
                Utils.showMsgError(Utils.msgError(error));
            }
        );
    }

    getEnvases() {
        this._envaseService.getEnvases().subscribe(
            response => {
                if (response.envases) {
                    this.envases = response.envases;
                }
            }, error => {
                Utils.showMsgError(Utils.msgError(error));
            }
        );
    }

    getUnidadesDeMedida() {
        this._unidadService.getUnidadesMedida().subscribe(
            response => {
                if (response.unidadesmedida) {
                    this.unidades = response.unidadesmedida;
                }
            }, error => {
                Utils.showMsgError(Utils.msgError(error));
            }
        );
    }

    onChangeProveedor(event) {

        if (event === null) {
            this.producto.IdProveedor = null;
            this.proveedorSelecionado = this.producto.IdProveedor;
        } else {
            this.producto.IdProveedor = event.IdProveedor;
            this.proveedorSelecionado = this.producto.IdProveedor;
        }
    }

    onChangeSubclasificacion(event) {
      if (event === null || event === undefined) {
          this.producto.IdSubClasificacion = null;
      } else {
          this.producto.IdSubClasificacion = event.IdSubClasificacion;
      }
    }

    onChangeUnidadMedida(event) {
        if (event === null) {
            this.producto.IdUnidadMedida = null;
        } else {
            this.producto.IdUnidadMedida = event.IdUnidadMedida;
        }
    }


    onChangeEnvase(event: ProductoProveedor) {

        if (event === null) {
            this.producto.IdEnvase = null;
        } else {
            this.producto.IdEnvase = event.IdEnvase;
        }
    }

    onChangeEmpaque(event) {

        if (event === null) {
            this.producto.IdEmpaque = null;
        } else {
            this.producto.IdEmpaque = event.IdEmpaque;
        }
    }

 customSearchFn(term: string, item: SubClasificacionProducto) {
    term = term.toLocaleLowerCase();
    return item.NombreSubClasificacion.toLocaleLowerCase().indexOf(term) > -1 || item.DescripcionSubClasificacion.toLocaleLowerCase() === term;
 }

  guardarImagenProducto() {
    this.getValueForm();

    if (!Utils.valorCampoEsValido(this.producto.CodigoProducto) && !Utils.valorCampoEsValido(this.producto.CodigoInterno)) {
        Utils.showMsgInfo('El codigo producto o codigo interno es requerido!', 'Producto');
    } else {
        if (this.filesToUpload != null) {
            this._uploadService.makeFileRequest(
                this.url + 'uploadImage/',
                CARPETA_PRODUCTOS,
                '',
                false,
                [],
                this.filesToUpload,
                'token',
                'image').then((result: any ) => {
                this.producto.Imagen = result.image;
                this.crearProducto();
            }, error => {
                Utils.msgErrorImage(error);
            });
        } else {
            this.producto.Imagen = '';
            this.crearProducto();
        }
    }
  }

  getValueForm() {
    this.producto.NombreProducto = this.formAddProducto.value.nombreProducto;
    this.producto.Descripcion =  Utils.valorCampoEsValido(this.formAddProducto.value.descripcionProducto) ? this.formAddProducto.value.descripcionProducto : 'Ninguna';
    this.producto.IdEstado = 1;
    this.producto.DiasCaducidad = this.formAddProducto.value.diasDeUso;
    this.producto.CantidadEmpaque = this.formAddProducto.value.cantidadEmpaque === '' ? null : this.formAddProducto.value.cantidadEmpaque ;
    this.producto.ValorUnidadMedida = this.formAddProducto.value.valorunidadmedida;
    this.producto.DiasDeUso = this.formAddProducto.value.diasDeUso === '' ? 0 : this.formAddProducto.value.diasDeUso;
    this.producto.DiasRotacion = Utils.valorCampoEsValido(this.formAddProducto.value.diasDeUso) ? this.formAddProducto.value.diasDeUso : 0;
    this.producto.CodigoProducto = this.formAddProducto.value.codigoProducto ;
    this.producto.CodigoBarra = this.formAddProducto.value.codigoBarra === '' ? null : this.formAddProducto.value.codigoBarra ;
    this.producto.CodigoInterno = this.formAddProducto.value.codigoInterno === '' ? null : this.formAddProducto.value.codigoInterno;
    this.producto.IdTipoInsumo = 1;
    this.producto.IdProveedor = this.proveedorSelecionado;
  }

  crearProducto() {
    this._productoService.createProducto(this.producto).subscribe(
      response => {
        if (response.IdProducto) {
            swal({
                title: 'El producto se ha creado exitosamente!',
                text: 'Deseas agregar otro producto?',
                type: 'success',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'SI',
                cancelButtonText: 'NO'
            }).then((result) => {
                if (result.value) {
                    this.resetFormProducto();
                    this.producto = new Producto();
                    this.filesToUpload = null;
                    $('.dropify-clear').click();
                    window.scrollTo(0, 0);
                } else if (result.dismiss === swal.DismissReason.cancel) {
                    if (this.previousUrl === '/proveedor/add') {
                        this._router.navigate(['/factura/add']);
                    } else {
                        this._router.navigate(['/producto']);
                    }
                }
            });
        }
      }, error => {
        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    );
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  validarCamposProduto() {
    this.guardarImagenProducto();
  }

  private initFormAddProducto() {
    this.formAddProducto =  this._fAddProducto.group({
        'nombreProducto': new FormControl('', [
          Validators.required
          , Validators.minLength(2)
          , Validators.maxLength(100)
          , CustomValidators.nospaceValidator
        ]),
        'descripcionProducto': new FormControl('', [
        , Validators.minLength(3)
        , Validators.maxLength(400)
        , CustomValidators.nospaceValidator
        ]),
        'proveedor': new FormControl(this.proveedorSelecionado, [
            Validators.required
        ]),
        'categoria': new FormControl('', [
            Validators.required
        ]),
        'clasificacion': new FormControl('', [
            Validators.required
        ]),
        'subclasificacion': new FormControl('', [
            Validators.required
        ]),
        'empaque': new FormControl('', [
        ]),
        'envase': new FormControl('', [
        ]),
        'unidadmedida': new FormControl('', [
            Validators.required
        ]),
        'cantidadEmpaque': new FormControl('', [
        ]),

        'valorunidadmedida': new FormControl('', [
            Validators.required
        ]),
        'diasDeUso': new FormControl('', [
        ]),
        'codigoBarra': new FormControl(null, [

        ]),
        'codigoInterno': new FormControl(null, [
        ]),
        'codigoProducto': new FormControl('', [
        ]),
        'tipoInsumo': new FormControl('', [
            Validators.required
        ])
    });
  }

resultadoConsultaCategoria(event) {
    this.showModalCategoria = false;

    if (event) {
        this.getCategorias();
    }
  }

  resultadoConsultaClasificacion(event) {
    this.showModalClasificacion = false;

    if (event) {
        if (this.producto.IdCategoria !== undefined && this.producto.IdCategoria !== null)  {
            this.clasificacionService.getClasificacionesByIdCategoria(1, this.producto.IdCategoria).subscribe(
                response => {
                    if (response.clasificaciones) {
                        this.clasificaciones = response.clasificaciones;
                    }
                }, error => {
                    Utils.showMsgError(Utils.msgError(error));
                }
            );
        }
    }
  }

  resultadoConsultaSubclasificacion(event) {
        this.showModalSubclasificacion = false;

        if (event) {
            if (this.producto.IdCategoria !== undefined && this.producto.IdCategoria !== null) {
                this._subclasificacionService.getSubClasificacionesByIdClasificacion(this.producto.IdClasificacion).subscribe(
                    response => {
                        if (response.subclasificaciones) {
                            this.subclasificaciones = response.subclasificaciones;
                        }
                    }, error => {
                        Utils.showMsgError(Utils.msgError(error));
                    }
                );
            }
        }
  }

  resultQueryEmpaque(event) {
        this.showModalEmpaque = false;

        if (event) {
            this._empaqueService.getEmpaques(1).subscribe(
                response => {
                    if (response.empaques) {
                        this.empaques = response.empaques;
                    }
                }, error => {
                    Utils.showMsgError(Utils.msgError(error));
                }
            );
        }
  }

    resultQueryEnvase(event) {
        this.showModalEnvase = false;

        if (event) {
            this._envaseService.getEnvases(1).subscribe(
                response => {
                    if (response.envases) {
                        this.envases = response.envases;
                    }
                }, error => {
                    Utils.showMsgError(Utils.msgError(error));
                }
            );
        }
    }

    resultQueryUnidadMedida(event) {
        this.showModalUnidadMedida = false;

        if (event) {
            this._unidadService.getUnidadesMedida(1).subscribe(
                response => {
                    if (response.unidadesmedida) {
                        this.unidades = response.unidadesmedida;
                    }
                }, error => {
                    Utils.showMsgError(Utils.msgError(error));
                }
            );
        }
    }

    changeInsumo(event) {
        if (event === null || event === undefined) {
            this.tipoInsumoSeleccionado = null;
        } else {
            this.tipoInsumoSeleccionado = event.Id;
        }
    }

    resetFormProducto() {
        Object.keys(this.formAddProducto.controls).forEach( (value, index) => {
            if (value !== 'proveedor') {
                this.formAddProducto.controls[value].reset();
            }
        });
    }

    agregarProveedor() {
        swal({
            title: 'Agregar proveedor',
            text: 'Si seleccionas la opcion "SI", perderas los cambios digitados hasta el momento!',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO'
        }).then((result) => {
            if (result.value) {
                this._router.navigate(['/proveedor/add']);
            } else if (result.dismiss === swal.DismissReason.cancel) {}
        });
    }
}
