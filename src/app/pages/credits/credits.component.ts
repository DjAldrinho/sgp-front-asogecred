import {Component, OnInit} from '@angular/core';
import {Credit} from 'src/app/models/credit.model';
import {CreditsService} from 'src/app/services/credits.service';
import {SwalTool} from 'src/app/tools/swal.tool';
import {Client} from '../../models/client.model';
import {Account} from '../../models/account.model';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {AccountsService} from '../../services/accounts.service';
import {ClientsService} from '../../services/clients.service';
import {AdvisersService} from '../../services/advisers.service';
import Swal from 'sweetalert2';
import {Adviser} from '../../models/adviser.model';
import {ReportsService} from '../../services/reports.service';
import {BlobService} from '../../services/blob.service';
import {ActivatedRoute} from '@angular/router';
// @ts-ignore
import moment = require('moment');

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  public accounts: Account[] = [];
  public advisers: Adviser[] = [];
  public credits: Credit[] = [];
  public clients: Client[] = [];
  public secondCoDebtors: Client[] = [];
  public firstCoDebtors: Client[] = [];
  public searchCreditForm: FormGroup;
  public states: any[];
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
              private reportService: ReportsService,
              private blobService: BlobService,
              private fb: FormBuilder) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.initFormSearch();
    this.route.queryParams.subscribe(({dashboard}) => {
      if (dashboard !== undefined && dashboard !== null) {
        this.getCreditsDashboard(dashboard);
      } else {
        this.getCredits(this.page);
      }
    });
    this.states = [
      {id: 'A', name: 'Activo'},
      {id: 'P', name: 'Pendiente'},
      {id: 'R', name: 'Refinanciado'},
      {id: 'F', name: 'Finalizado'},
      {id: 'L', name: 'Atrasado'},
      {id: 'C', name: 'Cancelado'}
    ];

    this.getAccounts();

    this.getFormField('clientId').valueChanges.subscribe(value => {
      if (!this.getFormField('clientId').errors?.required) {
        this.getDebtors(value, 'client');
      }
    });

    this.getFormField('firstCoDebtor').valueChanges.subscribe(value => {
      if (!this.getFormField('firstCoDebtor').errors?.required) {
        this.getDebtors(value, 'first_co_debtor');
      }
    });

    this.getFormField('secondCoDebtor').valueChanges.subscribe(value => {
      if (!this.getFormField('secondCoDebtor').errors?.required) {
        this.getDebtors(value, 'second_co_debtor');
      }
    });

    this.getAdvisers();

  }

  private initFormSearch(): void {
    this.searchCreditForm = this.fb.group({
      accountId: [''],
      adviserId: [''],
      clientId: [''],
      payrollId: [''],
      stateId: [''],
      firstCoDebtor: [''],
      secondCoDebtor: [''],
      dateFinal: [''],
      dateInitial: ['']
    });
  }

  getFormField(field: string): AbstractControl {
    return this.searchCreditForm.get(field);
  }

  setFormField(field: string): void {
    this.searchCreditForm.get(field).setValue(null);
  }

  getAccounts(page?: number): void {
    this.page = page;
    if (page == null) {
      this.page = 1;
    }
    this.accountService.getAccounts(this.page, this.max, true)
      .subscribe(resp => {
        this.accounts = resp.accounts;
      }, () => {
        SwalTool.onError('Error al cargar las cuentas');
      });
  }

  getCredits(page?: number): void {
    this.page = page !== null ? page : 1;
    this.creditService.getCredits(this.page, this.max)
      .subscribe(resp => {
        this.credits = resp.credits;
        this.total = resp.total;
      }, () => {
        SwalTool.onError('Error al cargar los créditos');
      });
  }

  getCreditsDashboard(type: string): void {
    if (type === 'ofTheMonth') {
      const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
      const endOfMonth = moment().format('YYYY-MM-DD');
      this.searchCreditForm.patchValue({dateInitial: startOfMonth, dateFinal: endOfMonth});
      this.creditService.getCredits(this.page, this.max, null, null,
        null, null, null, null, null, startOfMonth, endOfMonth)
        .subscribe((resp) => {
          this.credits = resp.credits;
          this.total = resp.total;
          this.loading = false;
        }, () => {
          this.loading = false;
          SwalTool.onError('Error', 'Error al cargar los créditos del mes');
        });
    } else if (type === 'assets') {
      const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
      const endOfMonth = moment().format('YYYY-MM-DD');
      this.searchCreditForm.patchValue({dateInitial: startOfMonth, dateFinal: endOfMonth});
      this.creditService.getCredits(this.page, this.max, null, null,
        null, null, null, null, 'A', startOfMonth, endOfMonth)
        .subscribe((resp) => {
          this.credits = resp.credits;
          this.total = resp.total;
          this.loading = false;
        }, () => {
          this.loading = false;
          SwalTool.onError('Error', 'Error al cargar los créditos activos');
        });
    } else if (type === 'overdue') {
      this.creditService.getCreditsExpired(this.page, this.max)
        .subscribe((resp) => {
          this.credits = resp.credits;
          this.total = resp.total;
          this.loading = false;
        }, () => {
          this.loading = false;
          SwalTool.onError('Error', 'Error al cargar los créditos atrasados');
        });
    }
  }

  getDebtors(query: string, type: 'client' | 'first_co_debtor' | 'second_co_debtor'): void {
    this.clientsService.getClients(1, 20, query)
      .subscribe((data) => {
        switch (type) {
          case 'client':
            this.clients = data.clients;
            break;
          case 'first_co_debtor':
            this.firstCoDebtors = data.clients;
            break;
          default:
            this.secondCoDebtors = data.clients;
            break;
        }
      }, () => {
        Swal.fire('Error', 'Error buscando clientes', 'error');
      });
  }

  setItems(items: number): void {
    this.max = items;
    this.creditsFilter(this.page, true);
  }

  getAdvisers(): void {
    this.advisersService.getAdvisers(null, null, null, true)
      .subscribe((data) => {
        this.advisers = data.advisers;
      }, () => {
        Swal.fire('Error', 'Error buscando asesores', 'error');
      });
  }

  showDebtorCodebtors(debtor: Client): string | Client {
    return debtor ? `${debtor.name}`.toLowerCase() : debtor;
  }

  showAccounts(account: Account): string | Account {
    return account ? `${account.name}`.toLowerCase() : account;
  }

  showAdvisers(adviser: Adviser): string | Adviser {
    return adviser ? `${adviser.name}`.toLowerCase() : adviser;
  }

  showStates(state: any): string | any {
    return state ? `${state.name}`.toLowerCase() : state;
  }

  onPageChange(page): void {
    this.creditsFilter(page, true);
  }

  cleanFilter(): void {
    this.setFormField('accountId');
    this.setFormField('adviserId');
    this.setFormField('clientId');
    this.setFormField('stateId');
    this.setFormField('firstCoDebtor');
    this.setFormField('secondCoDebtor');
    this.setFormField('dateInitial');
    this.setFormField('dateFinal');
    this.creditsFilter(this.page, true);
  }

  creditsFilter(page?: number, credits?: boolean): void {
    if (this.searchCreditForm.valid) {
      this.page = page ?? null;
      const accountId = this.getFormField('accountId').value
        ? this.getFormField('accountId').value.id
        : null;
      const adviserId = this.getFormField('adviserId').value
        ? this.getFormField('adviserId').value.id
        : null;
      const clientId = this.getFormField('clientId').value
        ? this.getFormField('clientId').value.id
        : null;
      let stateId = this.getFormField('stateId').value
        ? this.getFormField('stateId').value.id
        : null;
      const firstCoDebtor = this.getFormField('firstCoDebtor').value
        ? this.getFormField('firstCoDebtor').value.id
        : null;
      const secondCoDebtor = this.getFormField('secondCoDebtor').value
        ? this.getFormField('secondCoDebtor').value.id
        : null;
      const dateInitial = this.getFormField('dateInitial').value
        ? this.getFormField('dateInitial').value
        : null;
      const dateFinal = this.getFormField('dateFinal').value
        ? this.getFormField('dateFinal').value
        : null;
      let refinanced = null;
      let expired = false;
      if (stateId !== null) {
        if (stateId === 'R') {
          refinanced = true;
          stateId = null;
        } else if (stateId === 'L') {
          expired = true;
        }
      }
      this.loading = true;

      if (!expired) {
        this.creditService.getCredits(this.page, this.max, accountId, clientId,
          firstCoDebtor, secondCoDebtor, adviserId, null, stateId, dateInitial, dateFinal, refinanced)
          .subscribe((resp) => {
            this.credits = resp.credits;
            this.total = resp.total;
            this.loading = false;
          }, () => {
            this.loading = false;
            SwalTool.onError('Error', 'Error al filtrar los créditos');
          });
      } else {
        this.creditService.getCreditsExpired(this.page, this.max, accountId, clientId,
          firstCoDebtor, secondCoDebtor, dateInitial, dateFinal)
          .subscribe((resp) => {
            this.credits = resp.credits;
            this.total = resp.total;
            this.loading = false;
          }, () => {
            this.loading = false;
            SwalTool.onError('Error', 'Error al filtrar los créditos');
          });
      }

    } else {
      if (credits) {
        this.getCredits(page);
      }
    }
  }

  getReport(type: string = 'pdf'): void {
    if (this.searchCreditForm.valid) {
      if (type === 'pdf') {
        this.pdfText = 'Descargando...';
        this.pdfLoading = true;
      } else {
        this.excelText = 'Descargando...';
        this.excelLoading = true;
      }
      const accountId = this.getFormField('accountId').value
        ? this.getFormField('accountId').value.id
        : null;
      const adviserId = this.getFormField('adviserId').value
        ? this.getFormField('adviserId').value.id
        : null;
      const clientId = this.getFormField('clientId').value
        ? this.getFormField('clientId').value.id
        : null;
      let stateId = this.getFormField('stateId').value
        ? this.getFormField('stateId').value.id
        : null;
      const firstCoDebtor = this.getFormField('firstCoDebtor').value
        ? this.getFormField('firstCoDebtor').value.id
        : null;
      const secondCoDebtor = this.getFormField('secondCoDebtor').value
        ? this.getFormField('secondCoDebtor').value.id
        : null;
      const dateInitial = this.getFormField('dateInitial').value
        ? this.getFormField('dateInitial').value
        : null;
      const dateFinal = this.getFormField('dateFinal').value
        ? this.getFormField('dateFinal').value
        : null;
      let refinanced = null;
      if (stateId !== null && stateId === 'R') {
        refinanced = true;
        stateId = null;
      }

      const route = this.reportService.credits(type, this.page, this.max, accountId, clientId,
        firstCoDebtor, secondCoDebtor, adviserId, null, stateId, dateInitial, dateFinal, refinanced);

      const fileType = type === 'pdf' ? type : 'xlsx';
      this.blobService.getFile(route, `reporte-creditos.${fileType}`, true)
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
