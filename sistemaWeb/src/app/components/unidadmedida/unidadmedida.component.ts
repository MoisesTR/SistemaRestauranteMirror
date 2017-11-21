import { Component, OnInit, ViewChild } from '@angular/core';
import {UnidadMedida} from "../../models/UnidadMedida";
import {UnidadMedidaService} from "../../services/unidad-medida.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";
import {FormGroup, FormControl, FormArray, NgForm, Validators, FormBuilder} from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from "angular-datatables";
import {CustomValidators} from "../../validadores/CustomValidators";
declare var $:any;


@Component({
  selector: 'app-unidadmedida',
  templateUrl: './unidadmedida.component.html',
  styleUrls: ['./unidadmedida.component.css'],
  providers:[UnidadMedidaService]
})
export class UnidadmedidaComponent implements OnInit {

    @ViewChild('formUnidadMedida') formUnidadMedida: NgForm;


  public unidadMedida : UnidadMedida;
  public unidadesMedida : UnidadMedida[];

  public mensaje : string;

  public formUpdateUnidadMedida: FormGroup;

  tOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  formAddUnidadMedida : FormGroup;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  @ViewChild(DataTableDirective)
  dtOptions: DataTables.Settings = {};

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _UnidadMedidaServicio : UnidadMedidaService
    , private fBuilderUnidadMedida: FormBuilder
    ) {

    this.unidadMedida = new UnidadMedida(null,null,null,null,null);
  }

  ngOnInit() {
    this.dtOptions = {
      autoWidth : false
      , pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      , "lengthChange": false
      , searching: true
      , ordering:  true
    };
    $(document).ready(function(){
      $(".selectclasificacionunidadmedida").select2({
        maximumSelectionLength: 1
      });
    });

    this._UnidadMedidaServicio.getUnidadesMedida().subscribe(
      response => {
        if(response.unidadesmedida){
          this.unidadesMedida = response.unidadesmedida;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );

  }

  initFormAdd(){
    this.formAddUnidadMedida = this.fBuilderUnidadMedida.group({

      'nombreUnidadMedida': new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(100)
        , CustomValidators.espaciosVacios
      ]) ,
      'descripcionUnidadMedida': new FormControl('')
    })
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });

    }

 private initConstructorUnidadMedida() {
    this.unidadMedida = new UnidadMedida(null,null,null,null,null);
  }

  createUnidadMedida(myForm: NgForm){

    this.unidadMedida.NombreUnidad = this.formUnidadMedida.value.nombre;
    this.formUnidadMedida.reset;

    this._UnidadMedidaServicio.createUnidadMedida(this.unidadMedida).subscribe(
      response =>{

        if(response.IdUnidadMedida){
          console.log('Creado con exito');
        }
      },
      error=>{

      }
    )



  }

  getUnidaMedida(){

      this._UnidadMedidaServicio.getUnidadesMedida().subscribe(
        response => {
          if(response.unidadesMedida){
            this.unidadesMedida= response.unidadesMedida;
            this.dtTrigger.next();
          }
        }, error =>{

        }
      );
    }

    getUnidadesMedida(){
      this._UnidadMedidaServicio.getUnidadesMedida().subscribe(
        response => {
          if(response.unidadesmedida){
            this.unidadesMedida = response.unidadesmedida;
          } else {

          }
        }, error=>{

        }
      )
    }

    showModalUpdate(){

    }

    deleteUnidadMedida(){

    }

  /**Falta**/

}
