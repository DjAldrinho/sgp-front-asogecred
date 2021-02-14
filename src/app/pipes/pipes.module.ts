import {NgModule} from '@angular/core';
import {FormatTypeTransactionPipe} from './format-type-transaction.pipe';
import { FormatStatusPipe } from './format-status.pipe';


@NgModule({
  declarations: [
    FormatTypeTransactionPipe,
    FormatStatusPipe
  ],
  exports: [
    FormatTypeTransactionPipe,
    FormatStatusPipe
  ]
})
export class PipesModule {
}
