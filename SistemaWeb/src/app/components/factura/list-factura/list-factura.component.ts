import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Rx';
import {DataTableDirective} from 'angular-datatables';
import {FacturaService} from '../../../services/factura.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Factura} from '../../../models/Factura';
import {idioma_espanol} from '../../../services/global';
import {ProductoService} from '../../../services/producto.service';
import {Producto} from '../../../models/Producto';

@Component({
  selector: 'app-list-factura',
  templateUrl: './list-factura.component.html',
  styleUrls: ['./list-factura.component.css']
})
export class ListFacturaComponent implements OnInit {

  public    facturas: Factura[];
  public productos: Producto[];
  public tituloPantalla : string = 'Factura';

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _facturaService  : FacturaService
    , private _productoService  : ProductoService
  ) {

  }

  ngOnInit() {

    this.settingsDatatable();
    // this.getFacturas();
    // this.getProductos();
    this.getFacturas();

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
                      this._router.navigate(['factura/add'])
                  }
              }
          ]
      };
  }

  getFacturas(){

    this._facturaService.getFacturas().subscribe(
      response => {
        if(response.facturas) {
          this.facturas = response.facturas;
          this.dtTrigger.next();
        }
      }, error =>{

      },
      () => {

      }
    )

  }

  getProductos(){
    this._productoService.getProductos().subscribe(
      response =>{
        if(response.productos){
          this.productos = response.productos;
          this.dtTrigger.next();
        }
      }
    )
  }

}
