import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ProveedorService} from '../../services/proveedor.service';
import {TrabajadorService} from '../../services/trabajador.service';
import {Proveedor} from '../../models/Proveedor';
import {Trabajador} from '../../models/Trabajador';
import {Utilidades} from '../Utilidades';
import {Global} from '../../services/global';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  public fechaActual : string;
  public proveedores : Proveedor[];
  public trabajadores : Trabajador[];
  public trabajador : Trabajador;
  public proveedor : Proveedor;
  public url : string;
  public carpeta = 'temp';
  public tabSeleccionado : string = 'proveedor';
  public urlImagen : string;

  constructor(
      private datePipe: DatePipe
      , private _proveedorService : ProveedorService
      , private _trabajadorService : TrabajadorService
  ) {
      this.url = Global.url;
      this.urlImagen = this.url + 'getImagen/temp/' + 'no-img.jpg';
      this.trabajador = new Trabajador();
      this.proveedor = new Proveedor();
  }

  ngOnInit() {
    this.fechaActual = this.transformDate(new Date());


    this.getProveedores();
    this.getTrabajadores();

  }

  transformDate(date) : string | null {
      return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  getProveedores(){
    this._proveedorService.getProveedores().subscribe(
        response => {

          if(response.proveedores){
            this.proveedores = response.proveedores;
          } else {

          }
        }, error =>{
          console.log(Utilidades.mensajeError(error));
        }, () =>{

        }
    )
  }

  getTrabajadores() {
      this._trabajadorService.getTrabajadores().subscribe(
          response => {
              if(response.trabajadores) {
                  this.trabajadores = response.trabajadores;
              }
          }, error => {
              Utilidades.showMsgError(Utilidades.mensajeError(error))
          }, () =>{

          }
      )
  }

  visualizarTrabajador(trabajador : Trabajador) {
      this.trabajador = trabajador;
      this.tabSeleccionado = 'trabajador';

      if(this.trabajador.Imagen == '') {
        this.urlImagen = this.url + 'getImagen/temp/' + 'no-img.jpg';
      } else {
        this.urlImagen = this.url + 'getImagen/trabajadores/' + this.trabajador.Imagen;
      }
  }

  visualizarProveedor(proveedor : Proveedor) {
      this.proveedor = proveedor;

      this.tabSeleccionado = 'proveedor';
      this.urlImagen = this.url + 'getImagen/temp/' + 'no-img.jpg';

  }

}
