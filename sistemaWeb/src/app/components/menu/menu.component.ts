import { Component, OnInit } from '@angular/core';
declare var $:any;
declare var jQuery:any;
import swal from 'sweetalert2'



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    console.log('Prueba');
  }

}
