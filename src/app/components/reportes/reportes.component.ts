import { Component, OnInit } from "@angular/core";
import { ReporteService } from "@app/core/service.index";

@Component({
	selector: "app-reportes",
	templateUrl: "./reportes.component.html",
	styleUrls: ["./reportes.component.scss"]
})
export class ReportesComponent implements OnInit {

    public imgProducto = 'productos.png';
    public imgProveedor = 'proveedores.jpg';
    public imgFactura = 'facturas.jpg';
    public imgTrabajadores = 'trabajadores.jpg';
    public carpetaImagenes = 'reportes';

	constructor(private reporteService: ReporteService) {}

	ngOnInit() {}

	imprimirReporteProductos() {}

	imprimirReporteProveedores() {}
}
