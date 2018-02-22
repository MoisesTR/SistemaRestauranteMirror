import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShowErrorsComponent} from "../show-errors.component";
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ShowErrorsComponent],
  declarations: [ShowErrorsComponent]
})
export class SharedModuleModule { }
