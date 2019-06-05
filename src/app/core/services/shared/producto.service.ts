import { Injectable } from "@angular/core";
import { Global } from "./global";
import "rxjs/add/operator/map";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import {Producto} from '@app/models/Producto';
import {TipoProductoEnum} from '@app/Enums/TipoProductoEnum';

@Injectable()
export class ProductoService {
	public url: string;

	constructor(private _http: HttpClient) {
		this.url = Global.url;
	}

	createProducto(producto): Observable<any> {
		const params = JSON.stringify(producto);
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		return this._http.post(this.url + "productos", params, { headers: headers });
	}
	getProducto(idProducto): Observable<any> {
		return this._http.get(this.url + "productos/" + idProducto);
	}

	getProductos(habilitado = 1): Observable<any> {
		return this._http.get(this.url + "productos?Habilitado=" + habilitado);
	}

	updateProducto(producto): Observable<any> {
		const params = JSON.stringify(Producto);
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: "token"
		});

		return this._http.put(this.url + "productos/" + producto.IdProducto, params, { headers: headers });
	}

	deleteProducto(idProducto): Observable<any> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: "token"
		});

		const body = JSON.stringify({ Habilitado: false });

		return this._http.request("delete", this.url + "productos/" + idProducto, { headers: headers, body: body });
	}

    filtrarProdutosNoAlimenticios(productos : Producto[]): Producto[] {
	    return productos.filter( p => p.IdTipInsumo !== TipoProductoEnum.Alimento);
    }

    filtrarProductosAlimenticios(productos : Producto[]) : Producto[] {
        return productos.filter( p => p.IdTipInsumo === TipoProductoEnum.Alimento);
    }
}
