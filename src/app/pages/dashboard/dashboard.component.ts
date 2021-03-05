import {Component, OnInit} from '@angular/core';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {Credit} from 'src/app/models/credit.model';
import {Dashboard} from 'src/app/models/dashboard.model';
import {Transaction} from 'src/app/models/transaction.model';
import {AccountsService} from 'src/app/services/accounts.service';
import {CreditsService} from 'src/app/services/credits.service';
import {DashboardService} from 'src/app/services/dashboard.service';
import {TransactionsService} from 'src/app/services/transactions.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public transactions: Transaction[] = [];
  public credits: Credit[] = [];
  public dashboard: Dashboard = new Dashboard('', '0', '0', '0', 0, 0, 0, 0, 0);
  public dataTable: any[];

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

  constructor(private router: Router,
              private accountService: AccountsService,
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
        this.dataTable = [
          {title: 'Ingresos del mes', value: this.dashboard.total_deposit, icon: 'iconsminds-upward', money: true, type: null},
          {title: 'Egresos del mes', value: this.dashboard.total_retire, icon: 'iconsminds-downward', money: true, type: null},
          {title: 'Créditos del mes', value: this.dashboard.total_credits, icon: 'iconsminds-diploma-2', money: false, type: 'ofTheMonth'},
          {title: 'Créditos activos', value: this.dashboard.active_credits, icon: 'simple-icon-book-open', money: false, type: 'assets'},
          {title: 'Créditos atrasados', value: this.dashboard.expired_credits, icon: 'iconsminds-close', money: false, type: 'overdue'}
        ];
      }, () => {
        Swal.fire('Error', 'Ha ocurrido un error inesperado', 'error');
      });
  }

  getCredits(type?: string): void {
    if (type !== null) {
      this.router.navigate(['/credits'], {queryParams: {dashboard: type}});
    }
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
      case 'credit_payment': {
        classBadge = 'badge badge-success';
        break;
      }
      case 'commission': {
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

  getClassTitle(text: string): string {
    let classTitle: string;
    if (text.length <= 5) {
      classTitle = 'lead text-center title-lg';
    } else if (text.length > 5 && text.length <= 13) {
      classTitle = 'lead text-center title-md';
    } else if (text.length > 13) {
      classTitle = 'lead text-center title-sm';
    } else {
      classTitle = 'lead text-center title-lg';
    }
    return classTitle;
  }

}
