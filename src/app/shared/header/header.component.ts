import {Component, OnInit} from '@angular/core';
import { User } from 'src/app/models/user.model';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public user: User;

  constructor(private userService: UserService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout()
      .subscribe(resp => {
      }, (err) => {
      });
  }

  showMenu(): void {
    const body = document.querySelector('body');
    const classHtml = body.getAttribute('class');
    if (classHtml.search('main-hidden') !== -1) {
      body.setAttribute('class', 'ltr rounded menu-default menu-sub-hidden sub-hidden');
    } else {
      body.setAttribute('class', 'ltr rounded menu-default menu-sub-hidden main-hidden sub-hidden');
    }

  }

}
