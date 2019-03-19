import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { ClasificacionProducto } from "@app/models/ClasificacionProducto";
import { ClasificacionProductoService, SubClasificacionProductoService } from "@app/core/service.index";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { ModalDirective } from "ng-uikit-pro-standard";
import { SubClasificacionProducto } from "@app/models/SubClasificacionProducto";
import { Utils } from "../../Utils";

import swal from "sweetalert2";
import { ISubscription } from "rxjs-compat/Subscription";

@Component({
	selector: "modal-subclasificacion",
	templateUrl: "./modal-subclasificacion.component.html"
})
export class ModalSubclasificacionComponent implements OnInit, EventoModal, OnDestroy {
	@ViewChild("modalAddSubclasificacion")
	modalAddSubclasificacion: ModalDirective;

	@Output() resultadoConsulta: EventEmitter<boolean> = new EventEmitter<boolean>();

	@Input() idClasificacion: number;

	public clasificaciones: ClasificacionProducto;
	public subclasificacion: SubClasificacionProducto;
	formAddSubClasificacion: FormGroup;
	peticionEnCurso = false;
	public tituloPantalla = "Subclasificación";
	public subscription: ISubscription;

	constructor(
		private cdRef: ChangeDetectorRef,
		private clasificacionService: ClasificacionProductoService,
		private formBuilderSubClasificacion: FormBuilder,
		private subclasificacionService: SubClasificacionProductoService
	) {}

	ngOnInit(): void {
		this.initFormAddSubclasificacion();
		this.subscribeEventoModal();
	}

	private initFormAddSubclasificacion() {
		this.formAddSubClasificacion = this.formBuilderSubClasificacion.group({
			nombreSubClasificacion: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			descripcionSubClasificacion: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(300),
				CustomValidators.nospaceValidator
			]),
			clasificacion: new FormControl(null, [Validators.required])
		});
	}

	subscribeEventoModal() {
		this.subscription = this.subclasificacionService.eventoModal.subscribe(mostrarModal => {
			if (mostrarModal) {
				this.getClasificaciones();
				this.subclasificacion = new SubClasificacionProducto();
				this.formAddSubClasificacion.reset();
				this.subclasificacion.IdClasificacion = this.idClasificacion;
				this.formAddSubClasificacion.controls["clasificacion"].setValue(this.idClasificacion);
				this.modalAddSubclasificacion.show();
			} else {
				this.hideModalAndEmitResult();
			}
		});
	}

	createSubCasificacion() {
		this.capturarDatosIngresados();

		this.subclasificacionService.createSubClasificacionProducto(this.subclasificacion).subscribe(
			response => {
				if (response.IdSubClasificacion) {
					swal.fire("Subclasificación", "la Subclasificación ha sido creado exitosamente!", "success").then(() => {
						this.resetAndHideModal();
						this.resultadoConsulta.emit(true);
					});
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

	capturarDatosIngresados() {
		this.subclasificacion.NombSubClasificacion = this.formAddSubClasificacion.value.nombreSubClasificacion;
		this.subclasificacion.DescSubClasificacion = this.formAddSubClasificacion.value.descripcionSubClasificacion;
	}

	getClasificaciones() {
		this.clasificacionService.getClasificaciones().subscribe(response => {
			if (response.clasificaciones) {
				this.clasificaciones = response.clasificaciones;
				this.cdRef.markForCheck();
			}
		});
	}

	onChangeClasificacion(event) {
		if (event === null) {
			this.subclasificacion.IdClasificacion = null;
		} else {
			this.subclasificacion.IdClasificacion = event.IdClasificacion;
		}
	}

	runChangeDetection() {
		this.peticionEnCurso = false;
		this.cdRef.markForCheck();
	}

	hideModalAndEmitResult() {
		this.resetAndHideModal();
		this.resultadoConsulta.emit(false);
	}

	resetAndHideModal() {
		this.formAddSubClasificacion.reset();
		this.modalAddSubclasificacion.hide();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
