import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductoService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }

  createProducto(Producto){
    let params = JSON.stringify(Producto);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url+'producto',params,{headers:headers})
      .map(res => res.json());

  }
  getProducto(IdProducto){
    return this._http.get(this.url + 'producto/'+IdProducto).map(res => res.json());
  }

  getProductos(Habilitado = 1){
    return this._http.get(this.url + 'productos?Habilitado='+Habilitado).map(res => res.json());
  }


  updateProducto(Producto){

    let params = JSON.stringify(Producto);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'producto',params,{headers:headers})
      .map(res => res.json());
  }

  deleteProducto(IdProducto){
   /* let params = JSON.stringify(Producto);*/
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let body = JSON.stringify(
      {
        "Habilitado": 0

      }
    );

    let options = new RequestOptions({headers:headers,body:body});
    return this._http.delete(this.url+'producto/'+IdProducto,options)
      .map(res => res.json());

  }
}