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
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'createProducto',params,{headers:headers})
      .map(res => res.json());

  }
  getProducto(IdProducto){
    return this._http.get(this.url + 'producto/'+IdProducto).map(res => res.json());
  }

  getProductos(){
    return this._http.get(this.url + 'productos').map(res => res.json());
  }

  updateProducto(IdProducto,Producto){

    let params = JSON.stringify(Producto);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'producto/'+IdProducto,params,{headers:headers})
      .map(res => res.json());
  }

  deleteProducto(IdProducto){

    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'producto/'+IdProducto,options)
      .map(res => res.json());
  }
}
