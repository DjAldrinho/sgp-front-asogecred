import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/models/account.model';
import { Transaction } from 'src/app/models/transaction.model';
import { AccountsService } from 'src/app/services/accounts.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { SwalTool } from 'src/app/tools/swal.tool';

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

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountsService,
    private transactionService: TransactionsService,) {
      this.page = 1;
      this.total = 0;
      this.max = 10;
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => this.getAccount(id))
  }


  getAccount(id: number): void {
    this.accountService.getAccountById(id)
    .subscribe(resp => {
      this.account = resp;
      this.getTransactions(this.page);
    }, err => {
      this.router.navigateByUrl(`/dashboard`)
    });
  }

  onPageChange(page): void {
    this.getTransactions(page);
  }


  getTransactions(page?: number): void{
    this.page = page;
    if (page == null) {
      this.page = 1;
    }
    this.transactionService.getTransactions(this.page, this.max, this.account.id)
    .subscribe(resp => {
      this.transactions = resp.transactions;
      this.total = resp.total;
    }, err => {
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
