import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaProduccionComponent } from './area-produccion/area-produccion.component';
import { BodegaAreaProduccionComponent } from './bodega-area-produccion/bodega-area-produccion.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AreaProduccionComponent, BodegaAreaProduccionComponent]
})
export class ProduccionModule { }
