import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  public year = new Date().getFullYear();

  constructor() {
  }

  ngOnInit(): void {
    const body = document.querySelector('body');
    body.removeAttribute('class');
    body.setAttribute('class', 'ltr rounded menu-default menu-sub-hidden sub-hidden');
    body.setAttribute('id', 'app-container');
  }

}
