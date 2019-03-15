import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ISubscription } from "rxjs-compat/Subscription";

import {CategoriaProductoService, TipoInsumoService} from '@app/core/service.index';
import { CategoriaProducto } from "@app/models/CategoriaProducto";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { ModalDirective } from "ng-uikit-pro-standard";
import swal from "sweetalert2";
import { Utils } from "../../Utils";
import {TipoInsumo} from '@app/models/interface/TipoInsumo';

@Component({
	selector: "modal-categoria",
	templateUrl: "./modal-categoria.component.html"
})
export class ModalCategoriaComponent implements OnInit, EventoModal, OnDestroy {
	@ViewChild("modalAddCategoria")
	modalAddCategoria: ModalDirective;

	@Input() idTipoInsumo: number;

	@Output() resultadoConsulta: EventEmitter<boolean> = new EventEmitter<boolean>();

	public formAddCategoria: FormGroup;
	public categoriaProducto: CategoriaProducto;
	private subscription: ISubscription;
	peticionEnCurso = false;
	public tiposInsumos: TipoInsumo;
	public tituloPantalla = "Categoria";

	constructor(
		public categoriaService: CategoriaProductoService,
		public tipoInsumoService: TipoInsumoService,
		private cdRef: ChangeDetectorRef,
		private formBuilderCategoria: FormBuilder
	) {}

	ngOnInit() {
		this.initFormAddCategoria();
		this.subscribeEventoModal();
		this.getTiposInsumos();
	}

	/*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
	initFormAddCategoria() {
		this.formAddCategoria = this.formBuilderCategoria.group({
			nombreCategoria: new FormControl("", [
				Validators.required,
				Validators.minLength(2),
				Validators.maxLength(100),
				CustomValidators.nospaceValidator
			]),
            tipoInsumo: new FormControl( null,[
                Validators.required
            ]),
			descripcionCategoria: new FormControl("", [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(300),
				CustomValidators.nospaceValidator
			])
		});
	}

	subscribeEventoModal() {
		this.subscription = this.categoriaService.eventoModal.subscribe(mostrarModal => {
			if (mostrarModal) {
				this.categoriaProducto = new CategoriaProducto();
				this.formAddCategoria.reset();
				this.modalAddCategoria.show();
			} else {
				this.hideModalAndEmitResult();
			}
		});
	}

	createCategoriaProducto() {
		this.peticionEnCurso = true;
		this.getValuesFormAddCategoria();

		this.categoriaService.createCategoriaProducto(this.categoriaProducto).subscribe(
			response => {
				if (response.IdCategoria) {
					swal(this.tituloPantalla, "La categoría ha sido creada exitosamente!", "success").then(() => {
						this.resetAndHideModal();
						this.resultadoConsulta.emit(true);
					});
				} else {
					Utils.showMsgInfo("Ha ocurrido un error inesperado al crear la categoria", this.tituloPantalla);
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

	getValuesFormAddCategoria() {
		this.categoriaProducto.NombCategoria = this.formAddCategoria.value.nombreCategoria;
		this.categoriaProducto.DescCategoria = this.formAddCategoria.value.descripcionCategoria;
		this.categoriaProducto.IdTipInsumo = !this.idTipoInsumo ? 1 : this.idTipoInsumo;
	}

	hideModalAndEmitResult() {
		this.resetAndHideModal();
		this.resultadoConsulta.emit(false);
	}

	resetAndHideModal() {
		this.formAddCategoria.reset();
		this.modalAddCategoria.hide();
	}

	getTiposInsumos() {
	    this.tipoInsumoService.getTiposInsumos().subscribe(
	        tiposinsumos => {
	            this.tiposInsumos = tiposinsumos;
            }
        )
    }

    changeTipoInsumo(event) {
	    if (event) {
	        this.categoriaProducto.IdTipInsumo = event.IdTipInsumo;
        } else {
            this.categoriaProducto.IdTipInsumo = null;
        }
    }

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
