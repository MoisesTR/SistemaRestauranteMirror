import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GastoService} from '../../services/service.index';
import {Utils} from '../Utils';
import {SubclasificacionGasto} from '../../models/SubclasificacionGasto';
import {ClasificacionGasto} from '../../models/ClasificacionGasto';
import {Gasto} from '../../models/Gasto';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {

  formAddGasto: FormGroup;
  public gasto: Gasto;
  public clasificaciones: ClasificacionGasto;
  public subclasificaciones: SubclasificacionGasto;
  public idClasificacionSeleccionado: number;

  constructor(
      private _route: ActivatedRoute
      , private _router: Router
      , private _gastoService: GastoService
      , private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.initFormAddGasto();
    this.getClasificaciones();
  }

  initFormAddGasto() {
    this.formAddGasto = this.formBuilder.group( {
      'clasificacion': new FormControl('', [ Validators.required])
        , 'subclasificacion': new FormControl('', [ Validators.required])
        , 'fechaIngreso': new FormControl('', [ Validators.required])
        , 'numeroReferencia': new FormControl('', [ Validators.required])
        , 'codigoFactura': new FormControl('', [ Validators.required])
        , 'montoTotal': new FormControl(0, [ Validators.required])
        , 'conceptoGasto': new FormControl('', [ Validators.required])
    });
  }

  getClasificaciones() {
    this._gastoService.getClasificacionesGasto(1).subscribe(
        response => {
          if (response.clasificaciones) {
            this.clasificaciones = response.clasificaciones;
          } else {
            Utils.showMsgInfo('Ha ocurrido un error al obtener las clasificaciones!', 'Gastos');
          }
        }, error => {
          Utils.showMsgError(Utils.msgError(error), 'Gastos');
        }
    );
  }

  getSubclasificacionByIdClasificacion() {
    this._gastoService.getSubclasificacionesByIdClasificacion(this.idClasificacionSeleccionado).subscribe(
        response => {
          if (response.subclasificaciones) {
            this.subclasificaciones = response.subclasificaciones;
          } else {
              Utils.showMsgInfo('Ha ocurrido un error al obtener las subclasificaciones!', 'Gastos');
          }
        }, error => {
            Utils.showMsgError(Utils.msgError(error), 'Gastos');
        }
    );
  }

  getValuesFormAddGasto() {
    this.gasto.CodFactura = this.formAddGasto.controls['codigoFactura'].value;
    this.gasto.Fecha = this.formAddGasto.controls['fechaIngreso'].value;
    this.gasto.NoReferencia = this.formAddGasto.controls['numeroReferencia'].value;
    this.gasto.Monto = this.formAddGasto.controls['montoTotal'].value;
    this.gasto.DescGasto = this.formAddGasto.controls['conceptoGasto'].value;
  }

  changeClasificacion (event) {
    if (Utils.notNullOrUndefined(event)) {
      this.idClasificacionSeleccionado = event.idClasificacionSeleccionado;
      this.gasto.IdClasificacionGasto = this.idClasificacionSeleccionado;
    } else {
      this.idClasificacionSeleccionado = null;
      this.gasto.IdClasificacionGasto = this.idClasificacionSeleccionado;
    }
  }

  changeSubclasificacion(event) {

  }

  createGasto() {
    this.getValuesFormAddGasto();
  }

}
