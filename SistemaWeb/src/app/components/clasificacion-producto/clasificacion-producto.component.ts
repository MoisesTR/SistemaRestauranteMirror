import {Component, OnInit, ViewChild} from '@angular/core';
import {ClasificacionProductoService} from '../../services/clasificacion-producto.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClasificacionProducto} from '../../models/ClasificacionProducto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Rx';
import swal from 'sweetalert2';
import {DataTableDirective} from 'angular-datatables';
import {idioma_espanol} from '../../services/global';
import {CustomValidators} from '../../validadores/CustomValidators';
import {Utilidades} from '../Utilidades';
import {ModalDirective} from '../../typescripts/free/modals';
import {CategoriaProductoService} from '../../services/categoria-producto.service';
import {CategoriaProducto} from '../../models/CategoriaProducto';
import {isNull} from 'util';

declare var $:any;

@Component({
  selector: 'app-clasificacion-producto',
  templateUrl: './clasificacion-producto.component.html',
  styleUrls: ['./clasificacion-producto.component.css'],
  providers: [ClasificacionProductoService]
})
export class ClasificacionProductoComponent implements OnInit, InvocarFormulario {

  public clasificacion : ClasificacionProducto;
  public clasificaciones: ClasificacionProducto[];

  public formAddClasificacion: FormGroup;
  public formUpdateClasificacion: FormGroup;
  public categorias : CategoriaProducto[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild('modalAddClasificacion') modalAddClasificacion : ModalDirective;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  public tituloPantalla : string = 'Clasificación';

  constructor(
    private _route: ActivatedRoute
    , private _router: Router
    , private _clasificacionService : ClasificacionProductoService
    , private _categoriaService : CategoriaProductoService
    , private formBuilderClasificacion : FormBuilder
  ) {
      this.clasificacion = new ClasificacionProducto();
  }

  ngOnInit() {

    this.settingsDatatable();

    this._clasificacionService.getClasificaciones().subscribe(
      response => {
        if(response.clasificaciones){
          this.clasificaciones = response.clasificaciones;
          this.dtTrigger.next();
        }
      }, error =>{

      }
    );

    this.initFormAddClasificacion();
    this.initFormUpdateClasificacion();
    this.getCategorias();
  }

  settingsDatatable(){

      /*PROPIEDADES GENERALES DE LA DATATABLE*/
      this.dtOptions = <DataTables.Settings>{
          pagingType: 'full_numbers'
          , pageLength: 10
          , language: idioma_espanol
          , 'lengthChange': false
          , responsive : true
          , dom: 'Bfrtip',
          buttons: [
              {
                  text: 'Agregar',
                  key: '1',
                  className: 'btn orange-chang float-right-dt',
                  action:  (e, dt, node, config) => {
                      this.InvocarModal(this.modalAddClasificacion,this.formAddClasificacion);
                  }
              }
          ]
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

  createClasificacion(){

    this.clasificacion.DescripcionClasificacion = this.formAddClasificacion.value.descripcionClasificacion;
    this.clasificacion.NombreClasificacion = this.formAddClasificacion.value.nombreClasificacion;

    this._clasificacionService.createClasificacionProducto(this.clasificacion).subscribe(
      response =>{

        if(response.IdClasificacion){
          swal(
            'Clasificación',
            'La clasificación ha sido creada exitosamente!',
            'success'
          ).then(() => {
            this.modalAddClasificacion.hide();
            this.formAddClasificacion.reset();
            this.clasificacion = new ClasificacionProducto();
            this.getClasificacionesRender();
          })
        } else {
          Utilidades.showMsgError('Ha ocurrido un error al insertar la categoria, intenta nuevamente!',this.tituloPantalla);
        }
      },
      error=>{
        Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
      }
    )
  }

  getClasificacionesRender(){
    this._clasificacionService.getClasificaciones().subscribe(
      response => {
        if(response.clasificaciones){
          this.clasificaciones = response.clasificaciones;
          this.rerender();
        }
      }, error =>{

      }
    );
  }

  /*INICIALIZAR VALORES DEL FORMULARIO REACTIVO*/
  initFormAddClasificacion(){

    this.formAddClasificacion = this.formBuilderClasificacion.group({
      'nombreClasificacion': new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(100)
        , CustomValidators.espaciosVacios
      ])
      , 'descripcionClasificacion': new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(300)
        , CustomValidators.espaciosVacios
      ])
      , 'categoria': new FormControl('',[
            Validators.required
        ])
    });

  }

  initFormUpdateClasificacion(){

    this.formUpdateClasificacion = this.formBuilderClasificacion.group({
      'nombreClasificacion': new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(100)
        , CustomValidators.espaciosVacios
      ])
      , 'descripcionClasificacion': new FormControl('',[
        Validators.required
        , Validators.minLength(5)
        , Validators.maxLength(300)
        , CustomValidators.espaciosVacios
      ])
      , 'categoria': new FormControl('',[
            Validators.required
        ])
    });
  }

  updateClasificacion(Modal){

    this.getValuesFormUpdateClasificacion();

    this._clasificacionService.updateClasificacionProducto(this.clasificacion).subscribe(
      response =>{
        if(response.success){
          swal(
            'Clasificación',
            'La clasificación ha sido actualizada exitosamente!',
            'success'
          ).then(() => {
            Modal.hide();
            this.formUpdateClasificacion.reset();
            this.getClasificacionesRender();
            this.clasificacion = new ClasificacionProducto();
          })

        } else {
          Utilidades.showMsgError('Ha ocurrido un error inesperado al actualizar la categoria, intenta nuevamnte!!',this.tituloPantalla);
        }
      }, error =>{
        Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
      }
    )



  }

  getCategorias() {
    this._categoriaService.getCategoriasProductos().subscribe(
        response => {
          if(response.categorias){
            this.categorias = response.categorias;
          } else {
            Utilidades.showMsgInfo('Ha ocurrido un error al cargar las categorias',this.tituloPantalla);
          }
        }, error => {
          Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
        }, () =>{

        }
    )
  }
  getValuesFormAddClasificacion(){

    this.clasificacion.NombreClasificacion = this.formAddClasificacion.value.nombreClasificacion;
    this.clasificacion.DescripcionClasificacion = this.formAddClasificacion.value.descripcionClasificacion;

  }

  getValuesFormUpdateClasificacion(){

    this.clasificacion.NombreClasificacion= this.formUpdateClasificacion.value.nombreClasificacion;
    this.clasificacion.DescripcionClasificacion = this.formUpdateClasificacion.value.descripcionClasificacion;
  }

  deleteClasificacion(IdClasificacion){

    swal({
      title: "Estas seguro(a)?",
      text: "La clasificacion sera eliminada permanentemente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminala!'
    }).catch(swal.noop).then((eliminar) => {
      if (eliminar) {
        this._clasificacionService.deleteClasificacionProducto(IdClasificacion).subscribe(
          response =>{
            if(response.success){
              swal(
                'Eliminada!',
                'La clasificacion ha sido eliminada exitosamente',
                'success'
              ).then(() => {
               this.getClasificacionesRender();
              })
            } else {
              Utilidades.showMsgInfo('Ha ocurrido un error al eliminar, intentalo nuevamente',this.tituloPantalla);
            }
          }, error =>{
            Utilidades.showMsgError(Utilidades.mensajeError(error),this.tituloPantalla);
          }
        )

      }
    });

  }

  onChangeCategoria(event) {
      if(isNull(event)){
        this.clasificacion.IdCategoria = null;
      } else {
        this.clasificacion.IdCategoria = event.IdCategoria;
      }
  }

  InvocarModal(Modal, Formulario) {
    Utilidades.invocacionModal(Modal,Formulario);
  }

  InvocarModalUpdate(Modal,Clasificacion : ClasificacionProducto){

    this.formUpdateClasificacion.reset();

    this.clasificacion.IdClasificacion = Clasificacion.IdClasificacion;
    this.clasificacion.IdCategoria = Clasificacion.IdCategoria;
    this.clasificacion.NombreClasificacion = Clasificacion.NombreClasificacion;
    this.clasificacion.DescripcionClasificacion = Clasificacion.DescripcionClasificacion;

    this.formUpdateClasificacion.controls['nombreClasificacion'].setValue(Clasificacion.NombreClasificacion);
    this.formUpdateClasificacion.controls['descripcionClasificacion'].setValue(Clasificacion.DescripcionClasificacion);

    Modal.show();

  }


}
