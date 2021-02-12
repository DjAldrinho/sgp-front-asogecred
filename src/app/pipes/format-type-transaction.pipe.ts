import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTypeTransaction'
})
export class FormatTypeTransactionPipe implements PipeTransform {

  transform(type: string): string {

    let formatedType = "";

    switch (type) {
      case "credit":
        formatedType = "CREDITO";
        break;
      case "deposit":
        formatedType = "DEPOSITO";
        break;
      case "retire":
        formatedType = "RETIRO";
        break;
      default:
        formatedType = "NO TIPO";
        break;
    }

    return formatedType;
  }

}
