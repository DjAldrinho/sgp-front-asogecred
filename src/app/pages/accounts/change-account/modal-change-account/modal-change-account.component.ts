import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Account } from 'src/app/models/account.model';
import { Supplier } from 'src/app/models/supplier.model';
import { TransactionType } from 'src/app/models/transaction-type.model';
import { AccountsService } from 'src/app/services/accounts.service';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { TransactionTypeService } from 'src/app/services/transaction-types.service';
import { SwalTool } from 'src/app/tools/swal.tool';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-change-account',
  templateUrl: './modal-change-account.component.html',
  styleUrls: ['./modal-change-account.component.css']
})
export class ModalChangeAccountComponent implements OnInit {

  @Input() account : Account;
  public addEditTransactionForm: FormGroup;
  public loading: boolean = false;

  public suppliers: Supplier[] = [];
  public type_transactions: TransactionType[] = [];

  public fulldata = combineLatest([
    this.suppliersService.getSuppliers(1, 5, true),
    this.typeTransactions.getTransactionTypes(1, 5, true),
  ]).pipe(
    map((data) => {
      return {
        suppliers: data[0].suppliers,
        type_transactions: data[1].transactionTypes,
      };
    })
  );

  constructor(public dialogRef: MatDialogRef<ModalChangeAccountComponent>,
    private fb: FormBuilder,
    private accountsService: AccountsService,
    private suppliersService: SuppliersService,
    private typeTransactions: TransactionTypeService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
    this.addEditTransactionForm.disable();
    this.fulldata.subscribe(resp => {
      this.suppliers = resp.suppliers;
      this.type_transactions = resp.type_transactions;
      this.addEditTransactionForm.enable();
    }, err => {
      Swal.fire('Error', 'Ha ocurrido un error inesperado', 'error');
    });
  }

  private initForm(): void {
    this.addEditTransactionForm = this.fb.group({
      type: ['', [Validators.required]],
      supplier_id: ['', [Validators.required]],
      type_transaction: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      commentary: ['', [Validators.required]],
    });
  }

  getFormField(field: string): AbstractControl {
    return this.addEditTransactionForm.get(field);
  }

  registerUpdateTransaction(): void {
    if (this.addEditTransactionForm.valid) {
      this.loading = true;
      const transaction = {
        ...this.addEditTransactionForm.value,
        account_id : this.account.id
      }
      this.accountsService.createTransaction(transaction)
      .subscribe(resp => {
        this.loading = false;
        SwalTool.onMessage('Transacción creada', `La transacción fue creada satisfactoriamente`);
        this.dialogRef.close('YES');
      }, err => {
        this.loading = false;
        SwalTool.onError('Error', 'No se pudo agregar la transacción');
      });
    }
  }

}
