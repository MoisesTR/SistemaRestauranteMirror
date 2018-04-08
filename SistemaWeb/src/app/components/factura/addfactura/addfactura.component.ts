import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductoService} from '../../../services/producto.service';
import {Producto} from '../../../models/Producto';
import {ProveedorService} from '../../../services/proveedor.service';
import {Proveedor} from '../../../models/Proveedor';
import {IMyOptions} from '../../../typescripts/pro/date-picker/interfaces';
declare var $:any;

@Component({
  selector: 'app-addfactura',
  templateUrl: './addfactura.component.html',
  styleUrls: ['./addfactura.component.css']
})
export class AddfacturaComponent implements OnInit {

  public productos : Producto[];
  public producto : Producto;
  public proveedores : Proveedor[];
  public proveedor : Proveedor;

  public myDatePickerOptions: IMyOptions = {
    // Strings and translations
    dayLabels: {su: 'Do', mo: 'Lu', tu: 'Mar', we: 'Mier', th: 'Jue', fr: 'Vier', sa: 'Sab'},
    dayLabelsFull: {su: "Domingo", mo: "Lunes", tu: "Martes", we: "Miercoles", th: "Jueves", fr: "Viernes", sa: "Sabado"},
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    monthLabelsFull: { 1: "Enero", 2: "Febrero", 3: "Marzo", 4: "Abril", 5: "Mayo", 6: "Junio", 7: "Julio", 8: "Agosto", 9: "Septiembre", 10: "Octubre", 11: "Noviembre", 12: "Diciembre" },

    // Buttons
    todayBtnTxt: "Hoy",
    clearBtnTxt: "Limpiar",
    closeBtnTxt: "Cerrar",

    // Format
    dateFormat: 'dd.mm.yyyy',

    // First day of the week
    firstDayOfWeek: 'mo',

    // Year limits
    minYear: 1000,
    maxYear: 9999,

    // Show Today button
    showTodayBtn: true,

    //Show Clear date button
    showClearDateBtn: true,
};


  constructor(
      private _route: ActivatedRoute
      , private _router: Router
      , private _productoService : ProductoService
      , private _proveedorService : ProveedorService
  ) {
      this.proveedor = new Proveedor();

  }

  ngOnInit() {

    $(document).ready(()=>{
      $('.dropify').dropify();
    });

    this.getProductos();
    this.getProveedores();

  }

  getProductos(){
    this._productoService.getProductos().subscribe(
        response =>{

          if(response.productos){
            this.productos = response.productos;
          }
        }, error =>{

        }, () =>{

        }
    )
  }

  getProveedores(){
      this._proveedorService.getProveedores().subscribe(
          response =>{
              if(response.proveedores) {
                  this.proveedores = response.proveedores;
              }
          }, error =>{

          }, ()=>{

          }
      )
  }

  onAddSelectProveedor(event){

    this.proveedor.IdProveedor = event.IdProveedor;
  }

}
