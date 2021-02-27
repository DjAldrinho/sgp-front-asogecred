import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TypeModal} from 'src/app/enums/modals.enum';
import {User} from 'src/app/models/user.model';
import {UsersService} from 'src/app/services/users.service';
import {SwalTool} from 'src/app/tools/swal.tool';
import {AddEditUserComponent} from './add-edit-user/add-edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: User[] = [];

  public page: number;
  public total: number;
  public max: number;

  constructor(private usersService: UsersService,
              private dialog: MatDialog,) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(page?: number, query?: string): void {
    this.page = page;
    if (page == null) {
      this.page = 1;
    }
    this.usersService.getUsers(this.page, this.max)
      .subscribe(resp => {
        this.users = resp.users;
        this.total = resp.total;
        console.log(this.users);
      }, err => {
        SwalTool.onError('Error al cargar los usuarios');
      });
  }

  onPageChange(page): void {
    this.getUsers(page);
  }

  openModal(typeModal: string, user?: User): void {
    const dialogRef = this.dialog.open(AddEditUserComponent, {width: '50%', panelClass: 'card'});
    switch (typeModal) {
      case 'C':
        dialogRef.componentInstance.title = 'Agregar usuario';
        dialogRef.componentInstance.type = TypeModal.CREATE;
        break;
      case 'E':
        dialogRef.componentInstance.title = 'Actualizar usuario';
        dialogRef.componentInstance.type = TypeModal.EDIT;
        dialogRef.componentInstance.user = user;
        break;
      default:
        dialogRef.componentInstance.title = 'Ver usuario';
        dialogRef.componentInstance.type = TypeModal.SHOW;
        dialogRef.componentInstance.user = user;
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == 'YES') {
        this.getUsers(this.page);
      }
    });
  }

  getClassBadge(item: boolean): string {
    return item ? 'badge badge-warning' : 'badge badge-primary';
  }

}
