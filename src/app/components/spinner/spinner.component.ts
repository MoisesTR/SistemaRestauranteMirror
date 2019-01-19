import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SpinnerService } from '@app/core/services/shared/spinner.service';
import {Utils} from '../Utils';

@Component({
  selector: 'cargandooo',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  providers:[SpinnerService]
})
export class SpinnerComponent implements OnInit {

  public spinnerVisibilidad:boolean;
  @Input() p:boolean;

    constructor(
        private _spinnerServicio: SpinnerService
    ){

    }

    ngOnInit() {  
      console.log("se logro");
      setTimeout(() => {
        this.p = false
        }, 3000);
        
      //this._spinnerServicio.convertir.subscribe(response=> this.spinnerVisibilidad = response);
    }


}