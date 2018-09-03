import {Injectable} from '@angular/core';
import {Global} from './global';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CategoriaProductoService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    this.url = Global.url;
  }

  createCategoriaProducto(CategoriaProducto) : Observable<any> {

    let params = JSON.stringify(CategoriaProducto);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

    return this._http.post(this.url+'categoria',params,{headers:headers})

  }

  getCategoriaProducto(IdCategoria) : Observable<any> {
    return this._http.get(this.url + 'categoria/'+IdCategoria)
  }

  getCategoriasProductos(Habilitado = 1): Observable<any> {
    return this._http.get(this.url + 'categorias?Habilitado='+Habilitado)
  }

  updateCategoriaProducto(Categoria) : Observable<any> {

    let params = JSON.stringify(Categoria);
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'categoria/'+Categoria.IdCategoria,params,{headers:headers});

  }

  deleteCategoriaProducto(IdCategoria) : Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });
      let body = JSON.stringify({"Habilitado": 0});

      return this._http.request('delete',this.url+'categoria/'+IdCategoria,{headers:headers,body:body});
  }

}
