import { Component, ElementRef, OnInit, QueryList, ViewChildren, ViewChild, HostListener } from "@angular/core";

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ClasificacionGasto } from "@app/models/ClasificacionGasto";
import { SubclasificacionGasto } from "@app/models/SubclasificacionGasto";
import { Sucursal } from "@app/models/Sucursal";
import { Gasto } from "@app/models/Gasto";
import { Router } from "@angular/router";
import { FacturaService, GastoService, SpinnerService, SucursalService } from "@app/core/service.index";
import { Utils } from "../../Utils";
import { MdbTablePaginationComponent, MdbTableService } from "ng-uikit-pro-standard";

@Component({
	selector: "app-summary-gastos",
	templateUrl: "./summary-gastos.component.html",
	styleUrls: ["./summary-gastos.component.scss"]
})
export class SummaryGastosComponent implements OnInit {
	@ViewChild(MdbTablePaginationComponent)
	mdbPagination: MdbTablePaginationComponent;

	public gastos: Gasto[];
	public clasificaciones: ClasificacionGasto[];
	public subclasificaciones: SubclasificacionGasto[];
	public formBusquedaGasto: FormGroup;
	public fechaInicio: string = null;
	public fechaFin: string = null;
	public buscando: string;
	public idClasificacionSeleccionado: number;
	public idSubClasificacionSeleccionado: number;
	public sumaTotalGastos = 0;
	public sucursales: Sucursal[];
	@ViewChild("scrollgasto") scrollGasto: ElementRef;
	public scrollStart: number = 0;

	@ViewChildren("pages") pages: QueryList<any>;
	itemsPerPage = 6;
	numberOfVisiblePaginators = 10;
	numberOfPaginators: number;
	paginators: Array<any> = [];
	activePage = 1;
	firstVisibleIndex = 1;
	lastVisibleIndex: number = this.itemsPerPage;
	firstVisiblePaginator = 0;
	lastVisiblePaginator = this.numberOfVisiblePaginators;

	searchText: string = "";
	previous: string;

	constructor(
		private router: Router,
		private el: ElementRef,
		private formBuilderBusquedaFactura: FormBuilder,
		private facturaService: FacturaService,
		private gastoService: GastoService,
		private formBuilder: FormBuilder,
		private tableService: MdbTableService,
		private sucursalService: SucursalService,
		private spinner: SpinnerService
	) {}

	ngOnInit() {
		this.initFormBusquedaGasto();
		this.getClasificacionGasto();
		this.getSucursales();
	}

	initFormBusquedaGasto() {
		this.formBusquedaGasto = this.formBuilder.group({
			clasificacion: new FormControl("", [Validators.required]),
			subclasificacion: new FormControl("", []),
			fechaInicio: new FormControl("", Validators.required),
			fechaFin: new FormControl("", [Validators.required]),
			sucursal: new FormControl("", [Validators.required])
		});
	}

	getClasificacionGasto() {
		this.gastoService.getClasificacionesGasto(1).subscribe(response => {
			if (response.clasificaciones) {
				this.clasificaciones = response.clasificaciones;
			}
		});
	}

	getSucursales() {
		this.sucursalService.getSucursales().subscribe(response => {
			if (response.sucursales) {
				this.sucursales = response.sucursales;
			}
		});
	}

	changePage(event: any) {
		if (event.target.text >= 1 && event.target.text <= this.numberOfPaginators) {
			this.activePage = +event.target.text;
			this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
			this.lastVisibleIndex = this.activePage * this.itemsPerPage;
		}
	}

	@HostListener("input") oninput() {
		this.searchItems();
	}

	@HostListener("window:scroll", [])
	scrollerDateGasto() {
		this.scrollStart = this.scrollGasto.nativeElement.offsetTop;
	}

	searchItems() {
		const prev = this.tableService.getDataSource();

		if (!this.searchText) {
			this.tableService.setDataSource(this.previous);
			this.gastos = this.tableService.getDataSource();
			return;
		}

		if (this.searchText) {
			this.gastos = this.searchLocalDataBy(this.searchText);
			this.tableService.setDataSource(prev);
		}
	}

	/**
	 * Metodo sobreescrito de mdb angular, mdbtableservice
	 * @param searchKey
	 * @returns {any}
	 */
	searchLocalDataBy(searchKey: any): any {
		const lowerSearchKey = searchKey.toString().toLowerCase();

		return this.tableService.getDataSource().filter(obj => {
			return Object.keys(obj).some(key => {
				if (obj[key] === null) return false;
				return obj[key]
					.toString()
					.toLowerCase()
					.includes(lowerSearchKey);
			});
		});
	}

	nextPage(event: any) {
		if (this.pages.last.nativeElement.classList.contains("active")) {
			if (this.numberOfPaginators - this.numberOfVisiblePaginators >= this.lastVisiblePaginator) {
				this.firstVisiblePaginator += this.numberOfVisiblePaginators;
				this.lastVisiblePaginator += this.numberOfVisiblePaginators;
			} else {
				this.firstVisiblePaginator += this.numberOfVisiblePaginators;
				this.lastVisiblePaginator = this.numberOfPaginators;
			}
		}

		this.activePage += 1;
		this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
		this.lastVisibleIndex = this.activePage * this.itemsPerPage;
	}

