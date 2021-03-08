import {Component, OnInit} from '@angular/core';
import {Account} from '../../models/account.model';
import {Adviser} from '../../models/adviser.model';
import {Client} from '../../models/client.model';
import {Process} from '../../models/process.model';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AccountsService} from '../../services/accounts.service';
import {AdvisersService} from '../../services/advisers.service';
import {ClientsService} from '../../services/clients.service';
import {CreditsService} from '../../services/credits.service';
import {ReportsService} from '../../services/reports.service';
import {BlobService} from '../../services/blob.service';
import {Transaction} from '../../models/transaction.model';
import {TransactionsService} from '../../services/transactions.service';
import {SwalTool} from '../../tools/swal.tool';
import Swal from 'sweetalert2';
import {ProcessesService} from '../../services/processes.service';
import {Credit} from '../../models/credit.model';
import {User} from '../../models/user.model';
import {UsersService} from '../../services/users.service';
import {TransactionTypeService} from '../../services/transaction-types.service';
import {TransactionType} from '../../models/transaction-type.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  public accounts: Account[] = [];
  public advisers: Adviser[] = [];
  public transactions: Transaction[] = [];
  public transactionTypes: TransactionType[] = [];
  public clients: Client[] = [];
  public credits: Credit[] = [];
  public origins: any[];
  public processes: Process[] = [];
  public users: User[] = [];
  public searchTransactionForm: FormGroup;
  public loading = false;
  public pdfText = 'Exportar PDF';
  public pdfLoading = false;
  public excelText = 'Exportar EXCEL';
  public excelLoading = false;
  public valueFilter = false;

  public page: number;
  public total: number;
  public max: number;

  constructor(private route: ActivatedRoute,
              private accountService: AccountsService,
              private advisersService: AdvisersService,
              private clientsService: ClientsService,
              private creditService: CreditsService,
              private processesService: ProcessesService,
              private reportService: ReportsService,
              private transactionsService: TransactionsService,
              private transactionTypesService: TransactionTypeService,
              private userService: UsersService,
              private blobService: BlobService,
              private fb: FormBuilder) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.initFormSearch();
    this.origins = [
      {id: 'credit', name: 'Crédito'},
      {id: 'deposit', name: 'Depósito'},
      {id: 'retire', name: 'Retiro'},
      {id: 'commission', name: 'Comisión'},
      {id: 'credit_payment', name: 'Abono'},
      {id: 'process_payment', name: 'Depósito proceso'}
    ];
    this.getDebtors();
    this.getCredits();
    this.getProcesses();
    this.getAdvisers();
    this.getUsers();
    this.getAccounts();
    this.getTransactionTypes();
    this.getTransactions(this.page);

  }

  private initFormSearch(): void {
    this.searchTransactionForm = this.fb.group({
      accountId: [''],
      adviserId: [''],
      clientId: [''],
      userId: [''],
      creditId: [''],
      originId: [''],
      processId: [''],
      transactionTypeId: [''],
      dateFinal: [''],
      dateInitial: ['']
    });
  }

  getFormField(field: string): AbstractControl {
    return this.searchTransactionForm.get(field);
  }

  setFormField(field: string): void {
    this.searchTransactionForm.get(field).setValue(null);
  }

  getProcesses(): void {
    this.processesService.getProcesses(null, null, null, true)
      .subscribe(resp => {
        this.processes = resp.processes;
      }, () => {
        SwalTool.onError('Error al cargar los procesos');
      });
  }

  getUsers(): void {
    this.userService.getUsers(null, null, true)
      .subscribe(resp => {
        this.users = resp.users;
      }, () => {
        SwalTool.onError('Error al cargar los usuarios');
      });
  }

  getTransactionTypes(): void {
    this.transactionTypesService.getTransactionTypes(null, null, true)
      .subscribe(resp => {
        this.transactionTypes = resp.transactionTypes;
      }, () => {
        SwalTool.onError('Error al cargar los tipos de transacciones');
      });
  }

  getCredits(): void {
    this.creditService.getCredits(null, null, null,
      null, null, null, null, true)
      .subscribe(resp => {
        this.credits = resp.credits;
      }, () => {
        SwalTool.onError('Error al cargar los créditos');
      });
  }

  getAccounts(): void {
    this.accountService.getAccounts(null, null, true)
      .subscribe(resp => {
        this.accounts = resp.accounts;
      }, () => {
        SwalTool.onError('Error al cargar las cuentas');
      });
  }

  setItems(items: number): void {
    this.max = items;
    this.transactionsFilter(this.page, true);
  }

  getDebtors(): void {
    this.clientsService.getClients(null, null, null, true)
      .subscribe((data) => {
        this.clients = data.clients;
      }, () => {
        Swal.fire('Error', 'Error buscando clientes', 'error');
      });
  }

  getAdvisers(): void {
    this.advisersService.getAdvisers(null, null, null, true)
      .subscribe((data) => {
        this.advisers = data.advisers;
      }, () => {
        Swal.fire('Error', 'Error buscando asesores', 'error');
      });
  }

  getTransactions(page?: number): void {
    this.page = page !== null ? page : 1;
    this.transactionsService.getTransactions(this.page, this.max)
      .subscribe(resp => {
        this.transactions = resp.transactions;
        this.total = resp.total;
      }, () => {
        SwalTool.onError('Error al cargar las transacciones');
      });
  }

  showDebtorCodebtors(debtor: Client): string | Client {
    return debtor ? `${debtor.name}`.toLowerCase() : debtor;
  }

  showProcesses(process: Process): string | Process {
    return process ? `${process.code}`.toLowerCase() : process;
  }

  showUsers(user: User): string | User {
    return user ? `${user.name}`.toLowerCase() : user;
  }

  showCredits(credit: Credit): string | Credit {
    return credit ? `${credit.code}`.toLowerCase() : credit;
  }

  showAccounts(account: Account): string | Account {
    return account ? `${account.name}`.toLowerCase() : account;
  }

  showAdvisers(adviser: Adviser): string | Adviser {
    return adviser ? `${adviser.name}`.toLowerCase() : adviser;
  }

  showOrigins(origin: any): string | any {
    return origin ? `${origin.name}`.toLowerCase() : origin;
  }

  onPageChange(page): void {
    this.transactionsFilter(page, true);
  }

  cleanFilter(page: number): void {
    this.page = page;
    this.setFormField('accountId');
    this.setFormField('originId');
    this.setFormField('adviserId');
    this.setFormField('clientId');
    this.setFormField('userId');
    this.setFormField('processId');
    this.setFormField('creditId');
    this.setFormField('transactionTypeId');
    this.setFormField('dateInitial');
    this.setFormField('dateFinal');
    this.getTransactions(page);
  }

  transactionsFilter(page?: number, transactions?: boolean): void {
    if (page !== null) {
      this.page = page;
    }
    if (this.searchTransactionForm.valid) {
      const originId = this.getFormField('originId').value
        ? this.getFormField('originId').value.id
        : null;
      const accountId = this.getFormField('accountId').value
        ? this.getFormField('accountId').value.id
        : null;
      const adviserId = this.getFormField('adviserId').value
        ? this.getFormField('adviserId').value.id
        : null;
      const clientId = this.getFormField('clientId').value
        ? this.getFormField('clientId').value.id
        : null;
      const userId = this.getFormField('userId').value
        ? this.getFormField('userId').value.id
        : null;
      const creditId = this.getFormField('creditId').value
        ? this.getFormField('creditId').value.id
        : null;
      const processId = this.getFormField('processId').value
        ? this.getFormField('processId').value.id
        : null;
      const transactionTypeId = this.getFormField('transactionTypeId').value
        ? this.getFormField('transactionTypeId').value.id
        : null;
      const dateInitial = this.getFormField('dateInitial').value
        ? this.getFormField('dateInitial').value
        : null;
      const dateFinal = this.getFormField('dateFinal').value
        ? this.getFormField('dateFinal').value
        : null;
      let date = null;
      if (dateInitial !== null && dateFinal !== null) {
        date = `start_date=${dateInitial}&end_date=${dateFinal}`;
      }

      this.loading = true;

      this.transactionsService.getTransactions(this.page, this.max, accountId, creditId, originId, clientId,
        userId, processId, adviserId, transactionTypeId, date)
        .subscribe((resp) => {
          this.transactions = resp.transactions;
          this.total = resp.total;
          this.loading = false;
        }, () => {
          this.loading = false;
          SwalTool.onError('Error', 'Error al filtrar las transacciones');
        });

    } else {
      if (transactions) {
        this.getTransactions();
      }
    }
  }

  getReport(type: string = 'pdf'): void {
    if (this.searchTransactionForm.valid) {
      if (type === 'pdf') {
        this.pdfText = 'Descargando...';
        this.pdfLoading = true;
      } else {
        this.excelText = 'Descargando...';
        this.excelLoading = true;
      }
      const originId = this.getFormField('originId').value
        ? this.getFormField('originId').value.id
        : null;
      const accountId = this.getFormField('accountId').value
        ? this.getFormField('accountId').value.id
        : null;
      const adviserId = this.getFormField('adviserId').value
        ? this.getFormField('adviserId').value.id
        : null;
      const clientId = this.getFormField('clientId').value
        ? this.getFormField('clientId').value.id
        : null;
      const userId = this.getFormField('userId').value
        ? this.getFormField('userId').value.id
        : null;
      const creditId = this.getFormField('creditId').value
        ? this.getFormField('creditId').value.id
        : null;
      const processId = this.getFormField('processId').value
        ? this.getFormField('processId').value.id
        : null;
      const transactionTypeId = this.getFormField('transactionTypeId').value
        ? this.getFormField('transactionTypeId').value.id
        : null;
      const dateInitial = this.getFormField('dateInitial').value
        ? this.getFormField('dateInitial').value
        : null;
      const dateFinal = this.getFormField('dateFinal').value
        ? this.getFormField('dateFinal').value
        : null;
      let date = null;
      if (dateInitial !== null && dateFinal !== null) {
        date = `start_date=${dateInitial}&end_date=${dateFinal}`;
      }

      const route = this.reportService.transactions(type, this.page, this.max, accountId, creditId,
        originId, clientId, userId, processId, adviserId, date, transactionTypeId);

      const fileType = type === 'pdf' ? type : 'xlsx';
      this.blobService.getFile(route, `reporte-transactions.${fileType}`, true)
        .subscribe(() => {
          setTimeout(() => {
            if (type === 'pdf') {
              this.pdfText = 'Exportar PDF';
              this.pdfLoading = false;
            } else {
              this.excelText = 'Exportar EXCEL';
              this.excelLoading = false;
            }
          }, 500);
        }, () => {
          if (type === 'pdf') {
            this.pdfText = 'Exportar PDF';
            this.pdfLoading = false;
          } else {
            this.excelText = 'Exportar EXCEL';
            this.excelLoading = false;
          }
          SwalTool.onError('Error al descargar el reporte');
        });
    }
  }

  getClassBadge(item: string): string {
    let classBadge: string;
    switch (item) {
      case 'P': {
        classBadge = 'badge badge-warning';
        break;
      }
      case 'A': {
        classBadge = 'badge badge-success';
        break;
      }
      case 'F': {
        classBadge = 'badge badge-secondary';
        break;
      }
      case 'I': {
        classBadge = 'badge badge-danger';
        break;
      }
      case 'C': {
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
