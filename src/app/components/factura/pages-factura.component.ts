import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages-factura',
  templateUrl: './pages-factura.component.html',
  styleUrls: ['./pages-factura.component.scss']
})
export class PagesFacturaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    onActivate(edvent) {
        window.scroll(0, 0);
    }

}
