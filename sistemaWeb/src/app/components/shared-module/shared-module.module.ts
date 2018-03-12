import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShowErrorsComponent} from "../show-errors.component";
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NG_SELECT_DEFAULT_CONFIG, NgSelectModule} from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule
    ,  NgSelectModule
  ],
  exports: [ShowErrorsComponent,NgSelectModule],
  declarations: [ShowErrorsComponent]
  , providers  : [{
    provide: NG_SELECT_DEFAULT_CONFIG,
    useValue: {
      notFoundText: 'No se encontraron resultados'
    }
  }]
})
export class SharedModuleModule { }
