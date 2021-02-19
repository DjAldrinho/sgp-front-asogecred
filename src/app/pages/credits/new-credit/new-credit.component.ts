import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from 'src/app/models/account.model';
import { Adviser } from 'src/app/models/adviser.model';
import { Client } from 'src/app/models/client.model';
import { CreditType } from 'src/app/models/credit-type.model';
import { Liquidate } from 'src/app/models/credit.model';
import { Payroll } from 'src/app/models/payroll.model';
import { AccountsService } from 'src/app/services/accounts.service';
import { AdvisersService } from 'src/app/services/advisers.service';
import { ClientsService } from 'src/app/services/clients.service';
import { CreditTypesService } from 'src/app/services/credit-types.service';
import { CreditsService } from 'src/app/services/credits.service';
import { PayrollsService } from 'src/app/services/payrolls.service';
import { SwalTool } from 'src/app/tools/swal.tool';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.css']
})
export class NewCreditComponent implements OnInit {

  public accounts: Account[] = [];
  public payrolls: Payroll[] = [];
  public creditTypes: CreditType[] = [];
  public addNewCreditForm: FormGroup;
  public loading: boolean = false;
  public enabledLiquidation = false;
  public debtors: Client[] = [];
  public co_debtors: Client[] = [];
  public seconds_co_debtors: Client[] = [];
  public advisers: Adviser[] = [];
  public showCommisionField: boolean = false;

  public liquidate: Liquidate;

  public fulldata = combineLatest([
    this.accountService.getAccounts(1, 5, true),
    this.payrollService.getPayrolls(1, 5, true),
    this.creditTypeService.getCreditTypes(1 ,5, true)
  ]).pipe(
    map((data) => {
      return {
        accounts: data[0],
        payrolls: data[1],
        credit_types: data[2],
      };
    })
  );

  constructor(  private fb: FormBuilder,
    private router: Router,
    private accountService: AccountsService,
    private creditService: CreditsService,
    private payrollService: PayrollsService,
    private creditTypeService: CreditTypesService,
    private clientsService: ClientsService,
    private advisersService: AdvisersService) { }

  ngOnInit(): void {
    this.initForm();
    this.addNewCreditForm.disable();
    this.fulldata
    .subscribe(resp => {
      console.log(resp);
      this.accounts = resp.accounts.accounts;
      this.payrolls = resp.payrolls.payrolls;
      this.creditTypes = resp.credit_types.creditTypes;
      this.addNewCreditForm.enable();
    }, err => {
      Swal.fire('Error', 'Ha ocurrido un error inesperado', 'error');
    });

    this.addNewCreditForm.valueChanges.subscribe(selectedValue => {
      this.validateLiquidateData();
    });

    this.getFormField('debtor_id').valueChanges.subscribe(value => {
      if(!this.getFormField('debtor_id').errors?.required){
        this.getDebtors(value, 'debtors');
      }
    });

    this.getFormField('first_co_debtor').valueChanges.subscribe(value => {
      if(!this.getFormField('first_co_debtor').errors?.required){
        this.getDebtors(value, 'co_debtors');
      }
    });

    this.getFormField('second_co_debtor').valueChanges.subscribe(value => {
      if(!this.getFormField('second_co_debtor').errors?.required){
        this.getDebtors(value, 'seconds_codebtor');
      }
    });

    this.getFormField('adviser_id').valueChanges.subscribe(value => {
      console.log(value.length);
      console.log(typeof(value));
      if(this.getFormField('adviser_id').value.length > 0){
        this.getAdvisers(value);
      }

      if(!(this.getFormField('adviser_id').value === Object) || !(this.getFormField('adviser_id').value.length > 0)){
        console.log("aqui");
      }

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
      adviser_id: [''],
      start_date: ['', [Validators.required]],
      capital_value: ['', [Validators.required]],
      transport_value: ['0'],
      other_value: ['0'],
      interest: ['', [Validators.required]],
      commission: ['0'],
      fee: ['', [Validators.required]],
    });
  }

  getFormField(field: string): AbstractControl {
    return this.addNewCreditForm.get(field);
  }


  getDebtors(query: string, type: 'debtors' | 'co_debtors' | 'seconds_codebtor'): void {
    this.clientsService.getClients(1, 20, query)
    .subscribe((data) => {
      switch (type) {
        case "debtors":
          this.debtors = data.clients;  
          break;
        case "co_debtors":
          this.co_debtors = data.clients;  
          break;
        default:
          this.seconds_co_debtors = data.clients;  
          break;
      }
    }, err => {
      Swal.fire('Error', 'Error buscando clientes', 'error');
    })
  }

