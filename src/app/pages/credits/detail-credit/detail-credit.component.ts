import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Credit } from 'src/app/models/credit.model';
import { Transaction } from 'src/app/models/transaction.model';
import { CreditsService } from 'src/app/services/credits.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { SwalTool } from 'src/app/tools/swal.tool';
import Swal from 'sweetalert2';
import { DepositCreditComponent } from '../deposit-credit/deposit-credit.component';
import { ModalApproveCreditComponent } from '../modal-approve-credit/modal-approve-credit.component';

@Component({
  selector: 'app-detail-credit',
  templateUrl: './detail-credit.component.html',
  styleUrls: ['./detail-credit.component.css']
})
export class DetailCreditComponent implements OnInit {

  public credit: Credit;
  private idCredit: number;
  public loading: boolean = false;
  public max: number;

  // ingresos
  public incomes: Transaction[] = [];
  public pageIncomes: number;
  public totalIncomes: number;

  // egresos
  public expenses: Transaction[] = [];
  public pageExpenses: number;
  public totalExpenses: number;

  public commentarysForm: FormGroup;
  public loadingCommentaryForm: boolean = false;


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private creditsService: CreditsService,
    private transactionService: TransactionsService,
    private dialog: MatDialog,
    private fb: FormBuilder,) {
      this.pageIncomes = 1;
      this.totalIncomes = 0;
      this.pageExpenses = 1;
      this.totalExpenses = 0;
      this.max = 10;
    }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe(({id}) => {
      this.idCredit = id;
      this.getCredit(id);
    })
  }

  private initForm(): void {
    this.commentarysForm = this.fb.group({
      commentary: ['', [Validators.required]],
    });
  }

  getFormField(field: string): AbstractControl {
    return this.commentarysForm.get(field);
  }

  addCreditCommentary(): void {
    if(this.commentarysForm.valid){
      this.loadingCommentaryForm = true;
      const commentary = this.getFormField('commentary').value;
      const addCommentary = {
        credit_id: this.credit.id,
        commentary
      }
      this.creditsService.addCommentary(addCommentary)
      .subscribe(resp => {
        this.loadingCommentaryForm = false;
        SwalTool.onMessage('Observación agregada', `La observación fue agregada satisfactoriamente`);
      }, err => {
        this.loadingCommentaryForm = false;
        SwalTool.onError('Error al agregar la observación');
      });
    }
  }


  getCredit(id: number): void {
    this.loading = true;
    this.creditsService.getCreditById(id)
    .subscribe(resp => {
      this.credit = resp;
      this.loading = false;
      this.getFormField('commentary').setValue(this.credit.commentary);
      this.getIncomes();
      this.getExpenses();
    }, err => {
      this.loading = false;
      this.router.navigateByUrl(`/dashboard`)
    });
  }

  getIncomes(page?: number): void {
    this.pageIncomes = page;
    if (page == null) {
      this.pageIncomes = 1;
    }
    this.transactionService.getTransactions(this.pageIncomes, this.max, null, this.idCredit, 'deposit,credit_payment')
    .subscribe(resp => {
      this.incomes = resp.transactions;
      this.totalIncomes = resp.total;
    }, err => {
      SwalTool.onError('Error al cargar los ingresos del crédito');
    });
  }

  onPageIncomesChange(page): void {
    this.getIncomes(page);
  }

  getExpenses(page?: number): void {
    this.pageExpenses = page;
    if (page == null) {
      this.pageExpenses = 1;
    }
    this.transactionService.getTransactions(this.pageExpenses, this.max, null, this.idCredit, 'commission,credit,retire')
    .subscribe(resp => {
      this.expenses = resp.transactions;
      this.totalExpenses = resp.total;
    }, err => {
      SwalTool.onError('Error al cargar los egresos del crédito');
    });
  }

  onPageExpensesChange(page): void {
    this.getIncomes(page);
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

  approveRejectCredit(type: 'A'|'R'){
    if(type == 'A'){
      const dialogRef = this.dialog.open(ModalApproveCreditComponent, {width: '50%', panelClass: 'card'});
      dialogRef.componentInstance.credit = this.credit;
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'YES') {
          this.getCredit(this.idCredit);
        }
      });
    }else{
      Swal.fire({
        title: '¿Está seguro?',
        text: 'Está apunto de RECHAZAR el crédito',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: `Si, rechazar`,
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.creditsService.rejectCredit(this.idCredit)
          .subscribe(resp => {
            console.log(resp);
            this.getCredit(this.idCredit);
            SwalTool.onMessage('Credito rechazado', `El crédito fue rechazado correctamente`);
          }, err => {
            SwalTool.onError('Error al rechazar el crédito');
          });
        }
      });
    }
  }

  openModalDeposit(){
    const dialogRef = this.dialog.open(DepositCreditComponent, {width: '50%', panelClass: 'card'});
    dialogRef.componentInstance.credit = this.credit;
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'YES') {
        this.getCredit(this.idCredit);
      }
    });
  }

}
