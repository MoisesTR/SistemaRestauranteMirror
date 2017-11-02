import { Component, OnInit, ViewChild } from '@angular/core';
import {ClasificacionProductoService} from '../../services/clasificacion-producto.service';
import {ActivatedRoute, Router} from "@angular/router";
import {ClasificacionProducto} from "../../models/ClasificacionProducto";
import { Subject } from 'rxjs/Rx';
import {idioma_espanol} from "../../services/global";
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-clasificacion-producto',
  templateUrl: './clasificacion-producto.component.html',
  styleUrls: ['./clasificacion-producto.component.css'],
  providers: [ClasificacionProductoService]
})
export class ClasificacionProductoComponent implements OnInit {

  @ViewChild('formClasificacion') formClasificacion: NgForm;
  public clasificacion : ClasificacionProducto;
  public clasificaciones: ClasificacionProducto[];

  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _clasificacionService : ClasificacionProductoService
  ) {
    this.initConstructorClasificacion();
  }

  ngOnInit() {


    this.dtOptions = {
      pagingType: 'full_numbers'
      , pageLength: 10
      , language: idioma_espanol
      /*,select: true*/
    };

    this._clasificacionService.getClasificaciones().subscribe(
      response => {
        if(response.clasificaciones){
          this.clasificaciones = response.clasificaciones;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );

  }

  private initConstructorClasificacion() {
    this.clasificacion = new ClasificacionProducto(null,null,null,null);
  }

  createClasificacion(myForm: NgForm){


    this.clasificacion.DescripcionClasificacion = this.formClasificacion.value.descripcion;
    this.clasificacion.NombreClasificacion = this.formClasificacion.value.nombre;
    this.formClasificacion.reset;

    this._clasificacionService.createClasificacionProducto(this.clasificacion).subscribe(
      response =>{

        if(response.IdClasificacion){
          console.log('Creado con exito');
        }
      },
      error=>{

      }
    )

    console.log(this.clasificacion.DescripcionClasificacion + this.clasificacion.NombreClasificacion);



  }

  getClasificacion(){

  }

  getClasificaciones(){

  }

  updateClasificacion(){

  }

  deleteClasificacion(){

  }

}
