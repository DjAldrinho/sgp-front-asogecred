import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor() {
  }

  public menu: any[] = [
    {
      id: 'dashboard',
      title: 'Inicio',
      icon: 'iconsminds-home-3',
      url: '/dashboard',
      items: []
    },
    {
      id: 'credits',
      title: 'Créditos',
      icon: 'iconsminds-wallet',
      url: '/dashboard/credits',
      items: []
    },
    {
      id: 'persons',
      title: 'Personas',
      icon: 'iconsminds-business-man-woman',
      url: '',
      items: [
        {title: 'Clientes', icon: 'simple-icon-people', url: 'clients'},
        {title: 'Abogados', icon: 'iconsminds-student-male', url: 'lawyers'}
      ]
    },
    {
      id: 'reports',
      title: 'Informes',
      icon: 'iconsminds-statistic',
      url: '/dashboard/persons',
      items: []
    },
    {
      id: 'settings',
      title: 'Ajustes',
      icon: 'iconsminds-gear',
      url: '',
      items: [
        {title: 'Asesores', icon: 'iconsminds-business-man-woman', url: 'advisers'},
        {title: 'Cuentas', icon: 'simple-icon-book-open', url: 'accounts'},
        {title: 'Pagadurias', icon: 'iconsminds-cash-register-2', url: 'payrolls'},
        {title: 'Proveedores', icon: 'simple-icon-people', url: 'suppliers'},
        {title: 'Usuarios', icon: 'iconsminds-affiliate', url: 'users'},
        {title: 'Tipos de crédito', icon: 'iconsminds-wallet', url: 'credit-types'},
        {title: 'Tipos de transacciones', icon: 'iconsminds-shuffle-3', url: 'transaction-types'}
      ]
    },
  ];
}
