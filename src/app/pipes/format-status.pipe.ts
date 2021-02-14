import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatStatus'
})
export class FormatStatusPipe implements PipeTransform {

  transform(value: string): string {
    let formatedStatus: string;

    switch (value) {
      case 'A':
        formatedStatus = 'ACTIVO';
        break;
      case 'I':
        formatedStatus = 'INACTIVO';
        break;
      default:
        formatedStatus = 'SIN ESTADO';
        break;
    }

    return formatedStatus;
  }

}
