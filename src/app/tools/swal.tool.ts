import Swal from 'sweetalert2';

export class SwalTool {

  static onError(title: string, html: string = 'Ha ocurrido un error inesperado'): void {
    Swal.fire(title, html, 'error');
  }

  static onMessage(title: string, html: string, icon: string = 'success'): void {
    // @ts-ignore
    Swal.fire(title, html, icon);
  }

  static onDelete(title: string, html: string, icon: string = 'success'): void {
    // @ts-ignore
    Swal.fire(title, html, icon);
  }
}
