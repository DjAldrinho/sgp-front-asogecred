import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Adviser} from 'src/app/models/adviser.model';
import {Credit} from 'src/app/models/credit.model';
import {AdvisersService} from 'src/app/services/advisers.service';
import {CreditsService} from 'src/app/services/credits.service';
import {SwalTool} from 'src/app/tools/swal.tool';
import {TransactionsService} from '../../../services/transactions.service';

@Component({
  selector: 'app-detail-adviser',
  templateUrl: './detail-adviser.component.html',
  styleUrls: ['./detail-adviser.component.css']
})
export class DetailAdviserComponent implements OnInit {

  private idAdviser: number;
  public adviser: Adviser;
  public page: number;
  public total: number;
  public max: number;
  public credits: Credit[] = [];
  public transactions: any[] = [];
  public transactionsPaginate: number;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private advisersService: AdvisersService,
              private creditsService: CreditsService,
              private transactionService: TransactionsService) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.idAdviser = id;
      this.getAdviser(this.idAdviser);
      this.getTransactions(this.page);
    });
  }

  getAdviser(id: number): void {
    this.advisersService.getAdviserById(id)
      .subscribe(resp => {
        this.adviser = resp;
        this.getCredits();
      }, () => {
        this.router.navigateByUrl(`/dashboard`);
      });
  }

  getCredits(page?: number, query?: string): void {
    this.page = page;
    if (page == null) {
      this.page = 1;
    }
    this.creditsService.getCredits(this.page, this.max, this.idAdviser)
      .subscribe(resp => {
        this.credits = resp.credits;
        this.total = resp.total;
      }, () => {
        SwalTool.onError('Error al cargar los créditos');
      });
  }

  getTransactions(page: number): void {
    this.transactionService.getTransactions(page, 5, null,
      null, null, null, null, null, this.idAdviser)
      .subscribe(resp => {
        this.transactions = resp.transactions;
        this.transactionsPaginate = resp.total;
      }, () => {
        SwalTool.onError('Error al cargar las transacciones');
      });
  }

  onPageChange(page): void {
    this.getCredits(page);
  }

}
