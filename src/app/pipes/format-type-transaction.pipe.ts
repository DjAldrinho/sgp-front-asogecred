import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatTypeTransaction'
})
export class FormatTypeTransactionPipe implements PipeTransform {

  transform(type: string): string {

    let formatedType: string;

    switch (type) {
      case 'credit':
        formatedType = 'CRÉDITO';
        break;
      case 'deposit':
        formatedType = 'DEPÓSITO';
        break;
      case 'retire':
        formatedType = 'RETIRO';
        break;
      case 'commission':
        formatedType = 'COMISIÓN';
        break;
      case 'credit_payment':
        formatedType = 'ABONO';
        break;
      case 'process_payment':
        formatedType = 'DEPÓSITO PROCESO';
        break;
      default:
        formatedType = 'NO TIPO';
        break;
    }

    return formatedType;
  }

}
