import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumo-interno',
  templateUrl: './consumo-interno.component.html',
  styleUrls: ['./consumo-interno.component.scss']
})
export class ConsumoInternoComponent implements OnInit {

  visible: boolean = true;
// date = new Date();
// today = this.date.getDate() + '/' + (this.date.getMonth() + 1) + '/' + this.date.getFullYear();

ngOnInit() {
setTimeout(() => {
this.visible = false;
}, 3000);

}
}