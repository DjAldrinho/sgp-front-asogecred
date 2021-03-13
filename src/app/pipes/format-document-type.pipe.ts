import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatDocumentType'
})
export class FormatDocumentTypePipe implements PipeTransform {

  transform(type: string): string {
    let formatedType: string;

    switch (type) {
      case 'cc':
        formatedType = 'Cédula de ciudadania';
        break;
      case 'ct':
        formatedType = 'Cédula de extranjeria';
        break;
      case 'pp':
        formatedType = 'Pasaporte';
        break;
      case 'nit':
        formatedType = 'NIT';
        break;
      case 'ti':
        formatedType = 'Tarjeta de identidad';
        break;
      case 'rc':
        formatedType = 'Registro civil';
        break;
      default:
        formatedType = 'NO TIPO';
        break;
    }

    return formatedType;
  }

}
