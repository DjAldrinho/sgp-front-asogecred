import Swal from 'sweetalert2';

export class SwalTool {

  static onError(option: string, section: string): void {
    Swal.fire(`Error al ${option} ${section}`, 'Ha ocurrido un error inesperado', 'error');
  }

  static onMessage(section: string, name: string, option: string, icon: string = 'success'): void {
    const sectionLower = section.toLowerCase();
    // @ts-ignore
    Swal.fire(`${section} ${option}`, `El ${sectionLower} ${name} fue ${option} correctamente`, icon);
  }

  static onDelete(section: string, name: string): void {
    const sectionLower = section.toLowerCase();
    Swal.fire(`${section} eliminado`, `El ${sectionLower} ${name} fue eliminado correctamente`, 'success');
  }
}
