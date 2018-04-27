import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductoProveedorService{

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  createProductoProveedor(ProductoProveedor) : Observable<any> {
    let params = JSON.stringify(ProductoProveedor);
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token'
    });

    return this._http.post(this.url+'producto/proveedor',params,{headers:headers})
  }

  getProductosProveedor(IdProductoProveedor) : Observable<any> {
    return this._http.get(this.url + 'producto/'+IdProductoProveedor)
  }

  getProductoProveedores() : Observable<any> {
    return this._http.get(this.url + 'productos/proveedores')
  }

  deleteProductoProveedor(Id) : Observable <any> {

      let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'token'
      });

      let body = JSON.stringify({"Habilitado": 0});

          return this._http.request('delete',this.url+'producto/'+Id,{headers:headers,body:body})
  }
  updateProductoProveedor(ProductoProveedor) : Observable<any> {

    let params = JSON.stringify(ProductoProveedor);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'productoproveedor'+params,{headers:headers})
  }

}
