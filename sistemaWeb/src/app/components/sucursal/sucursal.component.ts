import { Component, OnInit } from '@angular/core';
import {SucursalService} from "../../services/sucursal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Sucursal} from "../../models/Sucursal";
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";

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

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
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

    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      /*select: true*/
    };

    this._sucursalService.getSucursales().subscribe(
      response => {
        if(response.sucursales){
          this.sucursales = response.sucursales;
          console.log(this.sucursales);
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );
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
