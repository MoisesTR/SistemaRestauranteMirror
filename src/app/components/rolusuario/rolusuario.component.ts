import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs/Subject";

import { ModalDirective } from "ng-uikit-pro-standard";
import { idioma_espanol } from "@app/core/services/shared/global";
import { RolUsuario } from "@app/models/RolUsuario";
import { RolusuarioService, SpinnerService } from "@app/core/service.index";
import swal from "sweetalert2";
import { DataTableDirective } from "angular-datatables";
import { CustomValidators } from "@app/validadores/CustomValidators";
import { Utils } from "../Utils";

@Component({
	selector: "app-rolusuario",
	templateUrl: "./rolusuario.component.html",
	styleUrls: ["./rolusuario.component.css"]
})
export class RolusuarioComponent implements OnInit, InvocarFormulario {
	public rol: RolUsuario;
	public roles: RolUsuario[];
	public formAddRolUsuario: FormGroup;
	public formUpdateRolUsuario: FormGroup;
	public tituloPantalla: string = "Rol";

	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject<any>();

	@ViewChild("modalAddRol") modalAddRol: ModalDirective;
	@ViewChild("modalUpdateRol") modalUpdateRol: ModalDirective;

	@ViewChild(DataTableDirective) dtElement: DataTableDirective;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private rolUsuarioService: RolusuarioService,
		private spinner: SpinnerService,
		private formBuilderRol: FormBuilder
	) {
		this.rol = new RolUsuario();
	}

	ngOnInit() {
		this.settingsDatatable();
		this.getRoles();
		this.initFormAddRolUsuario();
		this.initFormUpdateRolUsuario();
	}

	settingsDatatable() {
		/*PROPIEDADES GENERALES DE LA DATATABLE*/
		this.dtOptions = <DataTables.Settings>{
			pagingType: "full_numbers",
			pageLength: 10,
			language: idioma_espanol,
			lengthChange: false,
			responsive: true,
			dom: "Bfrtip",
			buttons: [
				{
					text: "Agregar",
					key: "1",
					className: "btn orange-chang float-right-dt",
					action: (e, dt, node, config) => {
						this.InvocarModal(this.modalAddRol, this.formAddRolUsuario);
					}
				}
			]
		};
	}

	getRoles() {
		this.spinner.display(true);
		this.rolUsuarioService.getRoles().subscribe(
			response => {
				if (response.roles) {
					this.roles = response.roles;
					this.dtTrigger.next();
				}
			},
			error => {
				this.spinner.display(false);
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			},
			() => {
				this.spinner.display(false);
			}
		);
	}

	rerender(): void {
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			// Destroy the table first
			dtInstance.destroy();
			// Call the dtTrigger to rerender again
			this.dtTrigger.next();
		});
	}

	getRolesRender() {
		this.rolUsuarioService.getRoles().subscribe(
			response => {
				if (response.roles) {
					this.roles = response.roles;
					this.rerender();
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			},
			() => {

			}
		);
	}

	/*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
	initFormAddRolUsuario() {
		this.formAddRolUsuario = this.formBuilderRol.group({
			nombreRol: new FormControl("", [
				Validators.required,
				Validators.maxLength(20),
				Validators.minLength(5),
				CustomValidators.nospaceValidator
			]),
			descripcionRol: new FormControl("", [
				Validators.required,
				Validators.maxLength(20),
				Validators.minLength(5),
				CustomValidators.nospaceValidator
			])
		});
	}

	initFormUpdateRolUsuario() {
		this.formUpdateRolUsuario = this.formBuilderRol.group({
			nombreRol: new FormControl("", [
				Validators.required,
				Validators.maxLength(20),
				Validators.minLength(5),
				CustomValidators.nospaceValidator
			]),
			descripcionRol: new FormControl("", [
				Validators.required,
				Validators.maxLength(20),
				Validators.minLength(5),
				CustomValidators.nospaceValidator
			])
		});
	}

	getValuesFormAddRolUsuario() {
		this.rol.NombreRol = this.formAddRolUsuario.value.nombreRol;
		this.rol.DescripcionRol = this.formAddRolUsuario.value.descripcionRol;
	}

	getValuesFormUpdateRolUsuario() {
		this.rol.NombreRol = this.formUpdateRolUsuario.value.nombreRol;
		this.rol.DescripcionRol = this.formUpdateRolUsuario.value.descripcionRol;
	}

	createRolUsuario(Modal) {
		this.getValuesFormAddRolUsuario();

		this.rolUsuarioService.createRolUsuario(this.rol).subscribe(
			response => {
				if (response.IdRol) {
					swal("Rol", "El Rol ha sido creado exitosamente!", "success").then(() => {
						Modal.hide();
						this.formAddRolUsuario.reset();
						this.rol = new RolUsuario();
						this.getRolesRender();
					});
				} else {
					Utils.showMsgInfo("Ha ocurrido un error al insertar el rol, intentalo nuevamente", this.tituloPantalla);
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);
	}

	updateRolUsuario() {
		this.getValuesFormUpdateRolUsuario();

		this.rolUsuarioService.updateRol(this.rol).subscribe(
			response => {
				if (response.success) {
					swal("Rol", "El rol ha sido actualizado exitosamente!", "success").then(() => {
						this.modalUpdateRol.hide();
						this.formUpdateRolUsuario.reset();
						this.getRolesRender();
					});
				} else {
					Utils.showMsgInfo("Ha ocurrido un error inesperado al actualizar, intentalo nuevamente", this.tituloPantalla);
				}
			},
			error => {
				Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
			}
		);

		this.rol = new RolUsuario();
	}

	// deleteRolUsuario(IdRol){
	//
	//   swal({
	//     title: "Estas seguro(a)?",
	//     text: "El rol sera eliminada permanentemente!",
	//     type: 'warning',
	//     showCancelButton: true,
	//     confirmButtonColor: '#3085d6',
	//     cancelButtonColor: '#d33',
	//     confirmButtonText: 'Si, Eliminala!'
	//   }).then((eliminar) => {
	//     if (eliminar) {
	//       this._RolusuarioService.deleteRol(IdRol).subscribe(
	//         response =>{
	//           if(response.success){
	//             swal(
	//               'Eliminada!',
	//               'El Rol ha sido eliminada exitosamente',
	//               'success'
	//             ).then(() => {
	//              this.getRolRender();
	//             })
	//           } else {
	//             swal(
	//               'Error inesperado',
	//               'Ha ocurrido un error en la eliminación, intenta nuevamente!',
	//               'error'
	//             )
	//           }
	//         }, error =>{
	//           if(error.status = 500){
	//             swal(
	//               'Error inesperado',
	//               'Ha ocurrido un error en el servidor, intenta nuevamente!',
	//               'error'
	//             )
	//           }
	//         }
	//       )
	//
	//     }
	//   });
	//
	// }
	InvocarModal(Modal, Formulario) {
		Utils.invocacionModal(Modal, Formulario);
	}

	invocarModalUpdate(Modal, Rol: RolUsuario) {
		this.rol.IdRol = Rol.IdRol;
		this.rol.NombreRol = Rol.NombreRol;
		this.rol.DescripcionRol = Rol.DescripcionRol;

		this.formUpdateRolUsuario.reset();
		this.formUpdateRolUsuario.setValue({
			nombreRol: Rol.NombreRol,
			descripcionRol: Rol.DescripcionRol
		});

		Modal.show();
	}
}
