import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {

    public buscando;

    // Paginacion
    @ViewChildren('pages') pages: QueryList<any>;
    itemsPerPage = 6;
    numberOfVisiblePaginators = 10;
    numberOfPaginators: number;
    paginators: Array<any> = [];
    activePage = 1;
    firstVisibleIndex = 1;
    lastVisibleIndex: number = this.itemsPerPage;
    firstVisiblePaginator = 0;
    lastVisiblePaginator = this.numberOfVisiblePaginators;

  constructor() { }

  ngOnInit() {
  }


    changePage(event: any) {
        if (event.target.text >= 1 && event.target.text <= this.numberOfPaginators) {
            this.activePage = +event.target.text;
            this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
            this.lastVisibleIndex = this.activePage * this.itemsPerPage;
        }
    }

    nextPage(event: any) {
        if (this.pages.last.nativeElement.classList.contains('active')) {
            if (this.numberOfPaginators - this.numberOfVisiblePaginators >= this.lastVisiblePaginator) {
                this.firstVisiblePaginator += this.numberOfVisiblePaginators;
                this.lastVisiblePaginator += this.numberOfVisiblePaginators;
            } else {
                this.firstVisiblePaginator += this.numberOfVisiblePaginators;
                this.lastVisiblePaginator = this.numberOfPaginators;
            }
        }

        this.activePage += 1;
        this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
        this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    }

    previousPage(event: any) {
        if (this.pages.first.nativeElement.classList.contains('active')) {
            if (this.lastVisiblePaginator - this.firstVisiblePaginator === this.numberOfVisiblePaginators) {
                this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
                this.lastVisiblePaginator -= this.numberOfVisiblePaginators;
            } else {
                this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
                this.lastVisiblePaginator -= this.numberOfPaginators % this.numberOfVisiblePaginators;
            }
        }

        this.activePage -= 1;
        this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
        this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    }

    firstPage() {
        this.activePage = 1;
        this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
        this.lastVisibleIndex = this.activePage * this.itemsPerPage;
        this.firstVisiblePaginator = 0;
        this.lastVisiblePaginator = this.numberOfVisiblePaginators;
    }

    lastPage() {
        this.activePage = this.numberOfPaginators;
        this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
        this.lastVisibleIndex = this.activePage * this.itemsPerPage;

        if (this.numberOfPaginators % this.numberOfVisiblePaginators === 0) {
            this.firstVisiblePaginator = this.numberOfPaginators - this.numberOfVisiblePaginators;
            this.lastVisiblePaginator = this.numberOfPaginators;
        } else {
            this.lastVisiblePaginator = this.numberOfPaginators;
            this.firstVisiblePaginator =
                this.lastVisiblePaginator - (this.numberOfPaginators % this.numberOfVisiblePaginators);
        }
    }

}
