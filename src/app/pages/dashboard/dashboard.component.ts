import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountsService } from 'src/app/services/accounts.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public fulldata = combineLatest([
    this.accountService.getAccounts(0,0, true),
    this.transactionService.getTransactions(1, 5),
  ]).pipe(
    map((data) => {
      return {
        accounts: data[0],
        transactions: data[1],
      }
    })
  );

  constructor(private accountService: AccountsService,
    private transactionService: TransactionsService) { }

  ngOnInit(): void {
    this.fulldata
    .subscribe(resp => {
      console.log("combinados",resp);
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
