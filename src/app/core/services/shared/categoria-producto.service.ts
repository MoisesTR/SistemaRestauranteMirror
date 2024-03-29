import { EventEmitter, Injectable } from "@angular/core";
import { Global } from "./global";
import "rxjs/add/operator/map";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CategoriaProducto } from "@app/models/CategoriaProducto";
import { TipoProductoEnum } from "@app/Enums/TipoProductoEnum";

@Injectable()
export class CategoriaProductoService {
	public url: string;
	public eventoModal = new EventEmitter<any>();

	constructor(private _http: HttpClient) {
		this.url = Global.url;
	}

	mostrarModal() {
		this.eventoModal.emit(true);
	}

	createCategoriaProducto(CategoriaProducto): Observable<any> {
		const params = JSON.stringify(CategoriaProducto);
		const headers = new HttpHeaders({ "Content-Type": "application/json" });

		return this._http.post(this.url + "categoria", params, { headers: headers });
	}

	getCategoriaProducto(IdCategoria): Observable<any> {
		return this._http.get(this.url + "categoria/" + IdCategoria);
	}

	getCategoriasProductos(Habilitado = 1): Observable<any> {
		return this._http.get(this.url + "categorias?Habilitado=" + Habilitado);
	}

	updateCategoriaProducto(Categoria): Observable<any> {
		const params = JSON.stringify(Categoria);
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: "token"
		});

		return this._http.put(this.url + "categoria/" + Categoria.IdCategoria, params, { headers: headers });
	}

	deleteCategoriaProducto(IdCategoria): Observable<any> {
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			Authorization: "token"
		});
		const body = JSON.stringify({ Habilitado: 0 });

		return this._http.request("delete", this.url + "categoria/" + IdCategoria, { headers: headers, body: body });
	}

	filterCategoriasConsumoInterno(categorias: CategoriaProducto[]) {
		return categorias.filter(categoria => categoria.IdTipInsumo !== TipoProductoEnum.Alimento);
	}

    filterCategoriasProductosAlimenticios(categorias: CategoriaProducto[]) {
        return categorias.filter(categoria => categoria.IdTipInsumo === TipoProductoEnum.Alimento);
    }
}
