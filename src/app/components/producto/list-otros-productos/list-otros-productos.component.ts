import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { MdbTableDirective, MdbTablePaginationComponent } from "ng-uikit-pro-standard";
import { ProductoService, SpinnerService } from "@app/core/service.index";
import { Producto } from "@app/models/Producto";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	selector: "app-list-otros-productos",
	templateUrl: "./list-otros-productos.component.html",
	styleUrls: ["./list-otros-productos.component.scss"]
})
export class ListOtrosProductosComponent implements OnInit, AfterViewInit {
	@ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
	@ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;

	public productos: Producto[] = [];
	headElementos = ["#", "Nombre", "Descripcion", "Tipo Producto", "Categoria"];
	public maxVisibleItems = 10;
	buscarTexto: string = "";
	previo: string;

	@HostListener("input") oninput() {
		this.mdbTablePagination.searchText = this.buscarTexto;
		this.buscarItems();
	}

	constructor(
		private productoService: ProductoService,
		private spinner: SpinnerService,
		private cdRef: ChangeDetectorRef,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit() {
		this.spinner.display(true);
		this.getProductos();
	}

	ngAfterViewInit() {
		this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

		this.mdbTablePagination.calculateFirstItemIndex();
		this.mdbTablePagination.calculateLastItemIndex();
		this.cdRef.detectChanges();
	}

	getProductos() {
		this.productoService.getProductos(1).subscribe(response => {
			if (response.productos) {
				this.productos = this.productoService.filtrarProdutosNoAlimenticios(response.productos);
			}

			this.mdbTable.setDataSource(this.productos);
			this.productos = this.mdbTable.getDataSource();
			this.previo = this.mdbTable.getDataSource();
		});
	}

	buscarItems() {
		const prev = this.mdbTable.getDataSource();

		if (!this.buscarTexto) {
			this.mdbTable.setDataSource(this.previo);
			this.productos = this.mdbTable.getDataSource();
		}

		if (this.buscarTexto) {
			this.productos = this.mdbTable.searchLocalDataBy(this.buscarTexto);
			this.mdbTable.setDataSource(prev);
		}
	}

	agregarOtroProducto() {
		this.router.navigate(["/producto/addProductoVarios"])
	}
}
