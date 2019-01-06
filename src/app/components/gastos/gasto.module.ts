import {NgModule} from '@angular/core';
import {SharedModule} from '@app/components/shared-module/shared.module';
import {SummaryGastosComponent} from '@app/components/gastos/summary-gastos/summary-gastos.component';
import {GastosComponent} from '@app/components/gastos/add-gasto/gastos.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
      GastosComponent
      , SummaryGastosComponent
  ]
})
export class GastoModule { }
