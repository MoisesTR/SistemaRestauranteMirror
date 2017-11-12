import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProductoProveedorService{

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }

  createProductoProveedor(ProductoProveedor){
    let params = JSON.stringify(ProductoProveedor);
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'createProductoProveedor',params,{headers:headers})
      .map(res => res.json());
  }
 
  getProductoProveedor(IdProductoProveedor){
    return this._http.get(this.url + 'productoproveedor/'+IdProductoProveedor).map(res => res.json());
  }

  getProductoProveedores(){
    return this._http.get(this.url + 'productoproveedores').map(res => res.json());
  }

  updateProductoProveedor(ProductoProveedor){

    let params = JSON.stringify(ProductoProveedor);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'productoproveedor'+params,{headers:headers})
     .map(res => res.json());
  }

  
}