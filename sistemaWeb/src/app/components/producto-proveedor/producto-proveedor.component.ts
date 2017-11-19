import { Component, OnInit } from '@angular/core';
import {ProductoProveedorService} from '../../services/producto-proveedor.service';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductoProveedor} from "../../models/ProductoProveedor";
declare var $:any;

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

    var IdProducto = [
      "Producto 1"      
      , "Producto 2"
    ];

    var IProveedor = [
      "Cainsa"
      , "Tiptop"

    ];

    $(document).ready(function(){
         
      $('.autocomplete-producto').mdb_autocomplete({
          data: IdProducto
      });  
      
      $('.autocomplete-proveedor').mdb_autocomplete({
        data: IProveedor
      });    

      $(".selectempaque").select2({
        maximumSelectionLength: 1
      });

      $(".selectunidadmedida").select2({
        maximumSelectionLength: 1
      });

      $(".selectenvase").select2({
        maximumSelectionLength: 1
      });

    });
  }

  

  }