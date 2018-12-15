import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GastoService} from '../../services/service.index';
import {Utils} from '../Utils';
import {SubclasificacionGasto} from '../../models/SubclasificacionGasto';
import {ClasificacionGasto} from '../../models/ClasificacionGasto';
import {Gasto} from '../../models/Gasto';
import {DateUtil} from '../../infraestructura/Util/DateUtil';
import swal from 'sweetalert2';
import {Producto} from '../../models/Producto';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {

  formAddGasto: FormGroup;
  public gasto: Gasto;
  public clasificaciones: ClasificacionGasto[];
  public subclasificaciones: SubclasificacionGasto[];
  public idClasificacionSeleccionado: number;
  public idSubClasificacionSeleccionado: number;

  constructor(
      private _route: ActivatedRoute
      , private _router: Router
      , private _gastoService: GastoService
      , private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initFormAddGasto();
    this.getClasificaciones();
    this.gasto = new Gasto();
  }

  initFormAddGasto() {
    this.formAddGasto = this.formBuilder.group( {
      'clasificacion': new FormControl('', [ Validators.required])
        , 'subclasificacion': new FormControl('', [ ])
        , 'fechaIngreso': new FormControl('', [ Validators.required])
        , 'numeroReferencia': new FormControl('', [])
        , 'codigoFactura': new FormControl('', [])
        , 'montoTotal': new FormControl(0, [ Validators.required])
        , 'conceptoGasto': new FormControl('', [ Validators.required, Validators.maxLength(1000), Validators.minLength(5)])
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

  changeClasificacion (event) {
    if (Utils.notNullOrUndefined(event)) {
      this.idClasificacionSeleccionado = event.IdClasificacion;
      this.gasto.IdClasificacion = this.idClasificacionSeleccionado;
      this.getSubclasificacionByIdClasificacion();
    } else {
      this.idClasificacionSeleccionado = null;
      this.gasto.IdClasificacion = this.idClasificacionSeleccionado;
    }
  }

  changeSubclasificacion(event) {
      if (Utils.notNullOrUndefined(event)) {
          this.idSubClasificacionSeleccionado = event.IdSubClasificacion;
          this.gasto.IdSubClasificacion = this.idSubClasificacionSeleccionado;
      } else {
          this.idSubClasificacionSeleccionado = null;
          this.gasto.IdSubClasificacion = this.idSubClasificacionSeleccionado;
      }
  }

  createGasto() {
    this.getValuesFormAddGasto();
    console.log(this.gasto);

    if (this.gastoValido()) {
      this._gastoService.createGasto(this.gasto).subscribe(
          response => {
            if (response.IdGasto) {
                this.agregarOtroGasto();
            }  else {
              Utils.showMsgInfo('Ha ocurrido un error al crear el gasto', 'Gasto');
            }
          }, error => {
            Utils.showMsgError(Utils.msgError(error), 'Gasto');
          }, () => {

        }
      );
    }
  }

    getValuesFormAddGasto() {
        this.gasto.CodigoFactura = this.formAddGasto.controls['codigoFactura'].value;
        this.gasto.FechaIngreso = this.formAddGasto.controls['fechaIngreso'].value;
        this.gasto.NoReferencia = this.formAddGasto.controls['numeroReferencia'].value;
        this.gasto.MontoTotal = this.formAddGasto.controls['montoTotal'].value;
        this.gasto.ConceptoGasto = this.formAddGasto.controls['conceptoGasto'].value;
    }

    gastoValido() {

    if (this.gasto.MontoTotal <= 0) {
        Utils.showMsgInfo('El monto del gasto debe ser mayor a cero!');
        return false;
      }

      if (DateUtil.formatDateYYYYMMDD(this.gasto.FechaIngreso) > DateUtil.getDate()) {
          Utils.showMsgInfo('La fecha del gasto no puede ser mayor a la fecha actual!');
          return false;
      }

      return true;
    }

    agregarOtroGasto() {
        swal({
            title: 'El gasto se ha creado exitosamente!',
            text: 'Deseas agregar otro?',
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI',
            cancelButtonText: 'NO'
        }).then((result) => {
            if (result.value) {
                this.formAddGasto.reset();
                this.gasto = new Gasto();
            } else if (result.dismiss === swal.DismissReason.cancel) {
                this._router.navigate(['/dashboard']);
            }
        });
    }

}
