import { Component, OnInit } from '@angular/core';
import {UnidadMedida} from "../../models/UnidadMedida";
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
  }

  getUnidadMedida() {}

  getUnidadesMedida() {}

  updateUnidadMedida() {}

  deleteUnidadMedida() {}



}
