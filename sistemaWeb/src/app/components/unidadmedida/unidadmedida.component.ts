import { Component, OnInit, ViewChild } from '@angular/core';
import {UnidadMedida} from "../../models/UnidadMedida";
import {UnidadMedidaService} from "../../services/unidad-medida.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";
import {FormGroup, FormControl, FormArray, NgForm, Validators} from '@angular/forms';
import swal from 'sweetalert2';
import {DataTableDirective} from "angular-datatables";
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

  public formAddUnidadMediad: FormGroup;
  public formUpdateUnidadMedida: FormGroup;

tOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();


   @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _UnidadMedidaServicio : UnidadMedidaService
    ) { 
        this.unidadMedida = new UnidadMedida(null,null,null,null,null);

  }

  ngOnInit() {
    $(document).ready(function(){
      $(".selectclasificacionunidadmedida").select2({
        maximumSelectionLength: 1
      });
    });


       this._UnidadMedidaServicio.getUnidadesMedida().subscribe(
      response => {
        if(response.unidadesMedida){
          this.unidadesMedida = response.UnidadesMedida;
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

  /**Falta**/

}
