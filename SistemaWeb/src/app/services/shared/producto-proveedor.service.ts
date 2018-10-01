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

  createProductoProveedor(ProductoProveedor): Observable<any> {
    const params = JSON.stringify(ProductoProveedor);
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token'
    });

    return this._http.post(this.url + 'producto/proveedor', params,{ headers: headers});
  }

  getProductosProveedor(IdProductoProveedor) : Observable<any> {
    return this._http.get(this.url + 'producto/'+IdProductoProveedor)
  }

  getProductoProveedores() : Observable<any> {
    return this._http.get(this.url + 'productos/proveedores')
  }

  getProductosOfProveedor(IdProveedor): Observable<any> {
    return this._http.get(this.url + 'productos/proveedor/'+IdProveedor);
  }

  getProductosOfProveedorFiltrado(IdProveedor, IdFactura): Observable<any> {
        return this._http.get(this.url + 'productos/proveedor/' + IdProveedor + '/' + IdFactura);
  }
  updateProductoProveedor(ProductoProveedor): Observable<any> {

    const params = JSON.stringify(ProductoProveedor);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'token'
    });

    return this._http.put(this.url+'productoproveedor'+params,{headers:headers})
  }

  deconsteProductoProveedor(IdProductoProveedor): Observable<any> {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'token'
      });

      const body = JSON.stringify({ 'Habilitado': false});

      return this._http.request('deconste', this.url + 'producto/proveedor/' + IdProductoProveedor, {headers: headers, body: body});

  }

}
