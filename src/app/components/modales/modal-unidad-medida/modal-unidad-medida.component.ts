import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import {
	ClasificacionProductoService,
	ClasificacionUnidadMedidaService,
	UnidadMedidaService
} from "@app/core/service.index";
import { ClasificacionUnidadDeMedida } from "@app/models/ClasificacionUnidadDeMedida";
import { ClasificacionProducto } from "@app/models/ClasificacionProducto";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { ModalDirective } from "ng-uikit-pro-standard";
import { UnidadMedida } from "@app/models/UnidadMedida";
import { Utils } from "../../Utils";
import swal from "sweetalert2";
import { ISubscription } from "rxjs-compat/Subscription";

@Component({
	selector: "modal-unidad-medida",
	templateUrl: "./modal-unidad-medida.component.html"
})
export class ModalUnidadMedidaComponent implements OnInit, EventoModal, OnDestroy {
	@ViewChild("modalAddUnidadMedida")
	modalAddUnidadMedida: ModalDirective;

	@Output() resultadoConsulta: EventEmitter<boolean> = new EventEmitter<boolean>();

	public unidadMedida: UnidadMedida;
	public clasificaciones: ClasificacionProducto[];
	public tituloPantalla = "Unidad de Medida";
	public clasificacionesUnidad: ClasificacionUnidadDeMedida[];
	public subscription: ISubscription;
	formAddUnidadMedida: FormGroup;
	peticionEnCurso = false;

	constructor(
		private clasificacionService: ClasificacionProductoService,
		private clasificacionUnidadService: ClasificacionUnidadMedidaService,
		private cdRef: ChangeDetectorRef,
		private formBuilder: FormBuilder,
		private unidadMedidaService: UnidadMedidaService
	) {}

	ngOnInit() {
		this.initFormAdd();
		this.subscribeEventoModal();
	}

	initFormAdd() {
		this.formAddUnidadMedida = this.formBuilder.group({
			nombreUnidadMedida: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			simboloUnidadMedida: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(3),
				CustomValidators.nospaceValidator
			]),
			clasificacionesUnidad: new FormControl("", [Validators.required])
		});
	}

	subscribeEventoModal() {
		this.subscription = this.unidadMedidaService.eventoModal.subscribe(mostrarModal => {
			if (mostrarModal) {
				this.getClasificacionUnidades();
				this.unidadMedida = new UnidadMedida();
				this.formAddUnidadMedida.reset();
				this.modalAddUnidadMedida.show();
			} else {
				this.hideModalAndEmitResult();
			}
		});
	}

	createUnidadMedida() {
		this.peticionEnCurso = true;
		this.getValuesForm();

		this.unidadMedidaService.createUnidadMedida(this.unidadMedida).subscribe(
			response => {
				if (response.IdUnidadMedida) {
					swal(this.tituloPantalla, "La unidad ha sido creada exitosamente!", "success").then(() => {
						this.resetAndHideModal();
						this.resultadoConsulta.emit(true);
					});
				} else {
					Utils.showMsgInfo("Ha ocurrido un error inesperado al crear la unidad de medida!", this.tituloPantalla);
				}
			},
			error => {
				this.runChangeDetection();
			},
			() => {
				this.runChangeDetection();
			}
		);
	}

	runChangeDetection() {
		this.peticionEnCurso = false;
		this.cdRef.markForCheck();
	}

	getValuesForm() {
		this.unidadMedida.NombUnidad = this.formAddUnidadMedida.value.nombreUnidadMedida;
		this.unidadMedida.Simbolo = this.formAddUnidadMedida.value.simboloUnidadMedida;
		this.unidadMedida.NImportancia = 1;
	}

	getClasificacionUnidades() {
		this.clasificacionUnidadService.getClasificacionUnidadesMedida().subscribe(
			response => {
				if (response.clasificaciones) {
					this.clasificacionesUnidad = response.clasificaciones;
				}
			}
		);
	}

	changeClasificacionUnidad(event) {
		if (event) {
			this.unidadMedida.IdClasifUDM = event.IdClasifUDM;
		} else {
			this.unidadMedida.IdClasifUDM = null;
		}
	}

	hideModalAndEmitResult() {
		this.resetAndHideModal();
		this.resultadoConsulta.emit(false);
	}

	resetAndHideModal() {
		this.formAddUnidadMedida.reset();
		this.modalAddUnidadMedida.hide();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
