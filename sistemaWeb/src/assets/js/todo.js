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

$(document).ready(function () {
  $('select[name="datatables_length"]').material_select();
});

$(document).ready(function() {
  $('table.display').DataTable();
} );

/***** Select-2 productos *****/

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

$(".selectclasificacion").select2({
  maximumSelectionLength: 1
});

$(".selectestado").select2({
  maximumSelectionLength: 1
});

$(".selectvalorunidadmedida").select2({
  maximumSelectionLength: 1
});

$(".selectcargo").select2();

//Efecto Login
new WOW().init();
