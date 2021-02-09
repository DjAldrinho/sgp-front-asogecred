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
      title: 'Creditos',
      icon: 'iconsminds-wallet',
      url: '/dashboard/persons',
      items: []
    },
    {
      id: 'persons',
      title: 'Personas',
      icon: 'iconsminds-business-man-woman',
      url: '/dashboard/persons',
      items: [
        {title: 'Clientes', icon: 'simple-icon-people', url: 'clients'},
        {title: 'Personas', icon: 'iconsminds-conference', url: 'persons'},
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
      url: '/dashboard/settings',
      items: []
    },
  ];
}
