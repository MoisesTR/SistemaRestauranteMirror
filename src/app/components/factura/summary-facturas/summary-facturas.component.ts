import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { FacturaService, ProveedorService, SpinnerService, PersistenciaDatoService } from "@app/core/service.index";
import { ActivatedRoute, Router } from "@angular/router";
import { Proveedor } from "@app/models/Proveedor";
import { Factura } from "@app/models/Factura";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Utils } from "../../Utils";

@Component({
	selector: "app-summary-facturas",
	templateUrl: "./summary-facturas.component.html",
	styleUrls: ["./summary-facturas.component.scss"]
})
export class SummaryFacturasComponent implements OnInit {
	public facturas: Factura[];
	public proveedores: Proveedor[];
	public formBusquedaFactura: FormGroup;
	public idProveedor: number = null;
	public fechaInicio: string = null;
	public fechaFin: string = null;
	public totalCordobasFacturas = 0;
	public totalOrigenFactura = 0;
	public buscando: string;
	public idFechaBusqueda = 1;
	public codFactura: string = null;
	@ViewChild("pointscroll") pointScroll: ElementRef;
	public scrollStart: number = 0;
	public peticionEnCurso = false;
	public fechaActual = new Date();
	public seleccionFechaBusqueda = new Date();

	// Paginacion
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

