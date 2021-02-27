import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Process } from 'src/app/models/process.model';
import { Transaction } from 'src/app/models/transaction.model';
import { ProcessesService } from 'src/app/services/processes.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { SwalTool } from 'src/app/tools/swal.tool';
import { DepositProcessComponent } from '../deposit-process/deposit-process.component';

@Component({
  selector: 'app-detail-process',
  templateUrl: './detail-process.component.html',
  styleUrls: ['./detail-process.component.css']
})
export class DetailProcessComponent implements OnInit {

  public process: Process;
  private idProcess: number;
  public loading: boolean = false;
  public max: number;

  public incomes: Transaction[] = [];
  public pageIncomes: number;
  public totalIncomes: number;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private processesService: ProcessesService,
    private transactionService: TransactionsService,
    private dialog: MatDialog,) {
      this.pageIncomes = 1;
      this.totalIncomes = 0;
      this.max = 5;
    }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.idProcess = id;
      this.getProcess(id);
    });
  }

  getProcess(id: number): void {
    this.loading = true;
    this.processesService.getProcessById(id)
    .subscribe(resp => {
      this.process = resp;
      this.loading = false;
      this.getIncomes(this.pageIncomes);
    }, err => {
      this.loading = false;
      this.router.navigateByUrl(`/dashboard`)
    });
  }

  onPageIncomesChange(page): void {
    this.getIncomes(page);
  }

  getIncomes(page?: number): void {
    this.pageIncomes = page;
    if (page == null) {
      this.pageIncomes = 1;
    }
    this.transactionService.getTransactions(this.pageIncomes, this.max, null, null, 'process_payment', this.idProcess)
    .subscribe(resp => {
      this.incomes = resp.transactions;
      this.totalIncomes = resp.total;
    }, err => {
      SwalTool.onError('Error al cargar los depositos');
    });
  }

  openModalDeposit(): void {
    const dialogRef = this.dialog.open(DepositProcessComponent, {width: '50%', panelClass: 'card'});
    dialogRef.componentInstance.process = this.process;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'YES') {
        this.getIncomes(this.pageIncomes);
        this.getProcess(this.idProcess);
      }
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
