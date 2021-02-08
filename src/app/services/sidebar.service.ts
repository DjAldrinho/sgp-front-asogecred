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
      title: 'Dashboard',
      icon: 'dashboard',
      url: '/dashboard',
      items: []
    },
    {
      id: 'profile',
      title: 'Perfil',
      icon: 'person',
      url: 'profile',
      items: []
    },
    {
      id: 'persons',
      title: 'Personas',
      icon: 'accessibility_new',
      url: '',
      items: [
        {title: 'Clientes', icon: 'person', url: 'clients'},
        {title: 'Personas', icon: 'person', url: 'persons'},
        {title: 'Abogados', icon: 'person', url: 'lawyers'}
      ]
    }
  ];
}
