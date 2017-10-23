import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Producto} from "../../models/Producto";
import swal from 'sweetalert2'
import {LocalDataSource} from "ng2-smart-table";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ProductoService]
})
export class ProductoComponent implements OnInit {

  public producto : Producto;
  public productos: Producto[];
  public mensaje: string

  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      comments: 'Lorem ipsum dolor sit amet, ex dolorem officiis convenire usu.',
      passed: 'Yes',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
      comments: `Vix iudico graecis in? Malis eirmod consectetuer duo ut?
                Mel an aeterno vivendum accusata, qui ne amet stet definitiones.`,
      passed: 'Yes',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
      comments: 'Mollis latine intellegebat ei usu, veri exerci intellegebat vel cu. Eu nec ferri copiosae.',
      passed: 'No',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
      comments: 'Eu sea graece corrumpit, et tation nominavi philosophia eam, veri posidonium ex mea?',
      passed: 'Yes',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
      comments: `Quo viris appellantur an, pro id eirmod oblique iuvaret,
                timeam omittam comprehensam ad eam? Eos id dico gubergren,
                cum dicant qualisque ea, id vim ferri moderatius?`,
      passed: 'No',
    },
    {
      id: 6,
      name: 'Mrs. Dennis Schulist',
      username: 'Leopoldo_Corkery',
      email: 'Karley_Dach@jasper.info',
      comments: 'Audire appareat sententiae qui no. Sed no rebum vitae quidam.',
      passed: 'No',
    },
    {
      id: 7,
      name: 'Kurtis Weissnat',
      username: 'Elwyn.Skiles',
      email: 'Telly.Hoeger@billy.biz',
      comments: `Mel dicat sanctus accusata ut! Eu sit choro vituperata,
                qui cu quod gubergren elaboraret, mollis vulputate ex cum!`,
      passed: 'Yes',
    },
    {
      id: 8,
      name: 'Nicholas Runolfsdottir V',
      username: 'Maxime_Nienow',
      email: 'Sherwood@rosamond.me',
      comments: 'Cu usu nostrum quaerendum, no eripuit sanctus democritum cum.',
      passed: 'No',
    },
    {
      id: 9,
      name: 'Glenna Reichert',
      username: 'Delphine',
      email: 'Chaim_McDermott@dana.io',
      comments: 'In iisque oporteat vix, amet volutpat constituto sit ut. Habeo suavitate vis ei.',
      passed: 'No',
    },
    {
      id: 10,
      name: 'Clementina DuBuque',
      username: 'Moriah.Stanton',
      email: 'Rey.Padberg@karina.biz',
      comments: `Lorem ipsum dolor sit amet, causae fuisset ea has, adhuc tantas interesset per id.
                 Ne vocibus persequeris has, meis lucilius ex mea, illum labores contentiones pro in?`,
      passed: 'Yes',
    },
    {
      id: 11,
      name: 'Nicholas DuBuque',
      username: 'Nicholas.Stanton',
      email: 'Rey.Padberg@rosamond.biz',
      comments: 'Lorem ipsum dolor sit amet, mea dolorum detraxit ea?',
      passed: 'No',
    },
  ];

  settings = {
    delete: {
      confirmDelete: true,
    },
    add: {
      confirmCreate: true,
    },
    edit: {
      confirmSave: true,
    },
    columns: {
      id: {
        title: 'ID',
      },
      name: {
        title: 'Full Name',
        editor: {
          type: 'completer',
          config: {
            completer: {
              data: this.data,
              searchFields: 'name',
              titleField: 'name',
              descriptionField: 'email',
            },
          },
        },
      },
      username: {
        title: 'User Name',
        type: 'html',
        editor: {
          type: 'list',
          config: {
            list: [{ value: 'Antonette', title: 'Antonette' }, { value: 'Bret', title: 'Bret' }, {
              value: '<b>Samantha</b>',
              title: 'Samantha',
            }],
          },
        },
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      comments: {
        title: 'Comments',
        editor: {
          type: 'textarea',
        },
      },
      passed: {
        title: 'Passed',
        editor: {
          type: 'checkbox',
          config: {
            true: 'Yes',
            false: 'No',
          },
        },
      },
    },
  };
  source: LocalDataSource;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService : ProductoService
  ) {
    this.source = new LocalDataSource(this.data);
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }

  private initConstructorProducto(){
    this.producto = new Producto(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  }

  ngOnInit() {

   /* $(document).ready(function () {
      $('select[name="datatables_length"]').material_select();
    });

    $(document).ready(function() {
      $('#datatables').DataTable;
    } );

    $(document).ready(function(){

      $('.dropify').dropify();
    });

    $(".selectcategoria").select2({
      maximumSelectionLength: 1
    });

    $(".selectcsubclasificación").select2({
      maximumSelectionLength: 1
    });

    $(".selectproveedor").select2({
      maximumSelectionLength: 1
    });

    $(".selectenvase").select2({
      maximumSelectionLength: 1
    });

    $(".selectempaque").select2({
      maximumSelectionLength: 1
    });

    $(".selectunidadmedida").select2({
      maximumSelectionLength: 1
    });

    $(".selectvalorunidadmedida").select2({
      maximumSelectionLength: 1
    });

    $(".selectestado").select2({
      maximumSelectionLength: 1
    });

    $(".selectcclasificacion").select2({
      maximumSelectionLength: 1
    });*/

/*    setTimeout(function () {
      $(function() {
        $('#datatableInquilino').DataTable( {
          "paging":   true,
          "ordering": true,
          "info":     true,
          "language": idioma_espanol
        } );
      } );

    },100)*/
  }

  createProducto(){

    /*this.inmueble.idTipoInmueble = $("#tipoInmueble").val();*/
    this._productoService.createProducto(this.producto).subscribe(
      response => {
        if (response) {

         this.initConstructorProducto();

        }
        else {

          /!*  this.status = 'Error al registrarme '+this.usuario.C_CORREO;*!/

        }

      },
      error => {

        console.log(error.message);
      }
    );
    this.limpiarFormulario();
  }

  getProducto(){

  }

  getProductos(){

    this._productoService.getProductos().subscribe(
      response => {
        if(!response.productos){
          console.log('Ha ocurrido un error');
        } else {
          this.productos = response.productos;
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  updateProducto(IdProducto,Producto){

  }

  deleteProducto(IdProducto){

    swal({
      title: "Estas seguro(a)?",
      text: "El Producto sera eliminado permanentemente!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    })
      .then((eliminar) => {
        if (eliminar) {
          this._productoService.deleteProducto(IdProducto).subscribe(
            response => {

              if(!response) {

              }


              swal(
                'Eliminado!',
                'El Producto ha sido eliminado exitosamente',
                'success'
              )
              this.getProductos();


            },
            error => {
              alert('Error');
            }
          );

        } else {

        }
      });

  }

  limpiarFormulario() {
    $("#tipoInmueble").select2();
    $("#tipoInmueble").val(null).trigger("change");
    $('#fecha').datepicker('setDate', null);
    $('#numeroinmueble').val('');
    $('#codpostal').val('');
    $('#descripcion').val('');
  }





}
