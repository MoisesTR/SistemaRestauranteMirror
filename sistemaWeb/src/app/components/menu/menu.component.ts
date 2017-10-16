import { Component, OnInit } from '@angular/core';
declare var $:any;
declare var jQuery:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {


  }

  ngAfterViewInit(){

    $( document ).ready(function(){
      $(".button-collapse").sideNav();
    });

  }
}
