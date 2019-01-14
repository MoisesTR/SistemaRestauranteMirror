import { ActivatedRoute, Router } from "@angular/router";
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

import { ClasificacionProducto } from "@app/models/ClasificacionProducto";
import { CategoriaProducto } from "@app/models/CategoriaProducto";
import {
	CategoriaProductoService,
	ClasificacionProductoService
} from "@app/core/service.index";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { ModalDirective } from "ng-uikit-pro-standard";
import swal from "sweetalert2";
import { Utils } from "../../Utils";

@Component({
	selector: "modal-clasificacion",
	templateUrl: "./modal-clasificacion.component.html"
})
export class ModalClasificacionComponent
	implements OnInit, EventoModal, OnDestroy {
	@ViewChild("modalAddClasificacion")
	modalAddClasificacion: ModalDirective;

	@Output() resultadoConsulta: EventEmitter<boolean> = new EventEmitter<
		boolean
	>();

	public clasificacion: ClasificacionProducto;
	public formAddClasificacion: FormGroup;
	public categorias: CategoriaProducto[];
	public tituloPantalla = "Clasificación";
	peticionEnCurso = false;
	public subscription: ISubscription;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private clasificacionService: ClasificacionProductoService,
		private categoriaService: CategoriaProductoService,
		private cdRef: ChangeDetectorRef,
		private formBuilderClasificacion: FormBuilder
	) {}

	ngOnInit() {
		this.initFormAddClasificacion();
		this.subscribeEventoModal();
	}

	/*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
	initFormAddClasificacion() {
		this.formAddClasificacion = this.formBuilderClasificacion.group({
			nombreClasificacion: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
			descripcionClasificacion: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(300),
				CustomValidators.nospaceValidator
			]),
			categoria: new FormControl("", [Validators.required])
		});
	}

	subscribeEventoModal() {
		this.subscription = this.clasificacionService.eventoModal.subscribe(
			mostrarModal => {
				if (mostrarModal) {
					this.clasificacion = new ClasificacionProducto();
					this.getCategorias();
					this.formAddClasificacion.reset();
					this.modalAddClasificacion.show();
				} else {
					this.hideModalAndEmitResult();
				}
			}
		);
	}

	getCategorias() {
		this.categoriaService.getCategoriasProductos().subscribe(
			response => {
				if (response.categorias) {
					this.categorias = response.categorias;
				} else {
					Utils.showMsgInfo(
						"Ha ocurrido un error al cargar las categorias",
						this.tituloPantalla
					);
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	createClasificacion() {
		this.peticionEnCurso = true;
		this.getValuesFormClasificacion();

		this.clasificacionService
			.createClasificacionProducto(this.clasificacion)
			.subscribe(
				response => {
					if (response.IdClasificacion) {
						swal(
							"Clasificación",
							"La clasificación ha sido creada exitosamente!",
							"success"
						).then(() => {
							this.resetAndHideModal();
							this.resultadoConsulta.emit(true);
						});
					} else {
						Utils.showMsgInfo(
							"Ha ocurrido un error inesperado al crear la clasificación!",
							this.tituloPantalla
						);
					}
				},
				error => {
					this.runChangeDetection();
					Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
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

	getValuesFormClasificacion() {
		this.clasificacion.DescripcionClasificacion = this.formAddClasificacion.value.descripcionClasificacion;
		this.clasificacion.NombreClasificacion = this.formAddClasificacion.value.nombreClasificacion;
	}

	onChangeCategoria(event) {
		if (!Utils.notNullOrUndefined(event)) {
			this.clasificacion.IdCategoria = null;
		} else {
			this.clasificacion.IdCategoria = event.IdCategoria;
		}
	}

	hideModalAndEmitResult() {
		this.resetAndHideModal();
		this.resultadoConsulta.emit(false);
	}

	resetAndHideModal() {
		this.formAddClasificacion.reset();
		this.modalAddClasificacion.hide();
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
