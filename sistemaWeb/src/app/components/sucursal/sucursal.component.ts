import { Component, OnInit } from '@angular/core';
import {SucursalService} from "../../services/sucursal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Sucursal} from "../../models/Sucursal";

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css'],
  providers: [SucursalService]
})
export class SucursalComponent implements OnInit {

  public sucursal : Sucursal;
  public sucursales : Sucursal[];
  public mensaje : string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _sucursalService : SucursalService
  ) {

    this.initConstructorSucursal();
  }

  private initConstructorSucursal(){
    this.sucursal = new Sucursal(null,null,null,null,null,null,null);
  }

  ngOnInit() {
  }

  createSucursal(){

  }

  getSucursal(){

  }

  getSucursales(){

  }

  deleteSucursal(){

  }

  updateSucursal(){

  }


}
