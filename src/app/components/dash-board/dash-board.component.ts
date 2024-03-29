import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { FacturaService, ProveedorService } from "@app/core/service.index";
import { TrabajadorService } from "@app/core/service.index";
import { Proveedor } from "@app/models/Proveedor";
import { Trabajador } from "@app/models/Trabajador";
import { Utils } from "../Utils";
import { Global } from "@app/core/services/shared/global";
import { GastoService } from "@app/core/service.index";
import { ProductosTop } from "@app/models/ProductosTop";
import { Factura } from "@app/models/Factura";

declare var $: any;

@Component({
	selector: "app-dash-board",
	templateUrl: "./dash-board.component.html",
	styleUrls: ["./dash-board.component.css"]
})
export class DashBoardComponent implements OnInit {
	public fechaActual: string;
	public proveedores: Proveedor[];
	public trabajadores: Trabajador[];
	public trabajador: Trabajador;
	public proveedor: Proveedor;
	public url: string;
	public buscando;
	public tabSeleccionado = "proveedor";
	public urlImagen: string;
	public nombreCard = "";
	public docTrabajadorONombreRepresentanteProveedor = "";
	public telefonoMostrado = "";
	public productosTop: ProductosTop[];
	public facturas: Factura[] = [];

	constructor(
		private datePipe: DatePipe,
		private proveedorService: ProveedorService,
		private trabajadorService: TrabajadorService,
		private facturaService: FacturaService,
		private cdr: ChangeDetectorRef
	) {
		this.url = Global.url;
		this.urlImagen = this.url + "getImagen/temp/" + "no-img.jpg";
		this.trabajador = new Trabajador();
		this.proveedor = new Proveedor();
		this.productosTop = [];
	}

	ngOnInit() {
		this.fechaActual = this.transformDate(new Date());
		this.getProveedores();
		this.getTrabajadores();
		this.getTopProductos();
		this.getFacturas();
	}

	getTopProductos() {
		this.facturaService.getTop5ProductosMasCompradosFacturas().subscribe(response => {
			if (response.productostop) {
				this.productosTop = response.productostop;
				this.cdr.markForCheck();
			}
		});
	}

	getFacturas() {
		this.facturaService.getFacturasIngresadas().subscribe(response => {
			if (response.facturas) {
				this.facturas = response.facturas;
			}
		});
	}

	transformDate(date): string | null {
		return this.datePipe.transform(date, "yyyy-MM-dd");
	}

	getProveedores() {
		this.proveedorService.getProveedores(1).subscribe(response => {
			if (response.proveedores) {
				this.proveedores = response.proveedores;
			}
		});
	}

	getTrabajadores() {
		this.trabajadorService.getTrabajadores().subscribe(response => {
			if (response.trabajadores) {
				this.trabajadores = response.trabajadores;
			}
		});
	}

	visualizarTrabajador(trabajador: Trabajador) {
		this.trabajador = trabajador;
		this.tabSeleccionado = "trabajador";
		this.nombreCard = this.trabajador.Nombres;
		this.docTrabajadorONombreRepresentanteProveedor = this.trabajador.Documento;
		this.telefonoMostrado = this.trabajador.Telefono1;
	}

	visualizarProveedor(proveedor: Proveedor) {
		this.proveedor = proveedor;
		this.tabSeleccionado = "proveedor";
		this.nombreCard = this.proveedor.NombProveedor;
		this.docTrabajadorONombreRepresentanteProveedor = this.proveedor.NombRepresentante;
		this.telefonoMostrado = this.proveedor.Telefono1;
	}
}
