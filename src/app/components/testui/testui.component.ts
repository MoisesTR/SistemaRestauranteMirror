import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ChangeDetectorRef  } from '@angular/core';
import {Proveedor} from '@app/models/Proveedor';
import {ProveedorService} from '@app/core/service.index';
import {MdbTableDirective,MdbTablePaginationComponent, MdbTableService} from "ng-uikit-pro-standard";

@Component({
  selector: 'app-testui',
  templateUrl: './testui.component.html',
  styleUrls: ['./testui.component.scss']
})
export class TestuiComponent implements OnInit, AfterViewInit{

  @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;
  @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;

  public proveedores: Proveedor[] = [];
  headElementos = ['#', 'NombRepresentante', 'Direccion', 'Email','DescProveedor'];
  public maxVisibleItems = 8;
  buscarTexto: string = '';
  previo: string

  @HostListener('input') oninput() {
    this.mdbTablePagination.searchText = this.buscarTexto;
    this.buscarItems();
  }

  constructor(private _proveedorService:ProveedorService,
              private cdRef: ChangeDetectorRef,
              private tableService: MdbTableService) { }

  ngOnInit() {
    this.getProveedores();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(2);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  getProveedores(){
    this._proveedorService.getProveedores(1).subscribe(response => {
      if(response.proveedores){
        this.proveedores = response.proveedores
      }
    
    this.mdbTable.setDataSource(this.proveedores);
    this.proveedores = this.mdbTable.getDataSource();
    this.previo = this.mdbTable.getDataSource();
    });    
  }


  buscarItems() {
    const prev = this.mdbTable.getDataSource();

    if (!this.buscarTexto) {
      this.mdbTable.setDataSource(this.previo);
      this.proveedores = this.mdbTable.getDataSource();
    }

    if (this.buscarTexto) {
      this.proveedores = this.mdbTable.searchLocalDataBy(this.buscarTexto);
      this.mdbTable.setDataSource(prev);
    }
}



}
