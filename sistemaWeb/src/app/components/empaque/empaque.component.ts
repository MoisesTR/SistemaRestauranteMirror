import { Component, OnInit, ViewChild } from '@angular/core';
import {EmpaqueService} from "../../services/empaque.service";
import {Empaque} from "../../models/Empaque";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, FormControl, FormArray, NgForm, Validators} from '@angular/forms';
import { Subject } from 'rxjs/Rx';
import swal from 'sweetalert2';
import {DataTableDirective} from "angular-datatables";
import {idioma_espanol} from "../../services/global";
declare var $:any;

@Component({
  selector: 'app-empaque',
  templateUrl: './empaque.component.html',
  styleUrls: ['./empaque.component.css'],
  providers: [EmpaqueService]
})
export class EmpaqueComponent implements OnInit {  

  @ViewChild('formEmpaque') formEmpaque: NgForm;



  public empaque: Empaque;
  public empaques: Empaque[];

  public formAddEmpaque: FormGroup;
  public formUpdateEmpaque: FormGroup;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

   @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _EmpaqueServicio : EmpaqueService
  ) {
    this.empaque = new Empaque(null,null,null,null);
  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      /*,select: true*/
    };

    this._EmpaqueServicio.getEmpaques().subscribe(
      response => {
        if(response.empaques){
          this.empaques = response.empaques;
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

  private initConstructorEmpaque() {
    this.empaque = new Empaque(null,null,null,null);
  }

  createEmpaque(myForm: NgForm){


    this.empaque.Descripcion= this.formEmpaque.value.descripcion;
    this.empaque.NombreEmpaque = this.formEmpaque.value.nombre;
    this.formEmpaque.reset;

    this._EmpaqueServicio.createEmpaque(this.empaque).subscribe(
      response =>{

        if(response.IdEmpaque){
          console.log('Creado con exito');
        }
      },
      error=>{

      }
    )

    console.log(this.empaque.Descripcion + this.empaque.NombreEmpaque);



  }

getEmpaque(){

    this._EmpaqueServicio.getEmpaques().subscribe(
      response => {
        if(response.empaques){
          this.empaques= response.empaques;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );
  }

  getEmpaquesRender(){
    this._EmpaqueServicio.getEmpaques().subscribe(
      response => {
        if(response.empaques){
          this.empaques = response.empaques;
          this.rerender();
        }
      }, error =>{

      }
    );
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddEmpaque(){

    this.formAddEmpaque = new FormGroup({
      'nombreEmpaque': new FormControl()
      , 'descripcionEmpaque': new FormControl()
    });

  }

  initFormUpdateEmpaque(){

    this.formUpdateEmpaque = new FormGroup({
      'nombreEmpaque': new FormControl()
      , 'descripcionEmpaque': new FormControl()
    });
  }

  getValuesFormAddEmpaque(){

    this.empaque.NombreEmpaque = this.formAddEmpaque.value.nombreEmpaque;
    this.empaque.Descripcion = this.formAddEmpaque.value.descripcionEmpaque;

  }

  getValuesFormUpdateEmpaque(){

    this.empaque.NombreEmpaque= this.formUpdateEmpaque.value.nombreEmpaque;
    this.empaque.Descripcion = this.formUpdateEmpaque.value.descripcionEmpaque;
  }

  showModalUpdateEmpaque(empaque){

    $('#modalUpdateEmpaque').modal('show');
    let Empaque : Empaque;
    Empaque = empaque;

    this.empaque.IdEmpaque  = Empaque.IdEmpaque;

    this.formUpdateEmpaque.reset();
    this.formUpdateEmpaque.setValue({
      nombreEmpaque: Empaque.NombreEmpaque
      , descripcionEmpaque: Empaque.Descripcion
    });


  }

  createEmpaqueProducto(){
    this.getValuesFormAddEmpaque();

    this._EmpaqueServicio.createEmpaque(this.empaque).subscribe(
      response => {

        if (response.IdClasficcacion) {

          swal(
            'Empaque',
            'El empaque ha sido creado exitosamente!',
            'success'
          ).then(() => {
            $('#modalAddEmpaque').modal('toggle');
            this.formAddEmpaque.reset();
            this.empaque= new Empaque(null,null,null,null);
            this.getEmpaquesRender();
          })

        } else {
          swal(    
            'Error inesperado',
            'Ha ocurrido un error al insertar Empaque, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');

        }
        this.getEmpaque();
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

  getEmpaqueProducto(IdEmpaque){

    this._EmpaqueServicio.getEmpaque(IdEmpaque).subscribe(
      response => {

        if(!response.empaque){

        } else {
          this.empaque = response.empaque;
        }
      },error => {
        console.log(<any>error);
      }
    )
  }

  getEmpaques(){
    this._EmpaqueServicio.getEmpaques().subscribe(
      response => {

        if(!response.empaques){
          console.log('Ha ocurrido un error');
        } else {
          this.empaques = response.empaques;
        }
      },error => {
        console.log(<any>error);
    }
    )
  }

  updateEmpaque(){

    this.getValuesFormUpdateEmpaque();

    this._EmpaqueServicio.updateEmpaque(this.empaque,Empaque).subscribe(
      response =>{
        if(response.success){
          swal(
            'Empaque',
            'El empaque ha sido actualizado exitosamente!',
            'success'
          ).then(() => {
            $('#modalUpdateEmpaque').modal('toggle');
            this.formUpdateEmpaque.reset();
            this.getEmpaquesRender();
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

    this.empaque = new Empaque(null, null, null, null);

  }

  deleteEmpaque(IdEmpaque){

    swal({
      title: "Estas seguro(a)?",
      text: "La empaque sera eliminada permanentemente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!'
    }).then((eliminar) => {
      if (eliminar) {
        this._EmpaqueServicio.deleteEmpaque(IdEmpaque).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminada!',
                'La empaque ha sido eliminada exitosamente',
                'success'
              ).then(() => {
               this.getEmpaquesRender();
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
