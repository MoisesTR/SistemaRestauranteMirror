import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Subject } from "rxjs/Subject";
import { Utils } from "../../Utils";
import { Proveedor } from "@app/models/Proveedor";
import { DataTableDirective } from "angular-datatables";
import { ProveedorService, SpinnerService } from "@app/core/service.index";
import { idioma_espanol } from "@app/core/services/shared/global";
import swal from "sweetalert2";
import { ModalDirective } from "ng-uikit-pro-standard";

@Component({
	selector: "list-proveedor",
	templateUrl: "./list-proveedor.component.html",
	styleUrls: ["./list-proveedor.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListProveedorComponent implements OnInit, OnDestroy {
	@ViewChild("modalTelefonos") modalTelefonos: ModalDirective;

	public proveedorSeleccionado: Proveedor;
	public proveedores: Proveedor[] = [];
	public tituloPantalla = "Proveedor";

	@ViewChild(DataTableDirective) dtElement: DataTableDirective;

	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private proveedorService: ProveedorService,
		private spinner: SpinnerService,
		private cdr: ChangeDetectorRef
	) {
		this.proveedorSeleccionado = new Proveedor();
	}

	ngOnInit() {
		this.settingsDatatable();
		this.getProveedores();
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
						this.router.navigate(["proveedor/add"]);
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
			this.cdr.detectChanges();
		});
	}

	getProveedores() {
		this.spinner.display(true);
		this.proveedorService.getProveedores().subscribe(response => {
			if (response.proveedores) {
				this.proveedores = response.proveedores;
				this.dtTrigger.next();
				this.cdr.markForCheck();
			}
		});
	}

	getProveedoresRender() {
		this.proveedorService.getProveedores().subscribe(response => {
			if (response.proveedores) {
				this.proveedores = response.proveedores;
				this.rerender();
				this.cdr.markForCheck();
			}
		});
	}

	deleteProveedor(IdProveedor) {
		swal({
			title: "Estas seguro(a)?",
			text: "El proveedor sera eliminado permanentemente!",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, Eliminalo!",
			cancelButtonText: "Cancelar"
		}).then(result => {
			if (result.value) {
				this.proveedorService.deleteProveedor(IdProveedor).subscribe(response => {
					if (response.success) {
						swal("Eliminado!", "El proveedor ha sido eliminado exitosamente", "success").then(() => {
							this.getProveedoresRender();
						});
					}
				});
			}
		});
	}

	showModalTelefonos(proveedor: Proveedor) {
		this.proveedorSeleccionado = proveedor;
		this.modalTelefonos.show();
	}

	ngOnDestroy(): void {
		this.dtTrigger.unsubscribe();
	}
}
