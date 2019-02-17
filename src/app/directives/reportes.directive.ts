import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
@Directive({
	selector: "[reportes]"
})
export class ReportesDirective {
	@Input("reportes") nombreReportes: string;
	private data: any;

	constructor(el: ElementRef) {
		this.data = el.nativeElement.id;
	}
	@HostListener("click", ["$event"])
	imprimirReporteProductos(event: Event) {
		if (event) {
			var data = document.getElementById(this.data);
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
				pdf.save(this.nombreReportes + ".pdf"); // Generated PDF
			});
		}
	}
}
