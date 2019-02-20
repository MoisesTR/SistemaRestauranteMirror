import {Component, OnInit, ViewChild} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {DataTableDirective} from 'angular-datatables';
import {FacturaService} from '@app/core/service.index';
import {ActivatedRoute, Router} from '@angular/router';
import {Factura} from '@app/models/Factura';
import {idioma_espanol} from '@app/core/services/shared/global';
import {Producto} from '@app/models/Producto';
import {DatePipe} from '@angular/common';

@Component({
	selector: "app-list-factura",
	templateUrl: "./list-factura.component.html",
	styleUrls: ["./list-factura.component.css"]
})
export class ListFacturaComponent implements OnInit {
	public facturas: Factura[];
	public productos: Producto[];
	public tituloPantalla = "Factura";
	public fechaActual: string;
	dtOptions: DataTables.Settings = {};
	// We use this trigger because fetching the list of persons can be quite long,
	// thus we ensure the data is fetched before rendering
	dtTrigger: Subject<any> = new Subject<any>();

	@ViewChild(DataTableDirective) dtElement: DataTableDirective;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _facturaService: FacturaService,
		private datePipe: DatePipe
	) {}

	ngOnInit() {
		this.fechaActual = this.transformDate(new Date());
		this.settingsDatatable();
		this.getFacturas();
	}

	transformDate(date): string | null {
		return this.datePipe.transform(date, "yyyy-MM-dd");
	}

	settingsDatatable() {
		/*PROPIEDADES GENERALES DE LA DATATABLE*/
		this.dtOptions = <DataTables.Settings>{
			pagingType: "full_numbers",
			pageLength: 10,
			language: idioma_espanol,
			lengthChange: false,
			responsive: true,
			dom: "Bfrtip",
			buttons: [
				{
					text: "Agregar",
					key: "1",
					className: "btn orange-chang float-right-dt",
					action: (e, dt, node, config) => {
						this._router.navigate(["factura/add"]);
					}
				}
			]
		};
	}

	getFacturas() {
		this._facturaService.getFacturas(null, true, this.fechaActual, this.fechaActual, 1, 2, null).subscribe(response => {
			if (response.facturas) {
				this.facturas = response.facturas;
				this.dtTrigger.next();
			}
		});
	}
}
