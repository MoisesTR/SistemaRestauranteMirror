import {Injectable} from '@angular/core';
import {Global} from './global';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ProductoService {

  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  createProducto(Producto): Observable<any>{
    let params = JSON.stringify(Producto);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'producto',params,{headers:headers})

  }
  getProducto(IdProducto): Observable<any>{
    return this._http.get(this.url + 'producto/'+IdProducto)
  }

  getProductos(Habilitado = 1): Observable<any>{
    return this._http.get(this.url + 'productos?Habilitado='+Habilitado)
  }

  updateProducto(Producto): Observable<any>{

    let params = JSON.stringify(Producto);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'producto/'+Producto.IdProducto,params,{headers:headers})
  }

  deleteProducto(IdProducto): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let body = JSON.stringify({"Habilitado": 0});

    return this._http.request('delete',this.url+'producto/'+IdProducto,{headers:headers,body:body})

  }
}
