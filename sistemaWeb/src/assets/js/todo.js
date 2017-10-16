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
                text:      '<i class="fa"><img src="img/icon/copiar.png" height="20"> Copiar</i>',
                titleAttr: 'Copy'
            },
            {
                extend:    'excelHtml5',
                text:      '<i class="fa"><img src="img/icon/excel.png" height="20"> Excel</i>',
                titleAttr: 'Excel'
            },
            {
                extend:    'csvHtml5',
                text:      '<i class="fa"><img src="img/icon/csv.png" height="20"> Csv</i>',
                titleAttr: 'CSV'
            },
            {
                extend:    'pdfHtml5',
                text:      '<i class="fa"><img src="img/icon/pdf.png" height="20"> Pdf</i>',
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

$(".selectcargo").select2();
