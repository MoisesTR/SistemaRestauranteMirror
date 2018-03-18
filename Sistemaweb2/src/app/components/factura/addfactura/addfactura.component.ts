import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-addfactura',
  templateUrl: './addfactura.component.html',
  styleUrls: ['./addfactura.component.css']
})
export class AddfacturaComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    $(document).ready(()=>{      
      $('.dropify').dropify();
    });

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

      // $(".selectunidadmedidad").select2({
      //   maximumSelectionLength: 1
      // });
    });
  }

}
