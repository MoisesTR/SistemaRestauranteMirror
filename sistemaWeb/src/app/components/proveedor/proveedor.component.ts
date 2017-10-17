import { Component, OnInit } from '@angular/core';
import {ProveedorService} from '../../services/proveedor.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Provedor} from "../../models/Provedor";

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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _proveedorService : ProveedorService
  ) { }

  private initConstructorProveedor(){
    this.proveedor = new Provedor(null,null,null,null,null,null,null);
  }

  ngOnInit() {
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
