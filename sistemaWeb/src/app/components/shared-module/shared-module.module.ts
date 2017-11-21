import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShowErrorsComponent} from "../show-errors.component";

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ShowErrorsComponent],
  declarations: [ShowErrorsComponent]
})
export class SharedModuleModule { }
