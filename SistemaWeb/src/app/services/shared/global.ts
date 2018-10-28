// CLASE UTILIZADA PARA DECLARACION DE CONSTANTES DEL PROYECTO


import {IMyOptions} from 'ng-uikit-pro-standard/ng-uikit-pro-standard';

export const Global  = {
    url: 'http://192.168.1.23:3000/api/'
};

export const CARPETA_PRODUCTOS = 'productos';
export const CARPETA_USUARIOS = 'usuarios';
export const CARPETA_TRABAJADORES = 'trabajadores';
export const CARPETA_FACTURA = 'factura';

// Idioma datatable
export const idioma_espanol = {
  'sProcessing':     'Procesando...',
  'sLengthMenu':     'Mostrar _MENU_ registros',
  'sZeroRecords':    'No se encontraron resultados',
  'sEmptyTable':     'Ningún dato disponible en esta tabla',
  'sInfo':           'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
  'sInfoEmpty':      'Mostrando registros del 0 al 0 de un total de 0 registros',
  'sInfoFiltered':   '(filtrado de un total de _MAX_ registros)',
  'sInfoPostFix':    '',
  'sSearch':         '',
  'sUrl':            '',
  'sInfoThousands':  ',',
  'sLoadingRecords': 'Cargando...',
  'oPaginate': {
    'sFirst':    'Primero',
    'sLast':     'Último',
    'sNext':     'Siguiente',
    'sPrevious': 'Anterior'
  },
  'oAria': {
    'sSortAscending':  ': Activar para ordenar la columna de manera ascendente',
    'sSortDescending': ': Activar para ordenar la columna de manera descendente'
  }
};

// Configuraciones generales para los datepicker
export const opcionesDatePicker: IMyOptions = {
    // Strings and translations
    dayLabels: {su: 'Do', mo: 'Lu', tu: 'Mar', we: 'Mier', th: 'Jue', fr: 'Vier', sa: 'Sab'},
    dayLabelsFull: {su: 'Domingo', mo: 'Lunes', tu: 'Martes', we: 'Miercoles', th: 'Jueves', fr: 'Viernes', sa: 'Sabado'},
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    monthLabelsFull: { 1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril', 5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto', 9: 'Septiembre', 10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre' },

    // Buttons
    todayBtnTxt: 'Hoy',
    clearBtnTxt: 'Limpiar',
    closeBtnTxt: 'Cerrar',

    // Format
    dateFormat: 'yyyy-mm-dd',

    // First day of the week
    firstDayOfWeek: 'mo',

    // Year limits
    minYear: 1950,
    maxYear: 3000,

    // Show Today button
    showTodayBtn: true,

    // Show Clear date button
    showClearDateBtn: true,
    // Cerrar modal de selección de fecha despues de haber hecho click
    closeAfterSelect: true
};