  getAdvisers(query: string): void {
    this.advisersService.getAdvisers(1, 20, query)
    .subscribe((data) => {
      this.advisers = data.advisers;
    }, err => {
      Swal.fire('Error', 'Error buscando asesores', 'error');
    })
  }

  showDebtorCodebtors(debtor: Client): string | Client {
    return debtor ? `${debtor.document_number} ${debtor.name}` : debtor;
  }

  selectDebtor(debtor: Client): void {
    const co_debtor = this.getFormField('first_co_debtor').value;
    const second_co_debtor = this.getFormField('second_co_debtor').value;
    if((debtor.id == co_debtor.id) || (debtor.id == second_co_debtor.id)){
      this.getFormField('debtor_id').setValue('');
      Swal.fire('Error', 'El titular no puede ser igual al codeudor o al segundo codeudor', 'error');
    }
  }

  selectCoDebtor(debtor: Client): void {
    const debtor_selected = this.getFormField('debtor_id').value;
    const second_co_debtor = this.getFormField('second_co_debtor').value;
    if((debtor.id == debtor_selected.id) || (debtor.id == second_co_debtor.id)){
      this.getFormField('first_co_debtor').setValue('');
      Swal.fire('Error', 'El codeudor no puede ser igual al titular o al segundo codeudor', 'error');
    }
  }

  selectSecondCoDebtor(debtor: Client): void {
    const debtor_selected = this.getFormField('debtor_id').value;
    const co_debtor = this.getFormField('first_co_debtor').value;
    if((debtor.id == debtor_selected.id) || (debtor.id == co_debtor.id)){
      this.getFormField('second_co_debtor').setValue('');
      Swal.fire('Error', 'El codeudor 2 no puede ser igual al titular o al codeudor 1', 'error');
    }
  }

  showAdviser(adviser: Adviser): string | Adviser {
    return adviser ? `${adviser.name}` : adviser;
  }

  selectAdviser(adviser: Adviser): void {
    this.showCommisionField = true;
    this.getFormField('commission').setValidators([Validators.required]);
  }

  validateLiquidateData(): void {
    if(!this.getFormField('capital_value').errors?.required && !this.getFormField('interest').errors?.required
      && !this.getFormField('start_date').errors?.required && !this.getFormField('fee').errors?.required){
      this.enabledLiquidation = true;
    }else{
      this.enabledLiquidation = false;
    }
  }


  getLiquidate(): void {
    this.liquidate = null;
    const capital_value:number = this.getFormField('capital_value').value;
    const interest:number = this.getFormField('interest').value;
    const start_date:string = this.getFormField('start_date').value;
    const fee:number = this.getFormField('fee').value;
    const other_value = this.getFormField('other_value').value;
    const transport_value = this.getFormField('transport_value').value;
    this.creditService.getLiquidate(
      capital_value,
      interest,
      fee,
      start_date,
      other_value.length <= 0 ? 0 : other_value,
      transport_value.length <= 0 ? 0 : transport_value,
    )
    .subscribe(resp => {
      this.liquidate = resp;
    }, err => {
      Swal.fire('Error', 'Error cargando la liquidación', 'error');
    });
  }

  addNewCredit(): void {
    if(this.addNewCreditForm.valid){
      const debtor_selected = this.getFormField('debtor_id').value;
      const co_debtor = this.getFormField('first_co_debtor').value;
      const second_co_debtor = this.getFormField('second_co_debtor').value;
      const adviser = this.getFormField('adviser_id').value;
      const credit  = {
        ...this.addNewCreditForm.value,
        debtor_id: debtor_selected.id,
        first_co_debtor: co_debtor.id,
        second_co_debtor: second_co_debtor.id,
        adviser_id : adviser.id
      }
      Swal.fire({
        title: '¿Está seguro?',
        text: `Está apunto de crear un credito al titular ${debtor_selected.name}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.loading = true;
          console.log(credit);
          this.creditService.createCredit(credit)
          .subscribe(() => {
            this.loading = false;
            this.router.navigateByUrl(`/dashboard/credits`);
            SwalTool.onMessage('Credito creado', `El credito fue creado correctamente`);
          }, () => {
            this.loading = false;
            SwalTool.onError('Error', 'No se pudo crear el credito');
          });
        }
      });
    }
  }

}
