$(".button-collapse").sideNav();

window.onscroll = function () {
    if (pageYOffset >= 200) {
        document.getElementById('backToTop').style.visibility = "visible";
    } else {
        document.getElementById('backToTop').style.visibility = "hidden";
    }
};

$('[data-toggle="tooltip"]').tooltip({
    trigger : 'hover'
})  

//fecha$(".letras").keypress(function (key) {
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
    min: new Date(currentYear - 50 , 1, 1),
    max: new Date(currentYear, currentMonth, currentDate),
    format: 'yyyy-mm-dd'
  });
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


//Efecto Login
new WOW().init();