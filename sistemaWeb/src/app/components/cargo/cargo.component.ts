import { Component, OnInit, ViewChild } from '@angular/core';
import {Cargo} from "../../models/Cargo";
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";
import { ActivatedRoute, Router} from "@angular/router";
import {CargoService} from "../../services/cargo.service";
import {FormGroup, FormControl, FormArray, NgForm, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from "angular-datatables";
declare var $:any;



@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css'],
  providers:[CargoService]
})
export class CargoComponent implements OnInit {

   @ViewChild('formCargo') formCargo: NgForm;

  public cargo : Cargo;
  public cargos: Cargo[];


  public formAddCargo: FormGroup;
  public formUpdateCargo: FormGroup;


  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _cargoServicio : CargoService

    ) {
        this.cargo = new Cargo(null,null,null,null);
     }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      /*,select: true*/
    };


        this._cargoServicio.getCargos().subscribe(
      response => {
        if(response.cargos){
          this.cargos= response.cargos;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    )
  }

   rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });

    }


 private initConstructorCargo() {
    this.cargo = new Cargo(null,null,null,null);
  }

  createCargo(myForm: NgForm){


    this.cargo.DescripcionCargo = this.formCargo.value.descripcionCargo;
    this.cargo.NombreCargo = this.formCargo.value.nombreCargo;
    this.formCargo.reset;

    this._cargoServicio.createCargo(this.cargo).subscribe(
      response =>{

        if(response.IdCargo){
          console.log('Creado con exito');
        }
      },
      error=>{

      }
    )

    console.log(this.cargo.DescripcionCargo + this.cargo.NombreCargo);



  }

getCargo(){

    this._cargoServicio.getCargos().subscribe(
      response => {
        if(response.cargos){
          this.cargos= response.cargos;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );
  }

  getCargosRender(){
    this._cargoServicio.getCargos().subscribe(
      response => {
        if(response.cargos){
          this.cargos = response.cargos;
          this.rerender();
        }
      }, error =>{

      }
    );
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddCargo(){

    this.formAddCargo = new FormGroup({
      'nombreCargo': new FormControl()
      , 'descripcionCargo': new FormControl()
    });

  }

  initFormUpdateCargo(){

    this.formUpdateCargo = new FormGroup({
      'nombreCargo': new FormControl()
      , 'descripcionCargo': new FormControl()
    });
  }

  getValuesFormAddCargo(){

    this.cargo.NombreCargo = this.formAddCargo.value.nombreCargo;
    this.cargo.DescripcionCargo = this.formAddCargo.value.descripcionCargo;

  }

  getValuesFormUpdateCargo(){

    this.cargo.NombreCargo= this.formUpdateCargo.value.nombreCargo;
    this.cargo.DescripcionCargo = this.formUpdateCargo.value.descripcionCargo;
  }

  showModalUpdateCargo(cargo){

    $('#modalUpdateCargo').modal('show');
    let Cargo : Cargo;
    Cargo = cargo;

    this.cargo.IdCargo  = Cargo.IdCargo;

    this.formUpdateCargo.reset();
    this.formUpdateCargo.setValue({
      nombreCargo: Cargo.NombreCargo
      , descripcionCargo:Cargo.DescripcionCargo
    });


  }

  createCargoUsuario(){
    this.getValuesFormAddCargo();

    this._cargoServicio.createCargo(this.cargo).subscribe(
      response => {

        if (response.IdCargo) {

          swal(
            'Cargo',
            'El Cargo ha sido creado exitosamente!',
            'success'
          ).then(() => {
            $('#modalAddCargo').modal('toggle');
            this.formAddCargo.reset();
            this.cargo = new Cargo(null,null,null,null);
            this.getCargosRender();
          })

        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar Cargo, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');

        }
        this.getCargo();
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

  getCargoUsuario(IdCargo){

    this._cargoServicio.getCargo(IdCargo).subscribe(
      response => {

        if(!response.cargo){

        } else {
          this.cargo = response.cargo;
        }
      },error => {
        console.log(<any>error);
      }
    )
  }

  getCargos(){
    this._cargoServicio.getCargos().subscribe(
      response => {

        if(!response.cargos){
          console.log('Ha ocurrido un error');
        } else {
          this.cargos = response.cargos;
        }
      },error => {
        console.log(<any>error);
    }
    )
  }

  updateCargo(){

    this.getValuesFormUpdateCargo();

    this._cargoServicio.updateCargo(this.cargo,Cargo).subscribe(
      response =>{
        if(response.success){
          swal(
            'Cargo',
            'El cargo ha sido actualizado exitosamente!',
            'success'
          ).then(() => {
            $('#modalUpdateCargo').modal('toggle');
            this.formUpdateCargo.reset();
            this.getCargosRender();
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

    this.cargo = new Cargo(null, null, null, null);

  }

  deleteCargo(IdCargo){

    swal({
      title: "Estas seguro(a)?",
      text: "El cargo sera eliminada permanentemente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!'
    }).then((eliminar) => {
      if (eliminar) {
        this._cargoServicio.deleteCargo(IdCargo).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminada!',
                'El cargo ha sido eliminada exitosamente',
                'success'
              ).then(() => {
               this.getCargosRender();
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
}
