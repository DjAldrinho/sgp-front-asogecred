import { NgModule } from '@angular/core';
import { FormatTypeTransactionPipe } from './format-type-transaction.pipe';



@NgModule({
  declarations: [
    FormatTypeTransactionPipe
  ],
  exports:[
    FormatTypeTransactionPipe
  ]
})
export class PipesModule { }
