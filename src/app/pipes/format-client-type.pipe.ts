import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatClientType'
})
export class FormatClientTypePipe implements PipeTransform {

  transform(type: string): string {
    let formatedType: string;

    switch (type) {
      case 'debtor':
        formatedType = 'Deudor';
        break;
      case 'co_debtor':
        formatedType = 'Codeudor';
        break;
      default:
        formatedType = 'NO TIPO';
        break;
    }

    return formatedType;
  }

}
