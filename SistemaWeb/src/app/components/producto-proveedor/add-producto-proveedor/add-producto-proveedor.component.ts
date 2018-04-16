import {Component, OnInit} from '@angular/core';
import {ProductoService} from '../../../services/producto.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SubClasificacionProductoService} from '../../../services/sub-clasificacion-producto.service';
import {EnvaseService} from '../../../services/envase.service';
import {EmpaqueService} from '../../../services/empaque.service';
import {Global} from '../../../services/global';
import {ProductoProveedor} from '../../../models/ProductoProveedor';
import {Envase} from '../../../models/Envase';
import {Empaque} from '../../../models/Empaque';
import {Producto} from '../../../models/Producto';
import {Proveedor} from '../../../models/Proveedor';
import {ProveedorService} from '../../../services/proveedor.service';
import {UnidadMedidaService} from '../../../services/unidad-medida.service';
import {UnidadMedida} from '../../../models/UnidadMedida';
import {ProductoProveedorService} from '../../../services/producto-proveedor.service';
import swal from 'sweetalert2';
import {Utilidades} from '../../Utilidades';

declare var $:any;
@Component({
  selector: 'app-add-producto-proveedor',
  templateUrl: './add-producto-proveedor.component.html',
  styleUrls: ['./add-producto-proveedor.component.css']
})
export class AddProductoProveedorComponent implements OnInit {

  public productoProveedor : ProductoProveedor;
  public url : String;
  public formProveedor : FormGroup;
  public envases : Envase[];
  public empaques: Empaque[];
  public productos: Producto [];
  public proveedores: Proveedor[];
  public unidadesMedida: UnidadMedida[];

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _envaseService : EnvaseService
    , private _EmpaqueService : EmpaqueService
    , private _ProveedorService : ProveedorService
    , private _ProductoProveedorService : ProductoProveedorService
    , private _UnidadMedida : UnidadMedidaService
    , private _subclasificacionService: SubClasificacionProductoService
    , private _productoService : ProductoService
    , private _fAddProveedor: FormBuilder
  ) {
    this.url = Global.url;
    this.productoProveedor = new ProductoProveedor();
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

    });

    this.initFormProveedor();
    this.getEmpaques();
    this.getEnvases();
    this.getProveedores();
    this.getUnidadesMedida();
    this.getProductos();
  }

  initFormProveedor(){

    this.formProveedor = this._fAddProveedor.group({
      'nombreproveedor': new FormControl('',[
          Validators.required
        ]
      ),
      //   'productosProveedor': new FormControl('',[
      //   Validators.required
      // ]),
      'envase': new FormControl(''),
      'empaque': new FormControl(''),
      'cantidadenvase': new FormControl(''),
      'costo': new FormControl('',[
        Validators.required
      ]),
      'unidadmedida': new FormControl('',[
        Validators.required
      ]),
      'valorunidadmedida': new FormControl('',[
        Validators.required
      ]),
      // 'caducidad': new FormControl('',[
      //   Validators.required
      // ]),

    })

  }

  onAddSelectUnidadMedida(event){
    this.productoProveedor.IdUnidadMedida = event.IdUnidadMedida;
  }

  onAddSelectEmpaque(event){
    this.productoProveedor.IdEmpaque = event.IdEmpaque;
  }

  onAddSelectEnvase(event){
    this.productoProveedor.IdEnvase = event.IdEnvase;
  }

  onAddSelectProducto(event){
    this.productoProveedor.IdProducto = event.IdProducto;

  }

  onAddSelectProveedor(event){
    this.productoProveedor.IdProveedor = event.IdProveedor;
  }

  getValuesForm(){
    this.productoProveedor.CantidadEmpaque = this.formProveedor.value.cantidadenvase;
    this.productoProveedor.Costo = this.formProveedor.value.costo;
    this.productoProveedor.ValorUnidadMedida = this.formProveedor.value.valorunidadmedida;
    this.productoProveedor.DiasCaducidad = this.formProveedor.value.caducidad;
    this.productoProveedor.IdProveedor = 1;
    this.productoProveedor.DiasCaducidad = 30;
  }

  createProductoProveedor(Modal){
    this.getValuesForm();

    this._ProductoProveedorService.createProductoProveedor(this.productoProveedor).subscribe(
        response => {

          if(response.IdProductoProveedor){
            Utilidades.showMsgSucces("La relacion del producto proveedor ha sido exitosa");
          } else {
            Utilidades.showMsgInfo("Ha ocurrido un error");
          }
        }, error =>{
          Utilidades.showMsgError(Utilidades.mensajeError(error));

        } , () =>{

        }
    )
  }

  getEnvases(){
    this._envaseService.getEnvases().subscribe(
      response => {

        if(response.envases) {
          this.envases = response.envases;
        }
      }
    )
  }
  getEmpaques(){
    this._EmpaqueService.getEmpaques().subscribe(
      response => {

        if(response.empaques) {
          this.empaques = response.empaques;
        }
      }
    )
  }
  getProveedores(){
    this._ProveedorService.getProveedores().subscribe(
      response => {

        if(response.proveedores) {
          this.proveedores = response.proveedores;
        }
      }
    )
  }

  getUnidadesMedida(){
    this._UnidadMedida.getUnidadesMedida().subscribe(
      response => {

        if(response.unidadesmedida) {
          this.unidadesMedida = response.unidadesmedida;
        }
      }
    )
  }

  getProductos(){

    this._productoService.getProductos().subscribe(
      response => {
        if(response.productos){
          this.productos = response.productos;
        }
      }, error =>{

      }
    );
  }

  guardarProductoProveedor(){
    this.getValuesForm();

    this._ProductoProveedorService.createProductoProveedor(this.productoProveedor).subscribe(
      response => {
        if (response){
          swal(
            'Producto-Proveedor',
            'Se ha relacion exitosamente el producto ccn el proveedor!',
            'success'
          ).then(() => {
            this._router.navigate(['/producto']);
          })
        }
      }, error => {
        Utilidades.showMsgError(Utilidades.mensajeError(error));
      }
    )
  }

}