	filtroFechas = [{ Id: 1, Fecha: "Fecha recepción" }, { Id: 2, Fecha: "Fecha ingreso" }];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private el: ElementRef,
		private formBuilderFactura: FormBuilder,
		private facturaService: FacturaService,
		private proveedorService: ProveedorService,
		private cdr: ChangeDetectorRef,
		private spinner: SpinnerService,
		private persistencia: PersistenciaDatoService
	) {}

	ngOnInit() {
		this.setPersistencia();
		this.initFormBusquedaFactura();
		this.getProveedores();

		this.formBusquedaFactura.controls["codFactura"].valueChanges.subscribe(value => {
			if (value === "") {
				this.formBusquedaFactura.controls["fechaBusqueda"].enable();
				this.formBusquedaFactura.controls["fechaInicio"].enable();
				this.formBusquedaFactura.controls["fechaFin"].enable();
			} else {
				if (!this.formBusquedaFactura.controls["fechaBusqueda"].disabled) {
					this.formBusquedaFactura.controls["fechaBusqueda"].disable();
					this.formBusquedaFactura.controls["fechaInicio"].disable();
					this.formBusquedaFactura.controls["fechaFin"].disable();

					this.formBusquedaFactura.controls["fechaBusqueda"].reset();
					this.formBusquedaFactura.controls["fechaInicio"].reset();
					this.formBusquedaFactura.controls["fechaFin"].reset();

					this.idFechaBusqueda = null;
					this.fechaInicio = null;
					this.fechaFin = null;
				}
			}
		});
	}

	@HostListener("window:scroll", [])
	pointScroller() {
		this.scrollStart = this.pointScroll.nativeElement.offsetTop;
		this.scrollStart -= 30;
	}

	changePage(event: any) {
		if (event.target.text >= 1 && event.target.text <= this.numberOfPaginators) {
			this.activePage = +event.target.text;
			this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
			this.lastVisibleIndex = this.activePage * this.itemsPerPage;
		}
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
			this.firstVisiblePaginator = this.lastVisiblePaginator - (this.numberOfPaginators % this.numberOfVisiblePaginators);
		}
	}

	addPaginators() {
		if (this.facturas.length % this.itemsPerPage === 0) {
			this.numberOfPaginators = Math.floor(this.facturas.length / this.itemsPerPage);
		} else {
			this.numberOfPaginators = Math.floor(this.facturas.length / this.itemsPerPage + 1);
		}

		for (let i = 1; i <= this.numberOfPaginators; i++) {
			this.paginators.push(i);
		}
	}

	initFormBusquedaFactura() {
		this.formBusquedaFactura = this.formBuilderFactura.group({
			proveedor: new FormControl("", Validators.required),
			fechaBusqueda: new FormControl([]),
			fechaInicio: new FormControl(""),
			fechaFin: new FormControl(""),
			codFactura: new FormControl("")
		});
	}

	getProveedores() {
		this.proveedorService.getProveedores(1).subscribe(response => {
			if (response.proveedores) {
				this.proveedores = response.proveedores;
				this.cdr.markForCheck();
			}
		});
	}

	getDataFactura() {
		this.fechaInicio =
			this.formBusquedaFactura.value.fechaInicio === "" ? null : Utils.formatDateYYYYMMDD(this.formBusquedaFactura.value.fechaInicio);
		this.fechaFin =
			this.formBusquedaFactura.value.fechaFin === "" ? null : Utils.formatDateYYYYMMDD(this.formBusquedaFactura.value.fechaFin);
		this.codFactura = this.formBusquedaFactura.value.codFactura === "" ? null : this.formBusquedaFactura.value.codFactura;
	}

	onChangeProveedor(event) {
		if (event) {
			this.idProveedor = event.IdProveedor;
		} else {
			this.idProveedor = event.IdProveedor;
		}
	}

	findFacturas() {
		this.peticionEnCurso = true;
		this.spinner.display(true);
		this.getDataFactura();

		if (this.validarParametrosBusquedaFactura()) {
			this.facturaService
				.getFacturas(this.idFechaBusqueda, true, this.fechaInicio, this.fechaFin, this.idProveedor, 2, this.codFactura)
				.subscribe(
					response => {
						this.facturas = response.facturas;
						this.resetPages();
						this.addPaginators();
						this.sumarFacturas();
						this.pointScroller();
						if (this.facturas.length === 0) {
							Utils.showMsgInfo("No se encontraron facturas con los parametros digitados", "Busqueda Facturas");
						} else {
							window.scroll(0, this.scrollStart);
						}
					},
					error => {
						this.peticionEnCurso = false;
					},
					() => {
						this.peticionEnCurso = false;
					}
				);
		} else {
			this.peticionEnCurso = false;
			this.spinner.display(false);
		}
	}

	validarParametrosBusquedaFactura() {
		if (this.idProveedor === null && this.fechaInicio === null && this.fechaFin === null && this.idFechaBusqueda === null) {
			Utils.showMsgInfo("Debes digitar al menos uno de los parametros de busqueda", "Busqueda Facturas");
			return false;
		} else if (this.idProveedor === null) {
			Utils.showMsgInfo("El proveedor es requerido para la busqueda", "Busqueda Facturas");
			return false;
		} else if (
			this.idProveedor !== null &&
			this.codFactura === null &&
			(this.idFechaBusqueda !== null && this.idFechaBusqueda !== undefined) &&
			(this.fechaInicio === null || this.fechaFin === null)
		) {
			Utils.showMsgInfo("Debes digitar el rango de fechas!", "Busqueda Facturas");
			return false;
		} else if (this.fechaInicio !== null && this.fechaFin === null) {
			Utils.showMsgInfo("Debes digitar la fecha fin", "Busqueda Facturas");
			return false;
		} else if (this.fechaInicio === null && this.fechaFin !== null) {
			Utils.showMsgInfo("Debes digitar la fecha inicio", "Busqueda Facturas");
			return false;
		} else if (this.fechaInicio > this.fechaFin) {
			Utils.showMsgInfo("La fecha de inicio no puede ser mayor a la fecha fin!", "Busqueda Facturas");
			return false;
		}
		return true;
	}

	resetPages() {
		this.paginators = [];
		this.activePage = 1;
		this.firstVisibleIndex = 1;
		this.firstVisiblePaginator = 0;
	}

	sumarFacturas() {
		this.totalCordobasFacturas = 0;
		this.totalOrigenFactura = 0;
		this.facturas.forEach((value, index) => {
			this.totalCordobasFacturas += value.TotalCordobas;
			this.totalOrigenFactura += value.TotalOrigenFactura;
		});
	}

	mostrarFactura(idFactura: number) {
		this.router.navigate(["factura/showFactura/" + idFactura]);
		this.getPersistencia();
	}

	changeFechaBusqueda(event) {
		if (event) {
			this.idFechaBusqueda = event.Id;
		} else {
			this.idFechaBusqueda = null;
		}
	}

	getPersistencia() {
		const ObjetoSummaryFactura = {
			facturas: this.facturas,
			totalFactura: this.totalOrigenFactura,
			totalCalculado: this.totalCordobasFacturas,
			proveedor: this.formBusquedaFactura.value.proveedor,
			fechaBusqueda: this.formBusquedaFactura.value.fechaBusqueda,
			fechaInicio: this.formBusquedaFactura.value.fechaInicio,
			fechaFin: this.formBusquedaFactura.value.fechaFin,
			codFactura: this.formBusquedaFactura.value.codFactura
		};

		this.persistencia.getPersistencia(ObjetoSummaryFactura, "SummaryFactura");
	}

	setPersistencia() {
		this.persistencia.setPersistencia("SummaryFactura").subscribe(res => {
			if (res) {
				this.facturas = res.facturas;
				this.totalOrigenFactura = res.totalFactura;
				this.totalCordobasFacturas = res.totalCalculado;
				this.idProveedor = res.proveedor;
				this.formBusquedaFactura.controls["fechaInicio"].setValue(res.fechaInicio);
				this.formBusquedaFactura.controls["fechaFin"].setValue(res.fechaFin);
				this.formBusquedaFactura.controls["fechaBusqueda"].setValue(res.fechaBusqueda);
				this.formBusquedaFactura.controls["proveedor"].setValue(res.proveedor);
				this.formBusquedaFactura.controls["codFactura"].setValue(res.codFactura);
			}
		});

		this.persistencia.deletePersistencia("SummaryFactura");
	}

	busquedaFactura(evento) {
		this.seleccionFechaBusqueda = evento;
	}
}
