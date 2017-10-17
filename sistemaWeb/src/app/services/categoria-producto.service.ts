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

  createCategoriaProducto(categoriaProducto){

    let params = JSON.stringify(categoriaProducto);
    let headers = new Headers({'Content-Type':''});

    return this._http.post(this.url+'createCategoria',params,{headers:headers})
                      .map(res => res.json());

  }

  getCategoriaProducto(){

  }

  getCategoriaProductos(){

  }

  updateCategoriaProducto(){

  }

  deleteCategoriaProducto(){

  }


}
