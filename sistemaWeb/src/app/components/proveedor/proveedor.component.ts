import { Component, OnInit } from '@angular/core';
import {ProveedorService} from '../../services/proveedor.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Provedor} from "../../models/Provedor";
import {idioma_espanol} from "../../services/global";
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  providers: [ProveedorService]
})
export class ProveedorComponent implements OnInit {

  public proveedor: Provedor;
  public proveedores: Provedor[];
  public mensaje : string;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _proveedorService : ProveedorService
  ) {
    this.proveedor = new Provedor(null,null,null,null,null,null,null);
  }


  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      /*language: idioma_espanol,
      select: true*/
    };

    this._proveedorService.getProveedores().subscribe(
      response => {
        if(response.proveedores){
          this.proveedores = response.proveedores;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );
  }

  createProveedor(){

  }

  getProveedor(){

  }

  getProveedores(){

  }

  updateProveedor(){

  }

  deleteProveedor(){

  }

}
