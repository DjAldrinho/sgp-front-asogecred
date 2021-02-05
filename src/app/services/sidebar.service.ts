import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  constructor() { }

  public menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      url: '/dashboard'
    },
    {
      title: 'Perfil',
      icon: 'person',
      url: 'profile'
    },
    {
      title: 'Personas',
      icon: 'accessibility_new',
      url: 'persons'
    }
  ];
}
