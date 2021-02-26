import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TypeModal} from 'src/app/enums/modals.enum';
import {Account} from 'src/app/models/account.model';
import {AccountsService} from 'src/app/services/accounts.service';
import {SwalTool} from 'src/app/tools/swal.tool';
import Swal from 'sweetalert2';
import {AddEditAccountComponent} from './add-edit-account/add-edit-account.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  public accounts: Account[] = [];

  public page: number;
  public total: number;
  public max: number;

  constructor(private accountService: AccountsService,
              private dialog: MatDialog) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(page?: number, query?: string): void {
    this.page = page;
    if (page == null) {
      this.page = 1;
    }
    this.accountService.getAccounts(this.page, this.max)
      .subscribe(resp => {
        this.accounts = resp.accounts;
        this.total = resp.total;
      }, err => {
        SwalTool.onError('Error al cargar las cuentas');
      });
  }

  onPageChange(page): void {
    this.getAccounts(page);
  }

  openModal(typeModal: string, account?: Account): void {
    const dialogRef = this.dialog.open(AddEditAccountComponent, {width: '50%', panelClass: 'card'});
    switch (typeModal) {
      case 'C':
        dialogRef.componentInstance.title = 'Agregar cuenta';
        dialogRef.componentInstance.type = TypeModal.CREATE;
        break;
      case 'E':
        dialogRef.componentInstance.title = 'Actualizar cuenta';
        dialogRef.componentInstance.type = TypeModal.EDIT;
        dialogRef.componentInstance.account = account;
        break;
      default:
        dialogRef.componentInstance.title = 'Ver cuenta';
        dialogRef.componentInstance.type = TypeModal.SHOW;
        dialogRef.componentInstance.account = account;
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'YES') {
        this.getAccounts(this.page);
      }
    });
  }

  deleteAccount(account: Account): void {
    Swal.fire({
      title: '¿Borrar cuenta?',
      text: `Está apunto de borrar la cuenta ${account.name} ${account.account_number}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.accountService.deleteAccount(account)
          .subscribe(resp => {
            this.getAccounts(this.page);
            SwalTool.onMessage('Cuenta eliminada', `La cuenta ${account.name} ${account.account_number} fue eliminada correctamente`);
          }, err => {
            SwalTool.onError('Error al eliminar la cuenta');
          });
      }
    });
  }

  getClassBadge(item: string): string {
    let classBadge: string;
    switch (item) {
      case 'A': {
        classBadge = 'badge badge-success';
        break;
      }
      default: {
        classBadge = 'badge badge-danger';
        break;
      }
    }
    return classBadge;
  }

}
