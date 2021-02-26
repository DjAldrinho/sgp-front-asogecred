import {Component, OnInit} from '@angular/core';
import {ClientsService} from '../../../services/clients.service';
import {SwalTool} from '../../../tools/swal.tool';
import {ActivatedRoute} from '@angular/router';
import {Client} from '../../../models/client.model';
import {CreditsService} from '../../../services/credits.service';
import {TransactionsService} from '../../../services/transactions.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  public clientId: number;
  public client: Client;
  public page: number;
  public credits: any[] = [];
  public creditsPaginate: number;
  public creditsCoDebtor: any[] = [];
  public creditsCoDebtorPaginate: number;
  public creditsSecondDebtor: any[] = [];
  public creditsSecondDebtorPaginate: number;
  public lastTransactions: any[] = [];
  public lastTransactionsPaginate: number;

  constructor(private activatedRoute: ActivatedRoute,
              private clientService: ClientsService,
              private creditService: CreditsService,
              private transactionService: TransactionsService) {
    this.page = 1;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.clientId = id;
      this.getClient(id);
    });
  }

  getClient(id: number): void {
    this.clientService.getClient(id)
      .subscribe(({client}) => {
        this.client = client;
        this.getCredits(this.page);
        this.getCreditsCoDebtor(this.page);
        this.getCreditsSecondCoDebtor(this.page);
        this.getLastTransactions(this.page);
      }, () => {
        SwalTool.onError('Error', 'No se pudo traer la información del cliente');
      });
  }

  getCredits(page: number): void {
    this.creditService.getCredits(page, 5, null, this.client.id)
      .subscribe(resp => {
        this.credits = resp.credits;
        this.creditsPaginate = resp.total;
      }, () => {
        SwalTool.onError('Error al cargar los créditos');
      });
  }

  getCreditsCoDebtor(page: number): void {
    this.creditService.getCredits(page, 5, null, null, this.client.id)
      .subscribe(resp => {
        this.creditsCoDebtor = resp.credits;
        this.creditsCoDebtorPaginate = resp.total;
      }, () => {
        SwalTool.onError('Error al cargar los créditos de primer codeudor');
      });
  }

  getCreditsSecondCoDebtor(page: number): void {
    this.creditService.getCredits(page, 5, null, null, null, this.client.id)
      .subscribe(resp => {
        this.creditsSecondDebtor = resp.credits;
        this.creditsSecondDebtorPaginate = resp.total;
      }, () => {
        SwalTool.onError('Error al cargar los créditos de segundo codeudor');
      });
  }

  getLastTransactions(page: number): void {
    this.transactionService.getTransactions(page, 5, null, null, null, this.client.id)
      .subscribe(resp => {
        this.lastTransactions = resp.transactions;
        this.lastTransactionsPaginate = resp.total;
      }, () => {
        SwalTool.onError('Error al cargar las transacciones');
      });
  }

}
