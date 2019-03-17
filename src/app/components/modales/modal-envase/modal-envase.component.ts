import {
	ChangeDetectorRef,
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output,
	ViewChild
} from "@angular/core";
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from "@angular/forms";
import { ISubscription } from "rxjs-compat/Subscription";

import { CustomValidators } from "@app/validadores/CustomValidators";
import { EnvaseService } from "@app/core/service.index";
import { Envase } from "@app/models/Envase";
import { ModalDirective } from "ng-uikit-pro-standard";
import swal from "sweetalert2";
import { Utils } from "../../Utils";

@Component({
	selector: "modal-envase",
	templateUrl: "./modal-envase.component.html"
})
export class ModalEnvaseComponent implements OnInit, EventoModal, OnDestroy {
	@ViewChild("modalAddEnvase") modalAddEnvase: ModalDirective;
	@Output() resultadoConsulta: EventEmitter<boolean> = new EventEmitter<
		boolean
	>();

	public envase: Envase;
	public tituloPantalla = "Envase";
	public formAddEnvase: FormGroup;
	peticionEnCurso = false;
	public subscription: ISubscription;

	constructor(
		private cdRef: ChangeDetectorRef,
		private envaseService: EnvaseService,
		private formBuilderEnvase: FormBuilder
	) {}

	ngOnInit() {
		this.initFormAddEnvase();
		this.subscribeEventoModal();
	}

	/*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
	initFormAddEnvase() {
		this.formAddEnvase = this.formBuilderEnvase.group({
			nombreEnvase: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			descripcionEnvase: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			])
		});
	}

	subscribeEventoModal() {
		this.subscription = this.envaseService.eventoModal.subscribe(
			mostrarModal => {
				if (mostrarModal) {
					this.envase = new Envase();
					this.formAddEnvase.reset();
					this.modalAddEnvase.show();
				} else {
					this.hideModalAndEmitResult();
				}
			}
		);
	}

	getValuesFormAddEnvase() {
		this.envase.NombEnvase = this.formAddEnvase.value.nombreEnvase;
		this.envase.DescEnvase = this.formAddEnvase.value.descripcionEnvase;
	}

	createEnvaseProducto() {
		this.getValuesFormAddEnvase();
		this.envaseService.createEnvase(this.envase).subscribe(
			response => {
				if (response.IdEnvase) {
					swal(
						"Envase",
						"El envase ha sido creado exitosamente!",
						"success"
					).then(() => {
						this.resetAndHideModal();
						this.resultadoConsulta.emit(true);
					});
				} else {
					Utils.showMsgInfo(
						"Ha ocurrido un error inesperado al crear el envase!"
					);
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

	hideModalAndEmitResult() {
		this.resetAndHideModal();
		this.resultadoConsulta.emit(false);
	}

	resetAndHideModal() {
		this.formAddEnvase.reset();
		this.modalAddEnvase.hide();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
