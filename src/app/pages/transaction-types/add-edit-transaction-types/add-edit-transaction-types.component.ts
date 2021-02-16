import {Component, Inject, Input, OnInit} from '@angular/core';
import {TypeModal} from '../../../enums/modals.enum';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransactionType} from '../../../models/transaction-type.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SwalTool} from '../../../tools/swal.tool';
import {TransactionTypeService} from '../../../services/transaction-types.service';

@Component({
  selector: 'app-add-edit-transaction-types',
  templateUrl: './add-edit-transaction-types.component.html',
  styleUrls: ['./add-edit-transaction-types.component.css']
})
export class AddEditTransactionTypesComponent implements OnInit {

  @Input() title: string;
  @Input() type: TypeModal;
  @Input() transactionType: TransactionType;
  public addEditTransactionTypeForm: FormGroup;
  public loading = false;

  constructor(public dialogRef: MatDialogRef<AddEditTransactionTypesComponent>,
              private fb: FormBuilder,
              private transactionTypesService: TransactionTypeService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initFormTransactionType();
  }

  private initFormTransactionType(): void {
    this.addEditTransactionTypeForm = this.fb.group({
      name: ['', [Validators.required]]
    });

    switch (this.type) {
      case TypeModal.CREATE:
        break;
      default:
        if (this.type === TypeModal.SHOW) {
          this.addEditTransactionTypeForm.disable();
        }

        this.addEditTransactionTypeForm.patchValue({
          name: this.transactionType.name
        });
        break;
    }
  }

  getFormField(field: string): AbstractControl {
    return this.addEditTransactionTypeForm.get(field);
  }

  registerUpdateTransactionType(): void {
    if (this.addEditTransactionTypeForm.valid) {
      const name = this.getFormField('name').value;
      if (this.type === TypeModal.CREATE) {
        this.loading = true;
        this.transactionTypesService.createTransactionType(this.addEditTransactionTypeForm.value)
          .subscribe(() => {
            this.loading = false;
            SwalTool.onMessage('Tipo de transacción agregado', `el tipo de transacción ${name} fue agregado correctamente`);
            this.dialogRef.close('YES');
          }, () => {
            this.loading = false;
            SwalTool.onError('Error', 'No se pudo agregar el tipo de transacción');
          });
      } else {
        this.loading = true;
        this.transactionTypesService.updateTransactionType(this.addEditTransactionTypeForm.value, this.transactionType.id)
          .subscribe(() => {
            this.loading = false;
            SwalTool.onMessage('Tipo de transacción actualizado', `el tipo de transacción ${name} fue actualizado correctamente`);
            this.dialogRef.close('YES');
          }, () => {
            this.loading = false;
            SwalTool.onError('Error', 'No se pudo actualizar el tipo de transacción');
          });
      }
    }
  }

}
