import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ClasificacionProducto } from "@app/models/ClasificacionProducto";
import {
	ClasificacionProductoService,
	ProductoProveedorService,
	ProductoService,
	ProveedorService
} from "@app/core/service.index";
import { Producto } from "@app/models/Producto";
import { Global } from "@app/core/services/shared/global";
import { Proveedor } from "@app/models/Proveedor";
import { Utils } from "../Utils";

@Component({
	selector: "app-galeria-productos-proveedores",
	templateUrl: "./galeria-productos-proveedores.html",
	styleUrls: ["./galeria-productos-proveedores.component.css"]
})
export class GaleriaProductosProveedoresComponent implements OnInit {
	public clasificaciones: ClasificacionProducto[];
	public proveedores: Proveedor[];
	public productos: Producto[];
	public url: string;
	public idProveedorSeleccionado: number;
	public buscando;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private clasificacionService: ClasificacionProductoService,
		private productoService: ProductoService,
		private proveedorService: ProveedorService,
		private productoProveedorService: ProductoProveedorService
	) {}

	ngOnInit() {
		this.url = Global.url;
		this.getProveedores();
	}

	getProveedores() {
		this.proveedorService.getProveedores(1).subscribe(
			response => {
				if (response.proveedores) {
					this.proveedores = response.proveedores;
				} else {
					Utils.showMsgInfo("Ha ocurrido un error al obtener los proveedores", "Busqueda productos proveedor");
				}
			},
			error => {
				Utils.showMsgError(error, "Busqueda productos proveedor");
			}
		);
	}

	onChangeProveedor(event) {
		if (event === null || event === undefined) {
			this.idProveedorSeleccionado = null;
		} else {
			this.idProveedorSeleccionado = event.IdProveedor;
			this.getProductosOfProveedor();
		}
	}
	getProductosOfProveedor() {
		this.productoProveedorService.getProductosOfProveedor(this.idProveedorSeleccionado).subscribe(
			response => {
				if (response.productos) {
					this.productos = response.productos;
					if (this.productos.length === 0) {
						Utils.showMsgInfo("No se han encontrado productos!", "Busqueda productos proveedor");
					}
				} else {
					Utils.showMsgInfo("Ha ocurrido un error al obtener los productos", "Busqueda productos proveedor");
				}
			},
			error => {
				Utils.showMsgError(error, "Busqueda productos proveedor");
			}
		);
	}
}
