import {Component, OnInit} from '@angular/core';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {Credit} from 'src/app/models/credit.model';
import {Transaction} from 'src/app/models/transaction.model';
import {AccountsService} from 'src/app/services/accounts.service';
import {CreditsService} from 'src/app/services/credits.service';
import {TransactionsService} from 'src/app/services/transactions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public transactions: Transaction[] = [];
  public credits: Credit[] = [];

  public fulldata = combineLatest([
    this.transactionService.getTransactions(1, 5),
    this.CreditsService.getCredits(1, 5),
  ]).pipe(
    map((data) => {
      return {
        transactions: data[0],
        credits: data[1]
      };
    })
  );

  constructor(private accountService: AccountsService,
              private transactionService: TransactionsService,
              // tslint:disable-next-line:no-shadowed-variable
              private CreditsService: CreditsService) {
  }

  ngOnInit(): void {
    this.fulldata
      .subscribe(resp => {
        this.transactions = resp.transactions.transactions;
        this.credits = resp.credits.credits;
      }, err => {
        Swal.fire('Error', 'Ha ocurrido un error inesperado', 'error');
      });
  }

  getAccounts(): void {
    this.accountService.getAccounts(0, 0, true)
      .subscribe(resp => {
        console.log(resp);
      }, err => {
        Swal.fire('Error', 'Ha ocurrido un error inesperado', 'error');
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
