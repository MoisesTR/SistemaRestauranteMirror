import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductoService} from '../../../services/producto.service';
import {Producto} from '../../../models/Producto';
declare var $:any;

@Component({
  selector: 'app-addfactura',
  templateUrl: './addfactura.component.html',
  styleUrls: ['./addfactura.component.css']
})
export class AddfacturaComponent implements OnInit {

  public productos : Producto[];
  public producto : Producto;

  constructor(
      private _route: ActivatedRoute
      , private _router: Router
      , private _productoService : ProductoService) { }

  ngOnInit() {

    $(document).ready(()=>{
      $('.dropify').dropify();
    });

    this.getProductos();



  }

  getProductos(){
    this._productoService.getProductos().subscribe(
        response =>{

          if(response.productos){
            this.productos = response.productos;
          }
        }, error =>{

        }, () =>{

        }
    )
  }

}
