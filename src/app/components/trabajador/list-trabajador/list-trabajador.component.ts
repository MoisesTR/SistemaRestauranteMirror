import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs/Subject";

import { DataTableDirective } from "angular-datatables";
import { SpinnerService, TrabajadorService } from "@app/core/service.index";
import { idioma_espanol } from "@app/core/services/shared/global";
import { Trabajador } from "@app/models/Trabajador";
import swal from "sweetalert2";
import { Utils } from "../../Utils";

@Component({
	selector: "app-list-trabajador",
	templateUrl: "./list-trabajador.component.html",
	styleUrls: ["./list-trabajador.component.css"]
})
export class ListTrabajadorComponent implements OnInit, OnDestroy {
	public trabajador: Trabajador;
	public trabajadores: Trabajador[];
	public tituloPantalla = "Trabajador";
	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private trabajadorService: TrabajadorService,
		private spinner: SpinnerService
	) {}

	ngOnInit() {
		this.settingsDatatable();
		this.getTrabajadores();
	}

	getTrabajadores() {
		this.spinner.display(true);
		this.trabajadorService.getTrabajadores().subscribe(response => {
			if (response.trabajadores) {
				this.trabajadores = response.trabajadores;
				this.dtTrigger.next();
			}
		});
	}

	getTrabajadoresRender() {
		this.trabajadorService.getTrabajadores().subscribe(response => {
			if (response.trabajadores) {
				this.trabajadores = response.trabajadores;
				this.rerender();
			} else {
			}
		});
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
					className: "btn orange-chang float-right-dt white-text",
					action: (e, dt, node, config) => {
						this.router.navigate(["trabajador/add"]);
					}
				}
			]
		};
	}

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			// Destroy the table first
			dtInstance.destroy();
			// Call the dtTrigger to rerender again
			this.dtTrigger.next();
		});
	}

	deleteTrabajador(IdTrabajador) {
		swal.fire({
			title: "Estas seguro(a)?",
			text: "El trabajador sera eliminado!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, Eliminalo!",
			cancelButtonText: "Cancelar"
		}).then(result => {
			if (result.value) {
				this.trabajadorService.deleteTrabajador(IdTrabajador).subscribe(response => {
					if (response.success) {
						swal.fire("Eliminado!", "El trabajador ha sido eliminado exitosamente", "success").then(() => {
							this.getTrabajadoresRender();
						});
					}
				});
			}
		});
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}
}
