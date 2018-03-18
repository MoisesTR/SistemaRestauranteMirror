import { Component, OnInit } from '@angular/core';
import {BodegaSucursalService} from "../../services/bodega-sucursal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BodegaSucursal} from "../../models/BodegaSucursal";

@Component({
  selector: 'app-bodega-sucursal',
  templateUrl: './bodega-sucursal.component.html',
  styleUrls: ['./bodega-sucursal.component.css']
})
export class BodegaSucursalComponent implements OnInit {


  public bodegasucursal: BodegaSucursal;
  public bodegasucursales: BodegaSucursal[];

  constructor(
  	private _BodegaSucursal : BodegaSucursalService
  	) {

  	this._BodegaSucursal.getBodegaSucursales().subscribe(

  		response=>{

  		if(response.bodegasucursales){
  			this.bodegasucursales = response.bodegasucursales;
  		}
  	},error =>{

  	}

  	)

  }

  private initConstructorBodegaSucursal(){
    this.bodegasucursal = new BodegaSucursal(null,null,null,null);
  }

  ngOnInit() {
  }

}
