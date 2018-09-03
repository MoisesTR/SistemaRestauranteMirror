import {Component, OnInit, ViewChild} from '@angular/core';
import {SucursalService} from '../../services/shared/sucursal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Sucursal} from '../../models/Sucursal';
import {Subject} from 'rxjs';
import swal from 'sweetalert2';
import {idioma_espanol} from '../../services/shared/global';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataTableDirective} from 'angular-datatables';
import {CustomValidators} from '../../validadores/CustomValidators';
import {TelefonosucursalService} from '../../services/shared/telefonosucursal.service';
import {TelefonoSucursal} from '../../models/TelefonoSucursal';
import {Utils} from '../Utils';
import {ModalDirective} from 'ng-uikit-pro-standard';

declare var $: any;

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css'],
  providers: [SucursalService]
})
export class SucursalComponent implements OnInit , InvocarFormulario{

  public sucursal: Sucursal;
  public sucursales: Sucursal[];
  public telefonosSucursales: TelefonoSucursal [];
  public telefonoPrincipal: TelefonoSucursal;
  public telefonoSecundario: TelefonoSucursal;

  public formAddSucursal: FormGroup;
  public formUpdateSucursal: FormGroup;
  public tituloPantalla = 'Sucursal';
  public Telefonos: TelefonoSucursal [] = [];

