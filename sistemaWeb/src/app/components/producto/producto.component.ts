import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ProductoService]
})
export class ProductoComponent implements OnInit {

  mensaje: string
  constructor(
    private _productoService : ProductoService
  ) { }

  ngOnInit() {

    this.mensaje = this._productoService.getProducto();
  }


}
