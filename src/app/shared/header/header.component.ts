import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) {
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
