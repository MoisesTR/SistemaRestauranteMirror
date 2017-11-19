import { Component, OnInit } from '@angular/core';
import {UnidadMedida} from "../../models/UnidadMedida";
declare var $:any;
@Component({
  selector: 'app-unidadmedida',
  templateUrl: './unidadmedida.component.html',
  styleUrls: ['./unidadmedida.component.css']
})
export class UnidadmedidaComponent implements OnInit {

  public unidadMedida : UnidadMedida;
  public unidadesMedida : UnidadMedida[];
  constructor() { }

  ngOnInit() {
    $(document).ready(function(){
      $(".selectclasificacionunidadmedida").select2({
        maximumSelectionLength: 1
      });
    });
  }

  getUnidadMedida() {}

  getUnidadesMedida() {}

  updateUnidadMedida() {}

  deleteUnidadMedida() {}



}
