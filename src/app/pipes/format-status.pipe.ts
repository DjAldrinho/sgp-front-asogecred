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
      case 'P':
        formatedStatus = 'PENDIENTE';
        break;
      case 'F':
        formatedStatus = 'FINALIZADO';
        break;
      case 'C':
        formatedStatus = 'RECHAZADO';
        break;
      default:
        formatedStatus = 'SIN ESTADO';
        break;
    }

    return formatedStatus;
  }

}
