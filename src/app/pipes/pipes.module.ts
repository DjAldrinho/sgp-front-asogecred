import {NgModule} from '@angular/core';
import {FormatTypeTransactionPipe} from './format-type-transaction.pipe';
import {FormatStatusPipe} from './format-status.pipe';
import {FormatDocumentTypePipe} from './format-document-type.pipe';
import {FormatClientTypePipe} from './format-client-type.pipe';


@NgModule({
  declarations: [
    FormatTypeTransactionPipe,
    FormatStatusPipe,
    FormatDocumentTypePipe,
    FormatClientTypePipe
  ],
  exports: [
    FormatTypeTransactionPipe,
    FormatStatusPipe,
    FormatDocumentTypePipe,
    FormatClientTypePipe
  ]
})
export class PipesModule {
}
