import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(".selectcargo").select2();

    $(document).ready(function(){

      $('.dropify').dropify();
    });
  }

}
