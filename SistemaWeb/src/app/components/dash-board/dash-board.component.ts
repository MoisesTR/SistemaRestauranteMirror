import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {ProveedorService} from '../../services/proveedor.service';
import {TrabajadorService} from '../../services/trabajador.service';
import {Proveedor} from '../../models/Proveedor';
import {Trabajador} from '../../models/Trabajador';
import {Utilidades} from '../Utilidades';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  public fechaActual : string;
  public proveedores : Proveedor[];
  public trabajadores : Trabajador[];
  constructor(
      private datePipe: DatePipe
      , private _proveedorService : ProveedorService
      , private _trabajadorService : TrabajadorService
  ) { }

  ngOnInit() {
    this.fechaActual = this.transformDate(new Date());
    this.getProveedores()
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

}
