import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { FacturaService, ProveedorService, SpinnerService, PersistenciaDatoService } from "@app/core/service.index";
import { ActivatedRoute, Router } from "@angular/router";
import { Proveedor } from "@app/models/Proveedor";
import { Factura } from "@app/models/Factura";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Utils } from "../../Utils";
import {MdbTableDirective, MdbTablePaginationComponent} from 'ng-uikit-pro-standard';

@Component({
	selector: "app-summary-facturas",
	templateUrl: "./summary-facturas.component.html",
	styleUrls: ["./summary-facturas.component.scss"]
})
export class SummaryFacturasComponent implements OnInit, AfterViewInit {

    @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
    @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;

    public maxVisibleItems = 10;
    buscarTexto: string = "";
    previo: string;

	public facturas: Factura[] = [];
	public proveedores: Proveedor[];
	public formBusquedaFactura: FormGroup;
	public idProveedor: number = null;
	public fechaInicio: string | Date = null;
	public fechaFin: string | Date = null;
	public totalCordobasFacturas = 0;
	public totalOrigenFactura = 0;
	public buscando: string;
	public idFechaBusqueda = null;
	public codFactura: string = null;
	@ViewChild("pointscroll") pointScroll: ElementRef;
	public scrollStart: number = 0;
	public peticionEnCurso = false;
	public fechaActual = new Date();
	public seleccionFechaBusqueda = new Date();

	filtroFechas = [{ Id: 1, Fecha: "Fecha recepción" }, { Id: 2, Fecha: "Fecha ingreso" }];

    @HostListener("input") oninput() {
        this.mdbTablePagination.searchText = this.buscarTexto;
        this.buscarItems();
    }

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
			if (!value) {
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

        this.mdbTable.setDataSource(this.facturas);
        this.facturas = this.mdbTable.getDataSource();
        this.previo = this.mdbTable.getDataSource();
	}

    ngAfterViewInit() {
        this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.maxVisibleItems);

        this.mdbTablePagination.calculateFirstItemIndex();
        this.mdbTablePagination.calculateLastItemIndex();
        this.cdr.detectChanges();
    }

	@HostListener("window:scroll", [])
	pointScroller() {
		this.scrollStart = this.pointScroll.nativeElement.offsetTop;
		this.scrollStart -= 30;
	}

	initFormBusquedaFactura() {
		this.formBusquedaFactura = this.formBuilderFactura.group({
			proveedor: new FormControl(null, Validators.required),
			fechaBusqueda: new FormControl([]),
			fechaInicio: new FormControl([]),
			fechaFin: new FormControl([]),
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
		this.fechaInicio = Utils.formatDateYYYYMMDD(this.formBusquedaFactura.value.fechaInicio);
		this.fechaFin = Utils.formatDateYYYYMMDD(this.formBusquedaFactura.value.fechaFin);
		this.codFactura = this.formBusquedaFactura.value.codFactura || null;
	}

	onChangeProveedor(event) {
		if (event) {
			this.idProveedor = event.IdProveedor;
		} else {
			this.idProveedor = null;
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
                        this.mdbTable.setDataSource(this.facturas);
                        this.facturas = this.mdbTable.getDataSource();
                        this.previo = this.mdbTable.getDataSource();
						this.sumarFacturas();
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
		if (!this.idFechaBusqueda && !this.codFactura) {
			Utils.showMsgInfo("Debes seleccionar un rango de fecha de busqueda o un codigo factura a filtrar!", "Busqueda Facturas");
			return false;
		} else if (!this.codFactura && this.idFechaBusqueda) {
			if (!this.fechaInicio && !this.fechaFin) {
				Utils.showMsgInfo("La fecha inicio y fecha fin son requeridas para la busqueda por rango de fecha!", "Busqueda Facturas");
				return false;
			}

			if (this.fechaInicio > this.fechaFin) {
				Utils.showMsgInfo("La fecha de inicio no puede ser mayor a la fecha fin!", "Busqueda Facturas");
				return false;
			}
		}
		return true;
	}

	deshabilitarFechasBusqueda() {
		return this.idFechaBusqueda ? null : true;
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
			this.formBusquedaFactura.controls["fechaInicio"].enable();
			this.formBusquedaFactura.controls["fechaFin"].enable();
		} else {
			this.idFechaBusqueda = null;
			this.formBusquedaFactura.controls["fechaInicio"].reset();
			this.formBusquedaFactura.controls["fechaFin"].reset();
			this.formBusquedaFactura.controls["fechaInicio"].disable();
			this.formBusquedaFactura.controls["fechaFin"].disable();
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
        this.mdbTable.setDataSource(this.facturas);
        this.facturas = this.mdbTable.getDataSource();
        this.previo = this.mdbTable.getDataSource();
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

	limpiar() {
		this.formBusquedaFactura.reset();
		this.idFechaBusqueda = null;
		this.codFactura = null;
		this.totalCordobasFacturas = 0;
		this.totalOrigenFactura = 0;
		this.idProveedor = null;
	}

    buscarItems() {
        const prev = this.mdbTable.getDataSource();

        if (!this.buscarTexto) {
            this.mdbTable.setDataSource(this.previo);
            this.facturas = this.mdbTable.getDataSource();
        }

        if (this.buscarTexto) {
            this.facturas = this.mdbTable.searchLocalDataBy(this.buscarTexto);
            this.mdbTable.setDataSource(prev);
        }
    }
}
