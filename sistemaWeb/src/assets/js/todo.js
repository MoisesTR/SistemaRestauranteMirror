$(".button-collapse").sideNav();

 //fecha
 $(document).ready(function(){
  var date = new Date();
  var currentMonth = date.getMonth();
  var currentDate = date.getDate();
  var currentYear = date.getFullYear();
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
    min: new Date(currentYear - 50 , 01, 01),
    max: new Date(currentYear, currentMonth, currentDate),
    format: 'yyyy-mm-dd'
  });
});

//productos
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


$(document).ready(function(){

  $('.dropify').dropify();
});



$(document).ready(function() {
  $('#datatables').DataTable( {
    dom: 'Bfrtip',
    buttons: [
      {
        extend:    'copyHtml5',
        text:      '<i class="fa"><img src="assets/img/icon/copiar.png" height="20"> Copiar</i>',
        titleAttr: 'Copy'
      },
      {
        extend:    'excelHtml5',
        text:      '<i class="fa"><img src="assets/img/icon/excel.png" height="20"> Excel</i>',
        titleAttr: 'Excel'
      },
      {
        extend:    'csvHtml5',
        text:      '<i class="fa"><img src="assets/img/icon/csv.png" height="20"> Csv</i>',
        titleAttr: 'CSV'
      },
      {
        extend:    'pdfHtml5',
        text:      '<i class="fa"><img src="assets/img/icon/pdf.png" height="20"> Pdf</i>',
        titleAttr: 'PDF'
      },

    ]
  } );
} );

/*$(document).ready(function () {
  $('select[name="datatables_length"]').material_select();
});*/

/*$(document).ready(function() {
  $('table.display').DataTable();
} );*/

/***** Select-2 productos *****/



//Efecto Login
new WOW().init();
