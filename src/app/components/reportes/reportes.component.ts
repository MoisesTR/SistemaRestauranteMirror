import { Component, OnInit } from '@angular/core';
import {ReporteService} from '../../services/shared/reporte.service';
import {WindowRef} from '@agm/core/utils/browser-globals';
import {Utils} from '../Utils';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  nativeWindow: any;
  constructor(
      private _reporteService: ReporteService,
      private winRef: WindowRef
  ) {
      this.nativeWindow = winRef.getNativeWindow();
  }

  ngOnInit() {
  }


  imprimirReporteProductos() {
    // Utils.printReport('BkZfjOAUQ', true, 'proveedores', this.nativeWindow);
    // this.nativeWindow.open('http://localhost:3000/reports?shortid=Sy9Eauq87&preview=true&catalogoApi=productos');
  }

  imprimirReporteProveedores () {
      Utils.printReport('BkZfjOAUQ', true, 'proveedores', this.nativeWindow);
  }

}