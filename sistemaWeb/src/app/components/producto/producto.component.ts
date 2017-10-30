import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Producto} from "../../models/Producto";
import { Subject } from 'rxjs/Rx';
import swal from 'sweetalert2';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ProductoService]
})
export class ProductoComponent implements OnInit {

  public producto : Producto;
  public productos: Producto[];

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ProductoServicio : ProductoService
  ){

    this._ProductoServicio.getProductos().subscribe(

      response =>{

          if(response.productos){
            this.productos = response.productos;
            this.dtTrigger.next();
          }
      }, error =>{

      }
    )

  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this._ProductoServicio.getProductos().subscribe(
      response => {
        if(response.productos){
          this.productos = response.productos;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );

  }
   /* $(document).ready(function () {
      $('select[name="datatables_length"]').material_select();
    });

    $(document).ready(function() {
      $('#datatables').DataTable;
    } );

    $(document).ready(function(){

      $('.dropify').dropify();
    });

    $(".selectcategoria").select2({
      maximumSelectionLength: 1
    });

    $(".selectcsubclasificación").select2({
      maximumSelectionLength: 1
    });

    $(".selectproveedor").select2({
      maximumSelectionLength: 1
    });

    $(".selectenvase").select2({
      maximumSelectionLength: 1
    });

    $(".selectempaque").select2({
      maximumSelectionLength: 1
    });

    $(".selectunidadmedida").select2({
      maximumSelectionLength: 1
    });

    $(".selectvalorunidadmedida").select2({
      maximumSelectionLength: 1
    });

    $(".selectestado").select2({
      maximumSelectionLength: 1
    });

    $(".selectcclasificacion").select2({
      maximumSelectionLength: 1
    });*/


}
