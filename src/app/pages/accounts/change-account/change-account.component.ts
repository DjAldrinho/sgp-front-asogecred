import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Account} from 'src/app/models/account.model';
import {Transaction} from 'src/app/models/transaction.model';
import {AccountsService} from 'src/app/services/accounts.service';
import {TransactionsService} from 'src/app/services/transactions.service';
import {SwalTool} from 'src/app/tools/swal.tool';
import {ModalChangeAccountComponent} from './modal-change-account/modal-change-account.component';
import {CreditsService} from '../../../services/credits.service';

@Component({
  selector: 'app-change-account',
  templateUrl: './change-account.component.html',
  styleUrls: ['./change-account.component.css']
})
export class ChangeAccountComponent implements OnInit {

  public account: Account;
  public transactions: Transaction[] = [];
  public page: number;
  public total: number;
  public max: number;
  private idAccount: number;
  public retires: any[] = [];
  public deposits: any[] = [];
  public credits: any[] = [];
  public depositsTotal: string;
  public retiresTotal: string;
  public depositsPaginate: number;
  public retiresPaginate: number;
  public creditsPaginate: number;
  public name: string;

  constructor(private router: Router,
              private creditService: CreditsService,
              private activatedRoute: ActivatedRoute,
              private accountService: AccountsService,
              private transactionService: TransactionsService,
              private dialog: MatDialog) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.idAccount = id;
      this.getAccount(id);
    });
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalChangeAccountComponent, {width: '50%', panelClass: 'card'});
    dialogRef.componentInstance.account = this.account;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'YES') {
        this.getAccount(this.idAccount);
      }
    });
  }

  getAccount(id: number): void {
    this.accountService.getAccountById(id)
      .subscribe(resp => {
        this.account = resp;
        this.retiresTotal = resp.total_retires;
        this.depositsTotal = resp.total_deposits;
        this.getDeposits(this.page);
        this.getRetires(this.page);
        this.getCredits(this.page);
        this.name = resp.name;
      }, () => {
        this.router.navigateByUrl(`/dashboard`);
      });
  }

  getDeposits(page: number): void {
    this.getTransactionsEmit(true, page, 5, 'deposit,credit_payment');
  }

  getRetires(page: number): void {
    this.getTransactionsEmit(false, page, 5, 'credit,retire,commission');
  }

  getCredits(page: number): void {
    this.creditService.getCredits(page, 5, this.account.id)
      .subscribe(resp => {
        this.credits = resp.credits;
        this.creditsPaginate = resp.total;
      }, () => {
        SwalTool.onError('Error al cargar los créditos');
      });
  }

  getTransactionsEmit(type: boolean, page?: number, max?: number, origin?: string): any {
    if (page == null) {
      page = 1;
    }
    this.transactionService.getTransactions(page, max, this.account.id, null, origin)
      .subscribe(resp => {
        if (type) {
          this.deposits = resp.transactions;
          this.depositsPaginate = resp.total;
        } else {
          this.retires = resp.transactions;
          this.retiresPaginate = resp.total;
        }
      }, () => {
        SwalTool.onError('Error al cargar las transacciones');
      });
  }

  getClassBadge(item: string): string {
    let classBadge: string;
    switch (item) {
      case 'deposit': {
        classBadge = 'badge badge-success';
        break;
      }
      case 'retire': {
        classBadge = 'badge badge-danger';
        break;
      }
      default: {
        classBadge = 'badge badge-primary';
        break;
      }
    }
    return classBadge;
  }

}
