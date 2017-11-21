import { Component, OnInit, ViewChild } from '@angular/core';
import {EnvaseService} from "../../services/envase.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";
import {Envase} from "../../models/Envase";
import {FormGroup, FormControl, FormArray, NgForm, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from "angular-datatables";
declare var $:any;

@Component({
  selector: 'app-envase',
  templateUrl: './envase.component.html',
  styleUrls: ['./envase.component.css'],
  providers: [EnvaseService]
})
export class EnvaseComponent implements OnInit {

  @ViewChild('formEnvase') formEnvase: NgForm;

  public envase : Envase;
  public envases: Envase[];
  public mensaje : string;

  public formAddEnvase: FormGroup;
  public formUpdateEnvase: FormGroup;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();


   @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _envaseService : EnvaseService
  ) {
    this.envase = new Envase(null,null,null,null);
  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      /*,select: true*/
    };

    this._envaseService.getEnvases().subscribe(
      response => {
        if(response.envases){
          this.envases = response.envases;
          this.dtTrigger.next();
        }
      }, error =>{

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

private initConstructorEnvase() {
    this.envase = new Envase(null,null,null,null);
  }

  createEnvase(myForm: NgForm){


    this.envase.Descripcion = this.formEnvase.value.descripcion;
    this.envase.NombreEnvase = this.formEnvase.value.nombre;
    this.formEnvase.reset;

    this._envaseService.createEnvase(this.envase).subscribe(
      response =>{

        if(response.IdEnvase){
          console.log('Creado con exito');
        }
      },
      error=>{

      }
    )

    console.log(this.envase.Descripcion + this.envase.NombreEnvase);



  }

getEnvase(){

    this._envaseService.getEnvases().subscribe(
      response => {
        if(response.envases){
          this.envases= response.envases;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );
  }

  getEnvasesRender(){
    this._envaseService.getEnvases().subscribe(
      response => {
        if(response.envases){
          this.envases = response.envases;
          this.rerender();
        }
      }, error =>{

      }
    );
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddEnvase(){

    this.formAddEnvase = new FormGroup({
      'nombreEnvase': new FormControl()
      , 'descripcionEnvase': new FormControl()
    });

  }

  initFormUpdateEnvase(){

    this.formUpdateEnvase = new FormGroup({
      'nombreEnvase': new FormControl()
      , 'descripcionEnvase': new FormControl()
    });
  }

  getValuesFormAddEnvase(){

    this.envase.NombreEnvase = this.formAddEnvase.value.nombreEnvase;
    this.envase.Descripcion = this.formAddEnvase.value.descripcionEnvase;

  }

  getValuesFormUpdateEnvase(){

    this.envase.NombreEnvase= this.formUpdateEnvase.value.nombreEnvase;
    this.envase.Descripcion = this.formUpdateEnvase.value.descripcionEnvase;
  }

  showModalUpdateEnvase(envase){

    $('#modalUpdateEnvase').modal('show');
    let Envase : Envase;
    Envase = envase;

    this.envase.IdEnvase  = Envase.IdEnvase;

    this.formUpdateEnvase.reset();
    this.formUpdateEnvase.setValue({
      nombreEnvase: Envase.NombreEnvase
      , descripcionEnvase: Envase.Descripcion
    });


  }

  createEnvaseProducto(){
    this.getValuesFormAddEnvase();

    this._envaseService.createEnvase(this.envase).subscribe(
      response => {

        if (response.IdEnvase) {

          swal(
            'Envase',
            'El envase ha sido creado exitosamente!',
            'success'
          ).then(() => {
            $('#modalAddEnvase').modal('toggle');
            this.formAddEnvase.reset();
            this.envase = new Envase(null,null,null,null);
            this.getEnvasesRender();
          })

        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar Envase, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');

        }
        this.getEnvase();
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

  getEnvaseProducto(IdEnvase){

    this._envaseService.getEnvase(IdEnvase).subscribe(
      response => {

        if(!response.envase){

        } else {
          this.envase = response.envase;
        }
      },error => {
        console.log(<any>error);
      }
    )
  }

  getEnvases(){
    this._envaseService.getEnvases().subscribe(
      response => {

        if(!response.envases){
          console.log('Ha ocurrido un error');
        } else {
          this.envases = response.envases;
        }
      },error => {
        console.log(<any>error);
    }
    )
  }

  updateEnvase(){

    this.getValuesFormUpdateEnvase();

    this._envaseService.updateEnvase(this.envase,Envase).subscribe(
      response =>{
        if(response.success){
          swal(
            'Envase',
            'El envase ha sido actualizado exitosamente!',
            'success'
          ).then(() => {
            $('#modalUpdateEnvase').modal('toggle');
            this.formUpdateEnvase.reset();
            this.getEnvasesRender();
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

    this.envase = new Envase(null, null, null, null);

  }

  deleteEnvase(IdEnvase){

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
        this._envaseService.deleteEnvase(IdEnvase).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminada!',
                'La envase ha sido eliminada exitosamente',
                'success'
              ).then(() => {
               this.getEnvasesRender();
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
