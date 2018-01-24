import { Component, OnInit, ViewChild } from '@angular/core';
import {RolUsuario} from "../../models/RolUsuario";
import {RolusuarioService} from "../../services/rolusuario.service";
import {Subject} from "rxjs/Subject";
import {idioma_espanol} from "../../services/global";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, FormControl, FormArray, NgForm, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from "angular-datatables";
declare var $:any;

@Component({
  selector: 'app-rolusuario',
  templateUrl: './rolusuario.component.html',
  styleUrls: ['./rolusuario.component.css'],
  providers: [RolusuarioService]
})
export class RolusuarioComponent implements OnInit {


   @ViewChild('formRolUsuario') formRolUsuario: NgForm;

  public rol: RolUsuario;
  public roles: RolUsuario[];

  public formAddRolUsuario: FormGroup;
  public formUpdateRolUsuario: FormGroup;

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();


  @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _RolusuarioService : RolusuarioService

    ) {

    this.rol = new RolUsuario(null,null,null,null,null,null);
}


  ngOnInit() {

    this.dtOptions = <DataTables.Settings>{
      pagingType: 'full_numbers'
      , pageLength: 10
      , 'lengthChange': false
      , language: idioma_espanol
      /*,select: true*/
    };

      this._RolusuarioService.getRoles().subscribe(
      response => {
        if(response.roles){
          this.roles = response.roles;
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


 private initConstructorRolUsuario() {
   this.rol = new RolUsuario(null,null,null,null,null,null);
  }

  createRol(myForm: NgForm){


    this.rol.DescripcionRol = this.formRolUsuario.value.descripcionRol;
    this.rol.NombreRol = this.formRolUsuario.value.nombreRol;
    this.formRolUsuario.reset;

    this._RolusuarioService.createRolUsuario(this.rol).subscribe(
      response =>{

        if(response.IdRol){
          console.log('Creado con exito');
        }
      },
      error=>{

      }
    )

    console.log(this.rol.DescripcionRol + this.rol.NombreRol);



  }

getRol(){

    this._RolusuarioService.getRoles().subscribe(
      response => {
        if(response.roles){
          this.roles= response.roles;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );
  }

  getRolRender(){
    this._RolusuarioService.getRoles().subscribe(
      response => {
        if(response.roles){
          this.roles = response.roles;
          this.rerender();
        }
      }, error =>{

      }
    );
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddRolUsuario(){

    this.formAddRolUsuario = new FormGroup({
      'nombreRolUsuario': new FormControl()
      , 'descripcionRolUsuario': new FormControl()
    });

  }

  initFormUpdateRolUsuario(){

    this.formUpdateRolUsuario = new FormGroup({
      'nombreRolUsuario': new FormControl()
      , 'descripcionRolUsuario': new FormControl()
    });
  }

  getValuesFormAddRolUsuario(){

    this.rol.NombreRol = this.formAddRolUsuario.value.nombreRol;
    this.rol.DescripcionRol = this.formAddRolUsuario.value.descripcionRol;

  }

  getValuesFormUpdateRolUsuario(){

    this.rol.NombreRol= this.formUpdateRolUsuario.value.nombreRol;
    this.rol.DescripcionRol = this.formUpdateRolUsuario.value.descripcionRol;
  }

  showModalUpdateRolUsuario(rol){

    $('#modalUpdateRolUsuario').modal('show');
    let RolUsuario : RolUsuario;
     RolUsuario = rol;

    this.rol.IdRol  = RolUsuario.IdRol;

    this.formUpdateRolUsuario.reset();
    this.formUpdateRolUsuario.setValue({
      nombreRol: RolUsuario.NombreRol
      , descripcionRol: RolUsuario.DescripcionRol
    });


  }

  createRolUsuario(){
    this.getValuesFormAddRolUsuario();

    this._RolusuarioService.createRolUsuario(this.rol).subscribe(
      response => {

        if (response.IdRol) {

          swal(
            'Rol',
            'El Rol ha sido creado exitosamente!',
            'success'
          ).then(() => {
            $('#modalAddRol').modal('toggle');
            this.formAddRolUsuario.reset();
            this.rol = new RolUsuario(null,null,null,null,null,null);
            this.getRolRender();
          })

        } else {
          swal(
            'Error inesperado',
            'Ha ocurrido un error al insertar rol, intenta nuevamente!',
            'error'
          )
          console.log('Ha ocurrido un error en el servidor, intenta nuevamente');

        }
        this.getRol();
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

  getRolUsuario(IdRol){

    this._RolusuarioService.getRolUsuario(IdRol).subscribe(
      response => {

        if(!response.rol){

        } else {
          this.rol = response.rol;
        }
      },error => {
        console.log(<any>error);
      }
    )
  }

  getRoles(){
    this._RolusuarioService.getRoles().subscribe(
      response => {

        if(!response.roles){
          console.log('Ha ocurrido un error');
        } else {
          this.roles = response.roles;
        }
      },error => {
        console.log(<any>error);
    }
    )
  }

  updateRolUsuario(){

    this.getValuesFormUpdateRolUsuario();

    this._RolusuarioService.updateRol(RolUsuario).subscribe(
      response =>{
        if(response.success){
          swal(
            'Rol',
            'El rol ha sido actualizado exitosamente!',
            'success'
          ).then(() => {
            $('#modalUpdateRolUsuario').modal('toggle');
            this.formUpdateRolUsuario.reset();
            this.getRolRender();
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

    this.rol = new RolUsuario(null,null,null,null,null,null);

  }

  deleteRolUsuario(IdRol){

    swal({
      title: "Estas seguro(a)?",
      text: "El rol sera eliminada permanentemente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!'
    }).then((eliminar) => {
      if (eliminar) {
        this._RolusuarioService.deleteRol(IdRol).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminada!',
                'El Rol ha sido eliminada exitosamente',
                'success'
              ).then(() => {
               this.getRolRender();
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
