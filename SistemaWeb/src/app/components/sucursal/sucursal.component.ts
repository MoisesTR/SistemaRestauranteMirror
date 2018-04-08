import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SucursalService} from '../../services/sucursal.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Sucursal} from '../../models/Sucursal';
import {Subject} from 'rxjs/Rx';
import swal from 'sweetalert2';
import {idioma_espanol} from '../../services/global';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataTableDirective} from 'angular-datatables';
import {CustomValidators} from '../../validadores/CustomValidators';
import {TelefonosucursalService} from '../../services/telefonosucursal.service';
import {TelefonoSucursal} from '../../models/TelefonoSucursal';
import {isNull} from 'util';
import {Utilidades} from '../Utilidades';

declare var $:any;

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css'],
  providers: [SucursalService]
})
export class SucursalComponent implements OnInit , AfterViewInit, InvocarFormulario{

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  public sucursal : Sucursal;
  public sucursales : Sucursal[];
  public telefonosSucursales : TelefonoSucursal [];
  public telefonoPrincipal: TelefonoSucursal;
  public telefonoSecundario: TelefonoSucursal;

  public formAddSucursal: FormGroup;
  public formUpdateSucursal: FormGroup;

  public Telefonos  : TelefonoSucursal [] = [];
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


  getSucursales(){
    this._sucursalService.getSucursales().subscribe(
      response =>{
        if(response.sucursales){
          this.sucursales = response.sucursales;

          this._telefonoService.getTelefonosSucursales().subscribe(
            response =>{
              if(response.telefonos) {
                this.telefonosSucursales = response.telefonos;

                this.sucursales.forEach((sucursal,index) =>{
                    this.sucursal.Telefono = this.telefonosSucursales.filter(
                      telefono => telefono.IdSucursal === sucursal.IdSucursal
                    )
                  this.sucursales[index].Telefono = this.sucursal.Telefono;
                })
              }
            }, error =>{

            }, () => {
            }
          )
        }
      }, error =>{

      }, ()=>{
      }
    )

  }

