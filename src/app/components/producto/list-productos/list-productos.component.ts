import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ProductoService, SpinnerService } from "@app/core/service.index";
import { ActivatedRoute, Router } from "@angular/router";
import { Producto } from "@app/models/Producto";
import { Subject } from "rxjs";
import swal from "sweetalert2";
import { idioma_espanol } from "@app/core/services/shared/global";
import { DataTableDirective } from "angular-datatables";
import { Subscription } from "rxjs/Subscription";

@Component({
	selector: "app-list-productos",
	templateUrl: "./list-productos.component.html",
	styleUrls: ["./list-productos.component.css"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListProductosComponent implements OnInit, OnDestroy {
	subscription: Subscription;
	public producto: Producto;
	public productos: Producto[];

	@ViewChild(DataTableDirective)
	dtElement: DataTableDirective;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productoService: ProductoService,
		private spinner: SpinnerService,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
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
						this.router.navigate(["producto/add"]);
					}
				}
			]
		};

		this.getProductos();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
		this.dtTrigger.unsubscribe();
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

	getProductos() {
		this.spinner.display(true);
		this.subscription = this.productoService.getProductos().subscribe(response => {
			if (response.productos) {
				this.productos = this.productoService.filtrarProductosAlimenticios(response.productos);
				this.dtTrigger.next();
				this.cdr.markForCheck();
			}
		});
	}

	getProductosRender() {
		this.productoService.getProductos().subscribe(response => {
			if (response.productos) {
                this.productos = this.productoService.filtrarProductosAlimenticios(response.productos);
				this.rerender();
			}
		});
	}

	eliminarProducto(IdProducto) {
		swal
			.fire({
				title: "Estas seguro(a)?",
				text: "El producto sera eliminado!",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Si, Eliminalo!",
				cancelButtonText: "Cancelar"
			})
			.then(result => {
				if (result.value) {
					this.productoService.deleteProducto(IdProducto).subscribe(response => {
						if (response.success) {
							swal.fire("Eliminado  !", "El producto ha sido eliminado exitosamente", "success").then(() => {
								this.getProductosRender();
							});
						} else {
							swal.fire("Error inesperado", "Ha ocurrido un error en la eliminación, intenta nuevamente!", "error");
						}
					});
				} else if (result.dismiss === swal.DismissReason.cancel) {
				}
			});
	}
}
