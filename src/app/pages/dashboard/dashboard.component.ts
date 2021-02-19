import {Component, OnInit} from '@angular/core';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {Credit} from 'src/app/models/credit.model';
import { Dashboard } from 'src/app/models/dashboard.model';
import {Transaction} from 'src/app/models/transaction.model';
import {AccountsService} from 'src/app/services/accounts.service';
import {CreditsService} from 'src/app/services/credits.service';
import { DashboardService } from 'src/app/services/dashboard.service';
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
  public dashboard: Dashboard = new Dashboard("","0","0","0",0,0,0,0,0);

  public fulldata = combineLatest([
    this.transactionService.getTransactions(1, 5),
    this.creditsService.getCredits(1, 5),
    this.dashboardService.getDataDashboard()
  ]).pipe(
    map((data) => {
      return {
        transactions: data[0],
        credits: data[1],
        data_dashboard: data[2]
      };
    })
  );

  constructor(private accountService: AccountsService,
              private transactionService: TransactionsService,
              private creditsService: CreditsService,
              private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.fulldata
      .subscribe(resp => {
        this.transactions = resp.transactions.transactions;
        this.credits = resp.credits.credits;
        this.dashboard = resp.data_dashboard;
      }, err => {
        console.log(err);
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
