import {Component, OnInit} from '@angular/core';
import {ProveedorService} from '../../../services/shared/proveedor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FacturaService} from '../../../services/service.index';
import {Proveedor} from '../../../models/Proveedor';
import {Factura} from '../../../models/Factura';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Utils} from '../../Utils';
import {opcionesDatePicker} from '../../../services/shared/global';
import {IMyOptions} from '../../../../ng-uikit-pro-standard';

@Component({
  selector: 'app-summary-facturas',
  templateUrl: './summary-facturas.component.html',
  styleUrls: ['./summary-facturas.component.scss']
})
export class SummaryFacturasComponent implements OnInit {

  public startDate: IMyOptions = opcionesDatePicker;
  public finalDate: IMyOptions = opcionesDatePicker;
  public facturas: Factura[];
  public proveedores: Proveedor[];
  public formBusquedaFactura: FormGroup;
  public idProveedor: number = null;
  public fechaInicio: string = null;
  public fechaFin: string = null;
  public totalCordobasFacturas = 0;
  public buscando: string;

  constructor(private _route: ActivatedRoute
      , private _router: Router
      , private _formBuilderBusquedaFactura: FormBuilder
      , private _facturaService: FacturaService
      , private _proveedorService: ProveedorService) { }

  ngOnInit() {
      this.initFormBusquedaFactura();
      this.getProveedores();
  }

  initFormBusquedaFactura() {
      this.formBusquedaFactura = this._formBuilderBusquedaFactura.group({
          'proveedor' : new FormControl('', Validators.required)
          , 'fechaInicio' : new FormControl('', Validators.required)
          , 'fechaFin' : new FormControl('', Validators.required)
      });
  }

  getProveedores() {
    this._proveedorService.getProveedores(1).subscribe(
        response => {
          if (response.proveedores) {
            this.proveedores = response.proveedores;
          } else {
              Utils.showMsgInfo('No se logro obtener a los proveedores');
          }
        }, error => {
          Utils.showMsgError(Utils.msgError(error));
        }
    );
  }

  getDataFactura() {
      this.fechaInicio = this.formBusquedaFactura.value.fechaInicio === '' ? null : this.formBusquedaFactura.value.fechaInicio;
      this.fechaFin = this.formBusquedaFactura.value.fechaFin === '' ? null : this.formBusquedaFactura.value.fechaFin;
  }

    onChangeProveedor(event) {
      if (event === null || event === undefined) {
          this.idProveedor = null;
      } else {
          this.idProveedor = event.IdProveedor;
      }
    }

  findFacturas() {
      this.getDataFactura();

      if (this.idProveedor === null && this.fechaInicio === null && this.fechaFin === null) {
          Utils.showMsgInfo('Debes digitar al menos uno de los parametros de busqueda', 'Busqueda Facturas');
      } else if (this.fechaInicio !== null && this.fechaFin === null ) {
          Utils.showMsgInfo('Debes digitar la fecha fin', 'Busqueda Facturas');
      } else if (this.fechaInicio === null && this.fechaFin !== null) {
          Utils.showMsgInfo('Debes digitar la fecha inicio', 'Busqueda Facturas');
      } else if (this.fechaInicio > this.fechaFin ) {
          Utils.showMsgInfo('La fecha de inicio no puede ser mayor a la fecha fin!', 'Busqueda Facturas');
      } else {
          this._facturaService.getFacturas(true, this.fechaInicio, this.fechaFin, this.idProveedor, 2).subscribe(
              response => {
                  this.facturas = response.facturas;
                  this.sumarFacturas();

                  if (this.facturas.length === 0 ) {
                      Utils.showMsgInfo('No se encontraron facturas con los parametros digitados', 'Busqueda Facturas');
                  }
              } , error => {
                  Utils.showMsgError(Utils.msgError(error));
              }
          );
      }
  }

  sumarFacturas() {
    this.totalCordobasFacturas = 0;
    this.facturas.forEach( (value, index) => {
      this.totalCordobasFacturas += value.TotalCordobas;
    });
  }

  mostrarFactura(idFactura: number) {
        this._router.navigate(['factura/showFactura/' + idFactura]);
  }

}
