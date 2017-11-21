import {Component, OnInit, ViewChild} from '@angular/core';
declare var $:any;
declare var jQuery:any;
import swal from 'sweetalert2'
declare var $:any;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public rol : string = 'normal';

  constructor() { }

  ngOnInit() {

    window.onscroll = function () {
      if (pageYOffset >= 200) {
        document.getElementById('backToTop').style.visibility = "visible";
      } else {
        document.getElementById('backToTop').style.visibility = "hidden";
      }
    };

  }
}
