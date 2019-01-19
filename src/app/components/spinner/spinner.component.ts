import { Component, OnInit, Input } from '@angular/core';
import { SpinnerService } from '@app/core/services/shared/spinner.service';
import {Utils} from '../Utils';

@Component({
  selector: 'app-consumo-interno',
  templateUrl: './consumo-interno.component.html',
  styleUrls: ['./consumo-interno.component.scss'],
  providers:[SpinnerService]
})
export class ConsumoInternoComponent implements OnInit {

  public spinnerVisibilidad:boolean;

    constructor(
        private _spinnerServicio: SpinnerService
    ){

    }

    ngOnInit() {
      this._spinnerServicio.convertir.subscribe(response=> this.spinnerVisibilidad = response);
    }


}