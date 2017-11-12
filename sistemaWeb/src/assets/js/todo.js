
angular.element(document).ready(function () {
  var date = new Date();
  var currentMonth = date.getMonth();
  var currentDate = date.getDate();
  var currentYear = date.getFullYear();
 /* $(".button-collapse").sideNav();*/

  $('.datepicker').pickadate({

    monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sab'],
    today: 'Hoy',
    clear: 'Limpiar',
    close: 'Cerrar',
    closeOnSelect: false,
    closeOnClear: false,
    selectMonths: false,
    selectYears: false,
    firstDay: true,
    min: new Date(currentYear - 50 , 1, 1),
    max: new Date(currentYear, currentMonth, currentDate),
    format: 'yyyy-mm-dd'
  });

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


  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  $('.dropify').dropify();

})


/*//productos
$("#btnEliminarproductos").click(function(e) {
  e.preventDefault();
  var btn = "button";
  swal({
    title: 'Eliminar Producto',
    text: "¿Desea eliminar el Producto?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#',
    cancelButtonColor: '#',
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'No, cancelar',
    cancelButtonClass: 'waves-effect waves-light btn red white-text ',
    confirmButtonClass: 'waves-effect waves-light btn green white-text ',
    buttonsStyling: false
  }).then(function () {
    swal(
      'Eliminado',
      'El Producto ha sido eliminado.',
      'success'
    )
  }, function (dismiss) {
    if (dismiss === 'cancel') {
      swal(
        'Cancelado',
        'El Producto no ha sido eliminado :)',
        'error'
      )
    }
  })
});

//categorias
$("#btneliminarcategorias").click(function(e) {
  e.preventDefault();
  var btn = "button";
  swal({
    title: 'Eliminar Categoria',
    text: "¿Desea eliminar la Categoria?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#',
    cancelButtonColor: '#',
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'No, cancelar',
    cancelButtonClass: 'waves-effect waves-light btn red white-text ',
    confirmButtonClass: 'waves-effect waves-light btn green white-text ',
    buttonsStyling: false
  }).then(function () {
    swal(
      'Eliminado',
      'La Categoria ha sido eliminada.',
      'success'
    )
  }, function (dismiss) {
    if (dismiss === 'cancel') {
      swal(
        'Cancelado',
        'La Categoria no ha sido eliminada :)',
        'error'
      )
    }
  })
});

//Clasificacion
$("#btneliminarclasificacion").click(function(e) {
  e.preventDefault();
  var btn = "button";
  swal({
    title: 'Eliminar Clasificación',
    text: "¿Desea eliminar la Clasificación?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#',
    cancelButtonColor: '#',
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'No, cancelar',
    cancelButtonClass: 'waves-effect waves-light btn red white-text ',
    confirmButtonClass: 'waves-effect waves-light btn green white-text ',
    buttonsStyling: false
  }).then(function () {
    swal(
      'Eliminado',
      'La Clasificación ha sido eliminada.',
      'success'
    )
  }, function (dismiss) {
    if (dismiss === 'cancel') {
      swal(
        'Cancelado',
        'La Clasificación no ha sido eliminada :)',
        'error'
      )
    }
  })
});

//Sub-Clasificación
$("#btneliminarsubclasificacion").click(function(e) {
  e.preventDefault();
  var btn = "button";
  swal({
    title: 'Eliminar Sub-Clasificación',
    text: "¿Desea eliminar la Sub-Clasificación?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#',
    cancelButtonColor: '#',
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'No, cancelar',
    cancelButtonClass: 'waves-effect waves-light btn red white-text ',
    confirmButtonClass: 'waves-effect waves-light btn green white-text ',
    buttonsStyling: false
  }).then(function () {
    swal(
      'Eliminado',
      'La Sub-Clasificación ha sido eliminada.',
      'success'
    )
  }, function (dismiss) {
    if (dismiss === 'cancel') {
      swal(
        'Cancelado',
        'La Sub-Clasificación no ha sido eliminada :)',
        'error'
      )
    }
  })
});

//proveedor
$("#btneliminarproveedores").click(function(e) {
  e.preventDefault();
  var btn = "button";
  swal({
    title: 'Eliminar Proveedor',
    text: "¿Desea eliminar al Proveedor?",
    type: 'question',
    showCancelButton: true,
    confirmButtonColor: '#',
    cancelButtonColor: '#',
    confirmButtonText: 'Si, eliminar',
    cancelButtonText: 'No, cancelar',
    cancelButtonClass: 'waves-effect waves-light btn red white-text ',
    confirmButtonClass: 'waves-effect waves-light btn green white-text ',
    buttonsStyling: false
  }).then(function () {
    swal(
      'Eliminado',
      'El Proveedor ha sido eliminado.',
      'success'
    )
  }, function (dismiss) {
    if (dismiss === 'cancel') {
      swal(
        'Cancelado',
        'El Proveedor no ha sido eliminado :)',
        'error'
      )
    }
  })
});*/




/*$(document).ready(function () {
  $('select[name="datatables_length"]').material_select();
});*/

/*$(document).ready(function() {
  $('table.display').DataTable();
} );*/

/***** Select-2 productos *****/



//Efecto Login
new WOW().init();
