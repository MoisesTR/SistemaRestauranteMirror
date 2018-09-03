import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {DataTableDirective} from 'angular-datatables';
import {FacturaService} from '../../../services/shared/factura.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Factura} from '../../../models/Factura';
import {idioma_espanol} from '../../../services/shared/global';
import {Producto} from '../../../models/Producto';
import {Utils} from '../../Utils';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-list-factura',
  templateUrl: './list-factura.component.html',
  styleUrls: ['./list-factura.component.css']
})
export class ListFacturaComponent implements OnInit {

  public facturas: Factura[];
  public productos: Producto[];
  public tituloPantalla = 'Factura';
  public fechaActual: string;
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _facturaService: FacturaService
    , private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.fechaActual = this.transformDate(new Date());
    this.settingsDatatable();
    this.getFacturas();
  }

  transformDate(date): string | null {
      return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  settingsDatatable() {

      /*PROPIEDADES GENERALES DE LA DATATABLE*/
      this.dtOptions = <DataTables.Settings>{
          pagingType: 'full_numbers'
          , pageLength: 10
          , language: idioma_espanol
          , 'lengthChange': false
          , responsive: true
          , dom: 'Bfrtip',
          buttons: [
              {
                  text: 'Agregar',
                  key: '1',
                  className: 'btn orange-chang float-right-dt',
                  action: (e, dt, node, config) => {
                      this._router.navigate(['factura/add']);
                  }
              }
          ]
      };
  }

  getFacturas() {
      this._facturaService.getFacturas(true, this.fechaActual, this.fechaActual, 1, 2).subscribe(
          response => {
              if (response.facturas) {
                  this.facturas = response.facturas;
                  this.dtTrigger.next();
              } else {
                Utils.showMsgInfo('Ha ocurrido un error al obtener las facturas');
              }
          }, error => {
              Utils.showMsgError(Utils.msgError(error));
          }
      );
  }


}
