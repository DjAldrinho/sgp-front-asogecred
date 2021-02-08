import {Component, OnInit} from '@angular/core';
import {SidebarService} from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public sidebarService: SidebarService) {
  }

  ngOnInit(): void {
  }

  showItem(itemId: string): void {
    const body = document.querySelector('body');
    const classHtml = body.getAttribute('class');
    if (classHtml.search('main-show-temporary') !== -1) {
      body.setAttribute('class', 'ltr rounded menu-default menu-sub-hidden sub-hidden');
    } else {
      const item = document.querySelector('#' + itemId);
      const style = 'display: block;';
      // @ts-ignore
      item.getAttribute('style', style);
      body.setAttribute('class', 'ltr rounded menu-default menu-sub-hidden main-show-temporary sub-show-temporary sub-hidden');
    }

  }

}