  settingsDatatable(){

    /*PROPIEDADES GENERALES DE LA DATATABLE*/
    this.dtOptions = <DataTables.Settings>{
      pagingType: 'full_numbers'
      , pageLength: 10
      , 'lengthChange': false
      , language: idioma_espanol
      , responsive : true
    };
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });

  }

  getSucursal(){
    this._sucursalService.getSucursales().subscribe(
      response => {

        if(!response.sucursales){

        } else {
          this.sucursales = response.sucursales;
        }
      },error => {
        console.log(<any>error);
      }
    )
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddSucursal(){

    this.formAddSucursal = this._formBuilderSucursal.group({
      'nombreSucursal': new FormControl('',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        CustomValidators.espaciosVacios
      ])
      , 'direccion': new FormControl('',[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.espaciosVacios
        ]

      ),'telefonoPrincipal': new FormControl('',[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100)
        ]

      ),'telefonoSecundario': new FormControl('',[
        Validators.minLength(8),
        Validators.maxLength(100)
      ]

    )
    });

  }


  initFormUpdateSucursal(){

    this.formUpdateSucursal = this._formBuilderSucursal.group({
      'nombreSucursal': new FormControl('',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        CustomValidators.espaciosVacios
      ])
      , 'direccion': new FormControl('',[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
          CustomValidators.espaciosVacios
        ]

      ),'telefonoPrincipal': new FormControl('',[
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
        ]

      ),'telefonoSecundario': new FormControl('',[
          Validators.minLength(8),
          Validators.maxLength(10),

        ]

      )
    });
  }

  getValuesFormAddSucursal(){

    this.sucursal.NombreSucursal = this.formAddSucursal.value.nombreSucursal;
    this.sucursal.Direccion = this.formAddSucursal.value.direccion;
    this.telefonoPrincipal.NumeroTelefono = this.formAddSucursal.value.telefonoPrincipal;
    this.telefonoSecundario.NumeroTelefono = this.formAddSucursal.value.telefonoSecundario;

    this.Telefonos  = [];
    this.Telefonos.push(this.telefonoPrincipal);

    if(!isNull(this.telefonoSecundario.NumeroTelefono)){
      this.Telefonos.push(this.telefonoSecundario);
    }

  }

  getValuesFormUpdateSucursal(){
    this.sucursal.NombreSucursal = this.formUpdateSucursal.value.nombreSucursal;
    this.sucursal.Direccion = this.formUpdateSucursal.value.direccion;
    this.telefonoPrincipal.NumeroTelefono = this.formUpdateSucursal.value.telefonoPrincipal;
    this.telefonoSecundario.NumeroTelefono = this.formUpdateSucursal.value.telefonoSecundario;
  }


  createSucursal(Modal){
    this.getValuesFormAddSucursal();

    this._sucursalService.createSucursal(this.sucursal).subscribe(
      response => {

        if (response.IdSucursal) {
          this.crearTelefonoSucursal(response.IdSucursal,Modal);
        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar Envase, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');

        }
      }, error => {
        if (error.status == 500) {
          swal(
            'Error inesperado',
            'Ha ocurrido un error en el servidor, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');
        }

      }
    )
  }


  crearTelefonoSucursal(IdSucursal,Modal){
    let resultado;
      this.Telefonos.forEach((telefono, index) => {
        resultado = false;
        telefono.IdSucursal = IdSucursal;
        this._telefonoService.createTelefonoSucursal(telefono).subscribe(
          response => {
            if(response.IdTelefonoSucursal) {
              resultado = true;
            }
          }, error =>{

          }, () => {
            if(index == (this.Telefonos.length - 1)) {
              if(resultado) {
                swal(
                  'Sucursal',
                  'El sucursal ha sido creado exitosamente!',
                  'success'
                ).then(() => {
                  Modal.hide();
                  this.formAddSucursal.reset();
                  this.sucursal = new Sucursal();
                  this.getSucursales();
                  this.rerender();
                })
              }
            }
          }
        )
      });
  }
  updateSucursal(Modal){

    Modal.hide();

    // this.getValuesFormUpdateSucursal();
    //
    // this._sucursalService.updateSucursal(this.sucursal).subscribe(
    //   response =>{
    //     if(response.success){
    //       swal(
    //         'Sucursal',
    //         'El sucursal ha sido actualizado exitosamente!',
    //         'success'
    //       ).then(() => {
    //         $('#modalUpdateEnvase').modal('toggle');
    //         this.formUpdateSucursal.reset();
    //         this.getSucursales();
    //         this.rerender();
    //       })
    //
    //
    //     } else {
    //       swal(
    //         'Error inesperado',
    //         'Ha ocurrido un error en la actualizacion, intenta nuevamente!',
    //         'error'
    //       )
    //     }
    //   }, error =>{
    //     if (error.status == 500) {
    //       swal(
    //         'Error inesperado',
    //         'Ha ocurrido un error en el servidor, intenta nuevamente!',
    //         'error'
    //       )
    //     }
    //   }
    // )

    this.sucursal = new Sucursal();

  }

  deleteSucursal(IdSucursal){

    // swal({
    //   title: "Estas seguro(a)?",
    //   text: "La sucursal sera eliminada!",
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Si, Eliminala!'
    // }).catch(swal.noop).then((eliminar) => {
    //   if (eliminar) {
    //     this._sucursalService.deleteSucursal(IdSucursal).subscribe(
    //       response =>{
    //         if(response.success){
    //           swal(
    //             'Eliminada!',
    //             'La sucursal ha sido eliminada exitosamente',
    //             'success'
    //           ).then(() => {
    //             this.getSucursalRender();
    //           })
    //         } else {
    //           swal(
    //             'Error inesperado',
    //             'Ha ocurrido un error en la eliminación, intenta nuevamente!',
    //             'error'
    //           )
    //         }
    //       }, error =>{
    //         if(error.status = 500){
    //           swal(
    //             'Error inesperado',
    //             'Ha ocurrido un error en el servidor, intenta nuevamente!',
    //             'error'
    //           )
    //         }
    //       }
    //     )
    //
    //   }
    // });

  }

  InvocarModal(Modal, Formulario) {
    Utilidades.invocacionModal(Modal,Formulario);
  }

  invocarModalUpdate(Modal,Sucursal){

    this.sucursal.IdSucursal  = Sucursal.IdSucursal;

    this.formUpdateSucursal.reset();

    this.formUpdateSucursal.setValue({
        nombreSucursal: Sucursal.NombreSucursal
        , direccion: Sucursal.Direccion
        , telefonoPrincipal: ''
        , telefonoSecundario : ''
    });

    Modal.show();
  }

}
