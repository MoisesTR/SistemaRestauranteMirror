import {Component, OnInit, ViewChild} from '@angular/core';
import {SucursalService} from "../../services/sucursal.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Sucursal} from "../../models/Sucursal";
import { Subject } from 'rxjs/Rx';
import swal from 'sweetalert2';
import {idioma_espanol} from "../../services/global";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {DataTableDirective} from "angular-datatables";
import {CustomValidators} from "../../validadores/CustomValidators";
import {TelefonoSucursal} from "../../models/TelefonoSucursal";
declare var $:any;

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css'],
  providers: [SucursalService]
})
export class SucursalComponent implements OnInit {
  @ViewChild('formEnvase') formSucursal: NgForm;

  public sucursal : Sucursal;
  public sucursales : Sucursal[];
  public telefonoPrincipal: TelefonoSucursal;
  public telefonoSecundario: TelefonoSucursal;
  public mensaje : string;


  public formAddSucursal: FormGroup;
  public formUpdateSucursal: FormGroup;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _sucursalService : SucursalService,
    private _formBuilderSucursal : FormBuilder
  ) {

    this.initConstructorSucursal();
  }

  private initConstructorSucursal(){
    this.sucursal = new Sucursal(null,null,null,null,null,null);
  }

  ngOnInit() {

    $(document).ready(function() {

      $(".letras").keypress(function (key) {
        if ((key.charCode < 97 || key.charCode > 122)//letras mayusculas
          && (key.charCode < 65 || key.charCode > 90) //letras minusculas
          && (key.charCode != 45) //retroceso
          && (key.charCode != 241) //ñ
          && (key.charCode != 209) //Ñ
          && (key.charCode != 32) //espacio
          && (key.charCode != 225) //á
          && (key.charCode != 233) //é
          && (key.charCode != 237) //í
          && (key.charCode != 243) //ó
          && (key.charCode != 250) //ú
          && (key.charCode != 193) //Á
          && (key.charCode != 201) //É
          && (key.charCode != 205) //Í
          && (key.charCode != 211) //Ó
          && (key.charCode != 218) //Ú

        )
          return false;
      });

      $(".selectoperadoraprincipal").select2({
        maximumSelectionLength: 1
      });

      $(".selectoperadorasecundario").select2({
        maximumSelectionLength: 1
      });

      $('.telefono').mask('0000-0000');

    });


    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      /*select: true*/
    };

    this._sucursalService.getSucursales().subscribe(
      response => {
        if(response.sucursales){
          this.sucursales = response.sucursales;
          console.log(this.sucursales);
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );


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
        }
      }, error =>{

      }
    )
  }
  settingsDatatable(){

    /*PROPIEDADES GENERALES DE LA DATATABLE*/
    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      /*,select: true*/
    };
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });

  }


  private initConstructorSucural() {
    this.sucursal = new Sucursal(null,null,null,null,null,null);
  }


  getSucursal(){
    this._sucursalService.getSucursales().subscribe(
      response => {

        if(!response.sucursales){
          console.log('Ha ocurrido un error');
        } else {
          this.sucursales = response.sucursales;
        }
      },error => {
        console.log(<any>error);
      }
    )
  }

  getSucursalRender(){
    this._sucursalService.getSucursales().subscribe(
      response => {
        if(response.sucursales){
          this.sucursales = response.sucursales;
          this.rerender();
        }
      }, error =>{

      }
    );
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
        Validators.required,
        Validators.minLength(5),
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
          Validators.minLength(5),
          Validators.maxLength(100),
        ]

      ),'telefonoSecundario': new FormControl('',[
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),

        ]

      )
    });
  }

  getValuesFormAddSucursal(){

    this.sucursal.NombreSucursal = this.formAddSucursal.value.nombreSucursal;
    this.sucursal.Direccion = this.formAddSucursal.value.direccion;

  }

  getValuesFormUpdateSucursal(){

    this.sucursal.NombreSucursal = this.formAddSucursal.value.nombreSucursal;
    this.sucursal.Direccion = this.formAddSucursal.value.descripcionSucursal;


  }

  showModalUpdateSucursal(sucursal){

    $('#modalUpdateSucursal').modal('show');
    let Sucursal : Sucursal;
    Sucursal = sucursal;

    this.sucursal.IdSucursal  = Sucursal.IdSucursal;

  /*  this.formUpdateSucursal.reset();
    this.formUpdateSucursal.setValue({
      nombreSucursal: Sucursal.NombreSucursal
      , direccionSucursal: Sucursal.Direccion
      , telefonoSucursal: 'asd'
    });

*/
  }

  createSucursal(){
    this.getValuesFormAddSucursal();

    this._sucursalService.createSucursal(this.sucursal).subscribe(
      response => {

        if (response.IdSucursal) {

          swal(
            'Sucursal',
            'El sucursal ha sido creado exitosamente!',
            'success'
          ).then(() => {
            $('#modalAddSucursal').modal('toggle');
            this.formAddSucursal.reset();
            this.sucursal = new Sucursal(null,null,null,null,null,null);
            this.getSucursalRender();
          })

        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar Envase, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');

        }
        /*this.getSucursal();*/
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

  getEnvaseSucursal(IdSucursal){

    this._sucursalService.getSucursal(IdSucursal).subscribe(
      response => {

        if(!response.sucursal){

        } else {
          this.sucursal = response.sucursal;
        }
      },error => {
        console.log(<any>error);
      }
    )
  }

  updateSucursal(){

    this.getValuesFormUpdateSucursal();

    this._sucursalService.updateSucursal(this.sucursal,Sucursal).subscribe(
      response =>{
        if(response.success){
          swal(
            'Sucursal',
            'El sucrusal ha sido actualizado exitosamente!',
            'success'
          ).then(() => {
            $('#modalUpdateEnvase').modal('toggle');
            this.formUpdateSucursal.reset();
            this.getSucursalRender();
          })


        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error en la actualizacion, intenta nuevamente!',
            'error'
          )
        }
      }, error =>{
        if (error.status == 500) {
          swal(
            'Error inesperado',
            'Ha ocurrido un error en el servidor, intenta nuevamente!',
            'error'
          )
        }
      }
    )

    this.sucursal = new Sucursal(null,null,null, null, null, null);

  }

  deleteSucursal(IdSucursal){

    swal({
      title: "Estas seguro(a)?",
      text: "La envase sera eliminada permanentemente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!'
    }).then((eliminar) => {
      if (eliminar) {
        this._sucursalService.deleteSucursal(IdSucursal).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminada!',
                'La sucursal ha sido eliminada exitosamente',
                'success'
              ).then(() => {
                this.getSucursalRender();
              })
            } else {
              swal(
                'Error inesperado',
                'Ha ocurrido un error en la eliminación, intenta nuevamente!',
                'error'
              )
            }
          }, error =>{
            if(error.status = 500){
              swal(
                'Error inesperado',
                'Ha ocurrido un error en el servidor, intenta nuevamente!',
                'error'
              )
            }
          }
        )

      }
    });

  }

  cleanFormAdd(){

    this.formAddSucursal.reset();
    $('.selectoperadoraprincipal').val(null)
      .trigger('change');
    $('.selectoperadorasecundario').val(null)
      .trigger('change');
  }


}
