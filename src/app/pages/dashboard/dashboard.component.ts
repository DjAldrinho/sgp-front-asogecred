import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Credit } from 'src/app/models/credit.model';
import { Transaction } from 'src/app/models/transaction.model';
import { AccountsService } from 'src/app/services/accounts.service';
import { CreditsService } from 'src/app/services/credits.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public transactions: Transaction[] = [];
  public credits: Credit[] = [];

  public fulldata = combineLatest([
    this.accountService.getAccounts(0,0, true),
    this.transactionService.getTransactions(1, 5),
    this.CreditsService.getCredits(1, 5),
  ]).pipe(
    map((data) => {
      return {
        accounts: data[0],
        transactions: data[1],
        credits: data[2]
      }
    })
  );

  constructor(private accountService: AccountsService,
    private transactionService: TransactionsService,
    private CreditsService: CreditsService) { }

  ngOnInit(): void {
    this.fulldata
    .subscribe(resp => {
      console.log("combinados",resp);
      this.transactions = resp.transactions.transactions;
      this.credits = resp.credits.credits;
    }, err => {
      Swal.fire('Error', "Ha ocurrido un error inesperado", 'error');
    });
  }

  getAccounts(): void {
    this.accountService.getAccounts(0, 0, true)
    .subscribe(resp => {
      console.log(resp);
    }, err => {
      Swal.fire('Error', "Ha ocurrido un error inesperado", 'error');
    });
  }

}
