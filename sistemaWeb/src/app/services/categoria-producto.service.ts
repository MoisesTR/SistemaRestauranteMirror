import { Injectable } from '@angular/core';
import { Global } from './global';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoriaProductoService {

  public url: string;

  constructor(
    private _http: Http
  ) {
    this.url = Global.url;
  }

  createCategoriaProducto(CategoriaProducto){

    let params = JSON.stringify(CategoriaProducto);
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'createCategoria',params,{headers:headers})
                      .map(res => res.json());

  }

  getCategoriaProducto(IdCategoria){
    return this._http.get(this.url + 'categoria/'+IdCategoria).map(res => res.json());
  }

  getCategoriasProductos(){
    return this._http.get(this.url + 'categorias').map(res => res.json());
  }

  updateCategoriaProducto(IdCategoria,Categoria){

    let params = JSON.stringify(Categoria);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    })

    return this._http.put(this.url+'categoria/'+IdCategoria,params,{headers:headers})
                      .map(res => res.json());

  }

  deleteCategoriaProducto(IdCategoria){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    let options = new RequestOptions({headers:headers});
    return this._http.delete(this.url+'categoria/'+IdCategoria,options)
                        .map(res => res.json());
  }

}
