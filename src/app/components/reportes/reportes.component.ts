import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ReporteService } from "@app/core/service.index";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

@Component({
	selector: "app-reportes",
	templateUrl: "./reportes.component.html",
	styleUrls: ["./reportes.component.scss"]
})
export class ReportesComponent implements OnInit {
	public imgProducto = "productos.png";
	public imgProveedor = "proveedores.jpg";
	public imgFactura = "facturas.jpg";
	public imgTrabajadores = "trabajadores.jpg";
	public carpetaImagenes = "reportes";

	constructor(private reporteService: ReporteService) {}

	ngOnInit() {}

	//aqui obtenemnos el id desde el html, desde la parte que se quiere imprimir
	/* imprimirReporteProductos() {
		var data = document.getElementById("probar");
		html2canvas(data, { allowTaint: true, useCORS: false, scaler: 1 }).then(canvas => {
			// Few necessary setting options
			var imgWidth = 208;
			var pageHeight = 295;
			var imgHeight = (canvas.height * imgWidth) / canvas.width;
			var heightLeft = imgHeight;

			const contentDataURL = canvas.toDataURL("image/png");
			let pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF
			var position = 0;
			pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
			pdf.save("reporte.pdf"); // Generated PDF
		});
	} */

	imprimirReporteProveedores() {}
}
