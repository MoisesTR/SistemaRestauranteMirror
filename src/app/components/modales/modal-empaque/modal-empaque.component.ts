import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ISubscription } from "rxjs-compat/Subscription";

import { CustomValidators } from "@app/validadores/CustomValidators";
import { EmpaqueService } from "@app/core/service.index";
import { Empaque } from "@app/models/Empaque";
import { ModalDirective } from "ng-uikit-pro-standard";
import swal from "sweetalert2";
import { Utils } from "../../Utils";

@Component({
	selector: "modal-empaque",
	templateUrl: "./modal-empaque.component.html"
})
export class ModalEmpaqueComponent implements OnInit, EventoModal, OnDestroy {
	@ViewChild("modalAddEmpaque")
	modalAddEmpaque: ModalDirective;

	@Output() resultadoConsulta: EventEmitter<boolean> = new EventEmitter<boolean>();

	public empaque: Empaque;
	public formAddEmpaque: FormGroup;
	peticionEnCurso = false;
	public tituloPantalla = "Empaque";
	public subscription: ISubscription;

	constructor(
		private cdRef: ChangeDetectorRef,
		private empaqueService: EmpaqueService,
		private formBuilderEmpaque: FormBuilder
	) {}

	ngOnInit() {
		this.initFormAddEmpaque();
		this.subscribeEventoModal();
	}

	initFormAddEmpaque() {
		this.formAddEmpaque = this.formBuilderEmpaque.group({
			nombreEmpaque: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			descripcionEmpaque: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			])
		});
	}

	subscribeEventoModal() {
		this.subscription = this.empaqueService.eventoModal.subscribe(mostrarModal => {
			if (mostrarModal) {
				this.empaque = new Empaque();
				this.formAddEmpaque.reset();
				this.modalAddEmpaque.show();
			} else {
				this.hideModalAndEmitResult();
			}
		});
	}

	createEmpaque() {
		this.peticionEnCurso = true;
		this.getValuesFormAddEmpaque();

		this.empaqueService.createEmpaque(this.empaque).subscribe(
			response => {
				if (response.IdEmpaque) {
					swal.fire(this.tituloPantalla, "El Empaque ha sido creado exitosamente!", "success").then(() => {
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

	runChangeDetection() {
		this.peticionEnCurso = false;
		this.cdRef.markForCheck();
	}

	getValuesFormAddEmpaque() {
		this.empaque.NombEmpaque = this.formAddEmpaque.value.nombreEmpaque;
		this.empaque.DescEmpaque = this.formAddEmpaque.value.descripcionEmpaque;
	}

	hideModalAndEmitResult() {
		this.resetAndHideModal();
		this.resultadoConsulta.emit(false);
	}

	resetAndHideModal() {
		this.formAddEmpaque.reset();
		this.modalAddEmpaque.hide();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