  @ViewChild('modalAddSucursal') modalAddSucursal: ModalDirective;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _sucursalService : SucursalService
    , private _telefonoService: TelefonosucursalService
    , private _formBuilderSucursal : FormBuilder
  ) {

    this.sucursal = new Sucursal();
    this.telefonoPrincipal = new TelefonoSucursal();
    this.telefonoSecundario = new TelefonoSucursal();
  }

  ngOnInit() {

    $('.telefono').mask('0000-0000');

    this.settingsDatatable();
    this.getSucursal();
    this.initFormAddSucursal();
    this.initFormUpdateSucursal();
    this.getSucursales();

  }


  getSucursales() {
    this._sucursalService.getSucursales().subscribe(
      response => {
        if (response.sucursales) {
          this.sucursales = response.sucursales;
          this.dtTrigger.next();
        }
      }, error => {

      }, () => {
      }
    );
  }

  getSucursalesRender() {
      this._sucursalService.getSucursales().subscribe(
          response => {
              if (response.sucursales) {
                  this.sucursales = response.sucursales;
                  this.rerender();
              }
          }, error => {

          }, () => {
          }
      );
  }

  settingsDatatable() {

      /*PROPIEDADES GENERALES DE LA DATATABLE*/
      this.dtOptions = <DataTables.Settings>{
          pagingType: 'full_numbers'
          , pageLength: 10
          , language: idioma_espanol
          , 'lengthChange': false
          , responsive: true
          , dom: 'Bfrtip',
          buttons: [
              {
                  text: 'Agregar',
                  key: '1',
                  className: 'btn orange-chang float-right-dt',
                  action: (e, dt, node, config) => {
                      this.InvocarModal(this.modalAddSucursal, this.formAddSucursal);
                  }
              }
          ]
      };
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });

  }

  getSucursal() {
    this._sucursalService.getSucursales().subscribe(
      response => {

        if(response.sucursales) {
          this.sucursales = response.sucursales;
        } else {
          Utils.showMsgInfo('Ha ocurrido un error al obtener las sucursales', this.tituloPantalla);
        }
      }, error => {
        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    );
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddSucursal() {

    this.formAddSucursal = this._formBuilderSucursal.group({
      'nombreSucursal': new FormControl('',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        CustomValidators.nospaceValidator
      ])
      , 'direccion': new FormControl('',[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.nospaceValidator
        ]

      ), 'telefonoPrincipal': new FormControl('',[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]

      ), 'telefonoSecundario': new FormControl('',[
        Validators.minLength(8),
        Validators.maxLength(100)
      ]

    )
    });

  }


  initFormUpdateSucursal() {

    this.formUpdateSucursal = this._formBuilderSucursal.group({
      'nombreSucursal': new FormControl('',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        CustomValidators.nospaceValidator
      ])
      , 'direccion': new FormControl('',[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.nospaceValidator
        ]

      ), 'telefonoPrincipal': new FormControl('',[
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
        ]

      ), 'telefonoSecundario': new FormControl('',[
          Validators.minLength(8),
          Validators.maxLength(10),

        ]

      )
    });
  }

  getValuesFormAddSucursal() {

    this.sucursal.NombreSucursal = this.formAddSucursal.value.nombreSucursal;
    this.sucursal.Direccion = this.formAddSucursal.value.direccion;
    this.sucursal.Telefono1 = this.formAddSucursal.value.telefonoPrincipal.toString().replace('-', '');
    this.sucursal.Telefono2 = this.formAddSucursal.value.telefonoSecundario != null ? this.formAddSucursal.value.telefonoSecundario.toString().replace('-', '') : '';

  }

  getValuesFormUpdateSucursal(){
    this.sucursal.NombreSucursal = this.formUpdateSucursal.value.nombreSucursal;
    this.sucursal.Direccion = this.formUpdateSucursal.value.direccion;
    this.sucursal.Telefono1 = this.formUpdateSucursal.value.telefonoPrincipal.toString().replace('-', '');
    this.sucursal.Telefono2 = this.formUpdateSucursal.value.telefonoSecundario != null ? this.formUpdateSucursal.value.telefonoSecundario.toString().replace('-', '') : '';
  }


  createSucursal(Modal){
    this.getValuesFormAddSucursal();

    this._sucursalService.createSucursal(this.sucursal).subscribe(
      response => {

        if (response.IdSucursal) {
            swal(
                this.tituloPantalla,
                'la Sucursal ha sido creada exitosamente!',
                'success'
            ).then( () =>  {
                Modal.hide();
                this.formAddSucursal.reset();
                this.getSucursalesRender();
            });
        } else {
          Utils.showMsgInfo('Ha ocurrido un error al crear la sucursal,intentalo nuevamente', this.tituloPantalla);

        }
      }, error => {
        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);

      }
    );
  }

  updateSucursal(Modal) {

    this.getValuesFormUpdateSucursal();

    this._sucursalService.updateSucursal(this.sucursal).subscribe(
      response => {
        if (response.success) {
          swal(
            'Sucursal',
            'La sucursal ha sido actualizada exitosamente!',
            'success'
          ).catch(swal.noop).then(() => {
            Modal.hide();
            this.formUpdateSucursal.reset();
            this.getSucursalesRender();
            this.sucursal = new Sucursal();
          });

        } else {
          Utils.showMsgInfo('Ha ocurrido un error al actualizar, intentalo nuevamente', this.tituloPantalla);
        }
      }, error => {
        Utils.showMsgError(Utils.msgError(error), this.tituloPantalla);
      }
    );
  }

  deleteSucursal(IdSucursal) {
    swal({
      title: 'Estas seguro(a)?',
      text: 'La sucursal sera eliminada!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            this._sucursalService.deleteSucursal(IdSucursal).subscribe(
                response => {
                    if (response.success) {
                        swal(
                            'Eliminada!',
                            'La sucursal ha sido eliminada exitosamente',
                            'success'
                        ).then(() => {
                            this.getSucursalesRender();
                        });
                    } else {
                        swal(
                            'Error inesperado',
                            'Ha ocurrido un error en la eliminación, intenta nuevamente!',
                            'error'
                        );
                    }
                }, error => {
                   Utils.showMsgError(Utils.msgError(error));
                }
            );
        } else if (result.dismiss === swal.DismissReason.cancel) {

        }
    });

  }

  InvocarModal(Modal, Formulario) {
    Utils.invocacionModal(Modal, Formulario);
  }

  invocarModalUpdate(Modal, Sucursal: Sucursal) {

    this.sucursal.IdSucursal  = Sucursal.IdSucursal;

    this.formUpdateSucursal.reset();

    this.formUpdateSucursal.setValue({
        nombreSucursal: Sucursal.NombreSucursal
        , direccion: Sucursal.Direccion
        , telefonoPrincipal: Sucursal.Telefono1
        , telefonoSecundario : Sucursal.Telefono2
    });

    Modal.show();
  }

}
