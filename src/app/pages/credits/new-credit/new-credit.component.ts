import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from 'src/app/models/account.model';
import { Liquidate } from 'src/app/models/credit.model';
import { AccountsService } from 'src/app/services/accounts.service';
import { CreditsService } from 'src/app/services/credits.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.css']
})
export class NewCreditComponent implements OnInit {

  public accounts: Account[] = [];
  public addNewCreditForm: FormGroup;
  public loading: boolean = false;

  public liquidate: Liquidate;

  public fulldata = combineLatest([
    this.accountService.getAccounts(1, 5, true),
  ]).pipe(
    map((data) => {
      return {
        accounts: data[0],
      };
    })
  );

  constructor(private accountService: AccountsService,
    private fb: FormBuilder,
    private creditService: CreditsService) { }

  ngOnInit(): void {
    this.initForm();
    this.fulldata
    .subscribe(resp => {
      console.log(resp);
      this.accounts = resp.accounts.accounts;
    }, err => {
      Swal.fire('Error', 'Ha ocurrido un error inesperado', 'error');
    });
  }

  private initForm(){
    this.addNewCreditForm = this.fb.group({
      account_id: ['', [Validators.required]],
      payroll_id: ['', [Validators.required]],
      credit_type_id: ['', [Validators.required]],
      debtor_id: ['', [Validators.required]],
      first_co_debtor: ['', [Validators.required]],
      second_co_debtor: [''],
      adviser_id: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      capital_value: ['', [Validators.required]],
      transport_value: [''],
      other_value: [''],
      interest: ['', [Validators.required]],
      commission: ['', [Validators.required]],
      fee: ['', [Validators.required]],
    });
  }

  getFormField(field: string): AbstractControl {
    return this.addNewCreditForm.get(field);
  }


  getLiquidate(): void {
    this.liquidate = null;
    this.creditService.getLiquidate()
    .subscribe(resp => {
      this.liquidate = resp;
      console.log("liquidacion",this.liquidate);
    }, err => {
      Swal.fire('Error', 'Error cargando la liquidación', 'error');
    });
  }

  addNewCredit(): void {

  }

}
