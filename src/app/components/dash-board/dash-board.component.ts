import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { ProveedorService } from "@app/core/service.index";
import { TrabajadorService } from "@app/core/service.index";
import { Proveedor } from "@app/models/Proveedor";
import { Trabajador } from "@app/models/Trabajador";
import { Utils } from "../Utils";
import { Global } from "@app/core/services/shared/global";
import { GastoService } from "@app/core/service.index";
import { ProductosTop } from "@app/models/ProductosTop";

declare var $: any;

@Component({
	selector: "app-dash-board",
	templateUrl: "./dash-board.component.html",
	styleUrls: ["./dash-board.component.css"]
})
export class DashBoardComponent implements OnInit {
	public fechaActual: string;
	public proveedores: Proveedor[];
	public trabajadores: Trabajador[];
	public trabajador: Trabajador;
	public proveedor: Proveedor;
	public url: string;
	public buscando;
	public tabSeleccionado = "proveedor";
	public urlImagen: string;
	public nombreCard = "";
	public docTrabajadorONombreRepresentanteProveedor = "";
	public telefonoMostrado = "";
	public productosTop: ProductosTop[];

	public chartType: string = "line";

	public chartDatasets: Array<any> = [
		{ data: [32.08, 32.09, 32.1, 32.11, 32.12], label: "Compra" },
		{ data: [32.76, 32.8, 32.84, 32.88, 32.92], label: "Venta" }
	];

	public chartLabels: Array<any> = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

	public chartColors: Array<any> = [
		{
			backgroundColor: "rgba(230, 126, 34,0.2)",
			borderColor: "rgba(230, 126, 34,1)",
			borderWidth: 2,
			pointBackgroundColor: "rgba(230, 126, 34,1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(230, 126, 34,1)"
		},
		{
			backgroundColor: "rgba(192, 57, 43,0.2)",
			borderColor: "rgba(192, 57, 43,1)",
			borderWidth: 2,
			pointBackgroundColor: "rgba(192, 57, 43,1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(192, 57, 43,1)"
		}
	];

	public chartOptions: any = {
		responsive: true
	};
	public chartClicked(e: any): void {}
	public chartHovered(e: any): void {}

	// Pie chart
	public pieType: string = "pie";
	// public pieData:Array<any> = [300, 50];
	// public pieLabels:Array<any> = ['Gusano Entero', 'Coca-Cola'];
	public pieData: Array<any>;
	public pieLabels: Array<any>;
	public pieColors: Array<any> = [
		{
			hoverBorderColor: [
				"rgba(230, 126, 34, 0.1)",
				"rgba(192, 57, 43, 0.1)",
				"rgba(230, 126, 34, 0.1)",
				"rgba(192, 57, 43, 0.1)",
				"rgba(230, 126, 34, 0.1)"
			],
			hoverBorderWidth: 0,
			backgroundColor: ["#E67E22", "#C0392B", "#E67E22", "#C0392B", "#E67E22"],
			hoverBackgroundColor: [
				"rgba(230, 126, 34, 0.6)",
				"rgba(192, 57, 43, 0.6)",
				"rgba(192, 57, 43, 0.6)",
				"rgba(230, 126, 34, 0.6)",
				"rgba(192, 57, 43, 0.6)"
			]
		}
	];

	public pieOptions: any = {
		responsive: true
	};
	public pieClicked(e: any): void {}
	public pieHovered(e: any): void {}

	headElements = ["ID", "Productos", "Proveedor", "Cantidad"];

	constructor(
		private datePipe: DatePipe,
		private proveedorService: ProveedorService,
		private trabajadorService: TrabajadorService,
		private gastoService: GastoService,
		private cdr: ChangeDetectorRef
	) {
		this.url = Global.url;
		this.urlImagen = this.url + "getImagen/temp/" + "no-img.jpg";
		this.trabajador = new Trabajador();
		this.proveedor = new Proveedor();
		this.productosTop = [];
		this.pieData = [];
		this.pieLabels = [];
	}

	ngOnInit() {
		this.fechaActual = this.transformDate(new Date());
		this.getProveedores();
		this.getTrabajadores();
		this.getTopProductos();
	}

	getTopProductos() {
		this.gastoService.getTopProductos().subscribe(
			response => {
				if (response.productostop) {
					this.productosTop = response.productostop;
					this.llenarGraficoPastel();
					this.cdr.markForCheck();
				} else {
					Utils.showMsgInfo("Ha ocurrido un error al obtener los productos");
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), "Dashboard");
			}
		);
	}

	llenarGraficoPastel() {
		this.productosTop.forEach((value, index) => {
			this.pieLabels.push(value.NombreProducto);
			this.pieData.push(value.Cantidad);
		});
	}

	transformDate(date): string | null {
		return this.datePipe.transform(date, "yyyy-MM-dd");
	}

	getProveedores() {
		this.proveedorService.getProveedores().subscribe(
			response => {
				if (response.proveedores) {
					this.proveedores = response.proveedores;
				} else {
				}
			},
			error => {},
			() => {}
		);
	}

	getTrabajadores() {
		this.trabajadorService.getTrabajadores().subscribe(
			response => {
				if (response.trabajadores) {
					this.trabajadores = response.trabajadores;
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error));
			},
			() => {}
		);
	}

	visualizarTrabajador(trabajador: Trabajador) {
		this.trabajador = trabajador;
		this.tabSeleccionado = "trabajador";
		this.nombreCard = this.trabajador.Nombres;
		this.docTrabajadorONombreRepresentanteProveedor = this.trabajador.Documento;
		this.telefonoMostrado = this.trabajador.Telefono1;
	}

	visualizarProveedor(proveedor: Proveedor) {
		this.proveedor = proveedor;
		this.tabSeleccionado = "proveedor";
		this.nombreCard = this.proveedor.NombreProveedor;
		this.docTrabajadorONombreRepresentanteProveedor = this.proveedor.NombreRepresentante;
		this.telefonoMostrado = this.proveedor.Telefono1;
	}
}
