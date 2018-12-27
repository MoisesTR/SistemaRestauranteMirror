import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ProveedorService} from '../../services/shared/proveedor.service';
import {TrabajadorService} from '../../services/shared/trabajador.service';
import {Proveedor} from '../../models/Proveedor';
import {Trabajador} from '../../models/Trabajador';
import {Utils} from '../Utils';
import {Global} from '../../services/shared/global';
import {GastoService} from '../../services/service.index';
import {ProductosTop} from '../../models/ProductosTop';

declare var $: any;

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

    public fechaActual: string;
    public proveedores: Proveedor[];
    public trabajadores: Trabajador[];
    public trabajador: Trabajador;
    public proveedor: Proveedor;
    public url: string;
    public buscando;
    public carpeta = 'temp';
    public tabSeleccionado = 'proveedor';
    public urlImagen: string;
    public productosTop: ProductosTop[];

    public chartType: string = 'line';

    public chartDatasets: Array<any> = [
        {data: [32.08 , 32.09, 32.10, 32.11, 32.12], label: 'Compra'},
        {data: [32.76, 32.80, 32.84, 32.88, 32.92], label: 'Venta'}
    ];

    public chartLabels: Array<any> = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

    public chartColors: Array<any> = [
        {
            backgroundColor: 'rgba(230, 126, 34,0.2)',
            borderColor: 'rgba(230, 126, 34,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(230, 126, 34,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(230, 126, 34,1)'
        },
        {
            backgroundColor: 'rgba(192, 57, 43,0.2)',
            borderColor: 'rgba(192, 57, 43,1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(192, 57, 43,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(192, 57, 43,1)'
        }
    ];

    public chartOptions: any = {
        responsive: true
    };
    public chartClicked(e: any): void { }
    public chartHovered(e: any): void { }


    // Pie chart
    public pieType:string = 'pie';
    // public pieData:Array<any> = [300, 50];
    // public pieLabels:Array<any> = ['Gusano Entero', 'Coca-Cola'];
    public pieData: Array<any>;
    public pieLabels: Array<any>;
    public pieColors:Array<any> = [{
        hoverBorderColor: ['rgba(230, 126, 34, 0.1)', 'rgba(192, 57, 43, 0.1)','rgba(230, 126, 34, 0.1)','rgba(192, 57, 43, 0.1)','rgba(230, 126, 34, 0.1)'],
        hoverBorderWidth: 0,
        backgroundColor: ["#E67E22", "#C0392B","#E67E22","#C0392B","#E67E22"],
        hoverBackgroundColor: ["rgba(230, 126, 34, 0.6)", "rgba(192, 57, 43, 0.6)","rgba(192, 57, 43, 0.6)","rgba(230, 126, 34, 0.6)","rgba(192, 57, 43, 0.6)"]
    }];

    public pieOptions: any = {
        responsive: true
    };
    public pieClicked(e: any): void { }
    public pieHovered(e: any): void { }

    headElements = ['ID', 'Productos', 'Proveedor', 'Cantidad'];


  constructor(
      private datePipe: DatePipe
      , private _proveedorService: ProveedorService
      , private _trabajadorService: TrabajadorService
      , private _gastoService: GastoService
  ) {
      this.url = Global.url;
      this.urlImagen = this.url + 'getImagen/temp/' + 'no-img.jpg';
      this.trabajador = new Trabajador();
      this.proveedor = new Proveedor();
      this.productosTop = [];
      this.pieData = [];
      this.pieLabels = [];
  }

  ngOnInit() {
    this.fechaActual = this.transformDate(new Date());
    this.getProveedores();
    this.getTrabajadores();
    this.getTopProductos();
  }

  ngOnChange() {
      this.getTopProductos();
  }

  llenarGraficoPaste() {
      this.productosTop.forEach( (value, index) => {
          this.pieLabels.push(value.NombreProducto);
          this.pieData.push(value.Cantidad);
      });
  }

    getTopProductos() {
      this._gastoService.getTopProductos().subscribe(
          response => {
                if (response.productostop) {
                    this.productosTop = response.productostop;
                    this.llenarGraficoPaste();
                } else {
                    Utils.showMsgInfo('Ha ocurrido un error al obtener los productos');
                }
          }, error => {
              Utils.showMsgError(Utils.msgError(error), 'Dashboard');
          }
      );
  }

  transformDate(date): string | null {
      return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  getProveedores() {
    this._proveedorService.getProveedores().subscribe(
        response => {

          if (response.proveedores) {
            this.proveedores = response.proveedores;
          } else {

          }
        }, error => {
          console.log(Utils.msgError(error));
        }, () => {

        }
    );
  }


  getTrabajadores() {
      this._trabajadorService.getTrabajadores().subscribe(
          response => {
              if (response.trabajadores) {
                  this.trabajadores = response.trabajadores;
              }
          }, error => {
              Utils.showMsgError(Utils.msgError(error));
          }, () => {

          }
      );
  }

  visualizarTrabajador(trabajador: Trabajador) {
      this.trabajador = trabajador;
      this.tabSeleccionado = 'trabajador';

      if (this.trabajador.Imagen === '') {
        this.urlImagen = this.url + 'getImagen/temp/' + 'no-img.jpg';
      } else {
        this.urlImagen = this.url + 'getImagen/trabajadores/' + this.trabajador.Imagen;
      }
  }

  visualizarProveedor(proveedor: Proveedor) {
      this.proveedor = proveedor;

      this.tabSeleccionado = 'proveedor';
      this.urlImagen = this.url + 'getImagen/temp/' + 'no-img.jpg';

  }

}