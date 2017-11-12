import { Component, OnInit } from '@angular/core';
import {ProductoProveedorService} from '../../services/producto-proveedor.service';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductoProveedor} from "../../models/ProductoProveedor";

@Component({
  selector: 'app-producto-proveedor',
  templateUrl: './producto-proveedor.component.html',
  styleUrls: ['./producto-proveedor.component.css'],
  providers:[ProductoProveedorService]
})
export class ProductoProveedorComponent implements OnInit {

	public productoproveedor:ProductoProveedor;
	public productoproveedores:ProductoProveedor[];


  constructor(
  			
  			private _router:Router,
  			private _route: ActivatedRoute,
  			private _ProductoProveedorServicio:ProductoProveedorService
  	) { }

  ngOnInit() {


  }

  

  }