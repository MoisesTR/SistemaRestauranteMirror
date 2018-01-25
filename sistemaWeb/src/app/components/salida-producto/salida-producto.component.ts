import {Component, OnInit} from '@angular/core';

declare var $:any

@Component({
  selector: 'app-salida-producto',
  templateUrl: './salida-producto.component.html',
  styleUrls: ['./salida-producto.component.css']
})
export class SalidaProductoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function(){

      $('#horaSalida').pickatime({
        twelvehour: true
        , default: 'now'
      });

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
  }

}
