import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {SidebarService} from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, AfterViewInit {

  public menuItems: any[] = [];

  constructor(public sidebarService: SidebarService,
    private router: Router) {
  }
  ngAfterViewInit(): void {
    const liElements = Array.prototype.slice.call(document.getElementsByClassName("menu-item")); 
    liElements.forEach(element => {
      if(element.getAttribute('data-id') === "dashboard"){
        element.setAttribute('class', 'menu-item active');
      }else{
        element.setAttribute('class', 'menu-item');
      }
    });
  }

  ngOnInit(): void {}

  showItem(menu: any): void {

    const liElements = Array.prototype.slice.call(document.getElementsByClassName("menu-item")); 
    liElements.forEach(element => {
      if(element.getAttribute('data-id') === menu.id){
        element.setAttribute('class', 'menu-item active');
      }else{
        element.setAttribute('class', 'menu-item');
      }
    });

    const body = document.querySelector('body');
    const classHtml = body.getAttribute('class');
    if (classHtml.search('main-show-temporary') !== -1) {
      body.setAttribute('class', 'ltr rounded menu-default menu-sub-hidden sub-hidden');
    }
    if(menu.items.length === 0){
      console.log(menu.url);
      this.router.navigateByUrl(menu.url);
    }else{
      this.menuItems = menu.items; 
      if (classHtml.search('main-show-temporary') !== -1) {
        body.setAttribute('class', 'ltr rounded menu-default menu-sub-hidden sub-hidden');
      } else {
        body.setAttribute('class', 'ltr rounded menu-default menu-sub-hidden main-show-temporary sub-show-temporary sub-hidden');
      }
    }
  }

}