	previousPage(event: any) {
		if (this.pages.first.nativeElement.classList.contains("active")) {
			if (this.lastVisiblePaginator - this.firstVisiblePaginator === this.numberOfVisiblePaginators) {
				this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
				this.lastVisiblePaginator -= this.numberOfVisiblePaginators;
			} else {
				this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
				this.lastVisiblePaginator -= this.numberOfPaginators % this.numberOfVisiblePaginators;
			}
		}

		this.activePage -= 1;
		this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
		this.lastVisibleIndex = this.activePage * this.itemsPerPage;
	}

	firstPage() {
		this.activePage = 1;
		this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
		this.lastVisibleIndex = this.activePage * this.itemsPerPage;
		this.firstVisiblePaginator = 0;
		this.lastVisiblePaginator = this.numberOfVisiblePaginators;
	}

	lastPage() {
		this.activePage = this.numberOfPaginators;
		this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
		this.lastVisibleIndex = this.activePage * this.itemsPerPage;

		if (this.numberOfPaginators % this.numberOfVisiblePaginators === 0) {
			this.firstVisiblePaginator = this.numberOfPaginators - this.numberOfVisiblePaginators;
			this.lastVisiblePaginator = this.numberOfPaginators;
		} else {
			this.lastVisiblePaginator = this.numberOfPaginators;
			this.firstVisiblePaginator =
				this.lastVisiblePaginator - (this.numberOfPaginators % this.numberOfVisiblePaginators);
		}
	}

	addPaginators() {
		if (this.gastos.length % this.itemsPerPage === 0) {
			this.numberOfPaginators = Math.floor(this.gastos.length / this.itemsPerPage);
		} else {
			this.numberOfPaginators = Math.floor(this.gastos.length / this.itemsPerPage + 1);
		}

		for (let i = 1; i <= this.numberOfPaginators; i++) {
			this.paginators.push(i);
		}
	}

	changeClasificacion(event) {
		if (Utils.notNullOrUndefined(event)) {
			this.idClasificacionSeleccionado = event.IdClasificacion;
			this.idSubClasificacionSeleccionado = null;
			this.subclasificaciones = [];
			this.formBusquedaGasto.controls["subclasificacion"].setValue("");
			this.getSubclasificacionByIdClasificacion();
		} else {
			this.idClasificacionSeleccionado = null;
			this.idSubClasificacionSeleccionado = null;
			this.subclasificaciones = [];
			this.formBusquedaGasto.controls["subclasificacion"].setValue("");
		}
	}

	getSubclasificacionByIdClasificacion() {
		this.gastoService.getSubclasificacionesByIdClasificacion(this.idClasificacionSeleccionado).subscribe(response => {
			if (response.subclasificaciones) {
				this.subclasificaciones = response.subclasificaciones;
			}
		});
	}

	findGastos() {
		this.spinner.display(true);
		this.getDataGastoBusqueda();

		if (this.validarBusqueda()) {
			this.gastoService
				.getGastosPorFiltro(
					this.idClasificacionSeleccionado,
					this.idSubClasificacionSeleccionado,
					this.fechaInicio,
					this.fechaFin
				)
				.subscribe(response => {
					if (response.gastos) {
						this.gastos = response.gastos;
						this.tableService.setDataSource(this.gastos);
						this.gastos = this.tableService.getDataSource();
						this.previous = this.tableService.getDataSource();
						this.searchText = "";
						this.iniciarPropiedadesPaginacion();
						this.sumarGastos();
						this.scrollerDateGasto();
						window.scroll(0, this.scrollStart);
						if (this.gastos.length === 0) {
							Utils.showMsgInfo("No se encontraron gastos con los parametros digitados", "Busqueda Gastos");
						}
					} else {
						Utils.showMsgInfo("Ha ocurrido un error al obtener los gastos", "Busqueda Gastos");
					}
				});
		} else {
			this.spinner.display(false);
		}
	}

	iniciarPropiedadesPaginacion() {
		this.paginators = [];
		this.activePage = 1;
		this.firstVisibleIndex = 1;
		this.firstVisiblePaginator = 0;
		this.addPaginators();
	}

	validarBusqueda() {
		if (this.fechaInicio > this.fechaFin) {
			Utils.showMsgInfo("La fecha de inicio no puede ser mayor a la fecha fin!", "Busqueda Gastos");
			return false;
		}

		return true;
	}

	sumarGastos() {
		this.sumaTotalGastos = 0;
		this.gastos.forEach((value, index) => {
			this.sumaTotalGastos += value.MontoTotal;
		});
	}

	getDataGastoBusqueda() {
		this.fechaInicio =
			this.formBusquedaGasto.value.fechaInicio === ""
				? null
				: Utils.formatDateYYYYMMDD(this.formBusquedaGasto.value.fechaInicio);
		this.fechaFin =
			this.formBusquedaGasto.value.fechaFin === ""
				? null
				: Utils.formatDateYYYYMMDD(this.formBusquedaGasto.value.fechaFin);
	}

	changeSubclasificacion(event) {
		if (Utils.notNullOrUndefined(event)) {
			this.idSubClasificacionSeleccionado = event.IdSubClasificacion;
		} else {
			this.idSubClasificacionSeleccionado = null;
		}
	}
}
