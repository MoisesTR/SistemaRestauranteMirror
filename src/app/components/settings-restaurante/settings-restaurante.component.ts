import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { FacturacionMonedaService, PaisService, SettingRestauranteService } from "@app/core/service.index";
import { Restaurante } from "@app/models/Restaurante";
import { ActivatedRoute, Router } from "@angular/router";
import swal from "sweetalert2";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { Pais } from "@app/models/Pais";
import { FacturacionMoneda } from "@app/models/FacturacionMoneda";

declare var $: any;

@Component({
	selector: "app-settings-restaurante",
	templateUrl: "./settings-restaurante.component.html",
	styleUrls: ["./settings-restaurante.component.scss"]
})
export class SettingsRestauranteComponent implements OnInit {
	public restaurante: Restaurante;
	public paises: Pais[];
	public monedas: FacturacionMoneda[];
	formSettingsRestaurante: FormGroup;
	public fechaActual: Date;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder,
		private paisService: PaisService,
		private settingRestauranteService: SettingRestauranteService,
		private facturacionMonedaService: FacturacionMonedaService
	) {
		this.fechaActual = new Date();
		this.restaurante = new Restaurante();
	}

	ngOnInit() {
		$(document).ready(() => {
			$(".letras").keypress(function(key) {
				if (
					(key.charCode < 97 || key.charCode > 122) && // letras mayusculas
					(key.charCode < 65 || key.charCode > 90) && // letras minusculas
					key.charCode !== 241 && // ñ
					key.charCode !== 209 && // Ñ
					key.charCode !== 32 && // espacio
					key.charCode !== 225 && // á
					key.charCode !== 233 && // é
					key.charCode !== 237 && // í
					key.charCode !== 243 && // ó
					key.charCode !== 250 && // ú
					key.charCode !== 193 && // Á
					key.charCode !== 201 && // É
					key.charCode !== 205 && // Í
					key.charCode !== 211 && // Ó
					key.charCode !== 218 // Ú
				) {
					return false;
				}
			});
		});

		this.initFormSettingRestaurante();
		this.getPaises();
		this.getTipoMoneda();
	}

	initFormSettingRestaurante() {
		this.formSettingsRestaurante = this.formBuilder.group({
			nombreRestaurante: new FormControl("", Validators.required),
			pais: new FormControl(null, Validators.required),
			moneda: new FormControl(null, Validators.required),
			monedaFacturacion: new FormControl(null, Validators.required),
			correo: new FormControl(null, [Validators.required, Validators.email, CustomValidators.nospaceValidator]),
			respaldoAutomatico: new FormControl(false, Validators.required),
			cuotaFija: new FormControl(false, Validators.required),
			telefono: new FormControl("", [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
			fechaFundacion: new FormControl(null, Validators.required),
			razonSocial: new FormControl("", [Validators.required, Validators.maxLength(150)]),
			descripcion: new FormControl("", [Validators.required, Validators.maxLength(150)])
		});
	}

	getValueForm() {
		this.restaurante.NombRestaurante = this.formSettingsRestaurante.value.nombreRestaurante;
		this.restaurante.IdPais = this.formSettingsRestaurante.value.pais;
		this.restaurante.IdMoneda = this.formSettingsRestaurante.value.moneda;
		this.restaurante.IdMonedaFacturacion = this.formSettingsRestaurante.value.monedaFacturacion;
		this.restaurante.Correo = this.formSettingsRestaurante.value.correo;
		this.restaurante.IsAutoBackup = this.formSettingsRestaurante.value.respaldoAutomatico;
		this.restaurante.IsCuotaFija = this.formSettingsRestaurante.value.cuotaFija;
		this.restaurante.TelPrincipal = this.formSettingsRestaurante.value.telefono;
		this.restaurante.FechaFundacion = this.formSettingsRestaurante.value.fechaFundacion;
		this.restaurante.RazonSocial = this.formSettingsRestaurante.value.razonSocial;
		this.restaurante.DescRestaurante = this.formSettingsRestaurante.value.descripcion;
	}

	resetFormSettingRestaurante() {
		Object.keys(this.formSettingsRestaurante.controls).forEach((value, index) => {
			if (value !== "restaurante") {
				this.formSettingsRestaurante.controls[value].reset();
			}
		});
	}

	getSettingRestaurante() {
		this.getValueForm();

		this.settingRestauranteService.createdRestaurante(this.restaurante).subscribe(response => {
			if (response) {
				swal.fire({
					title: "El Restaurante se ha creado exitosamente!",
					text: "Haga click en aceptar para ser redigirido al menu principal",
					type: "success",
					showCancelButton: false,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "aceptar"
				}).then(result => {
					if (result.value) {
						this.router.navigate(["/dashboard"]);
					}
				});
			}
		});
	}

	getPaises() {
		this.paisService.getPaises().subscribe(paises => {
			this.paises = paises;
		});
	}

	getTipoMoneda() {
		this.facturacionMonedaService.getFacturaMonedas().subscribe(monedas => {
			this.monedas = monedas;
		});
	}
}
