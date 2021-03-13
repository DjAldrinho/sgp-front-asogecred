import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Credit } from 'src/app/models/credit.model';
import { CreditsService } from 'src/app/services/credits.service';
import { SwalTool } from 'src/app/tools/swal.tool';

@Component({
  selector: 'app-deposit-credit',
  templateUrl: './deposit-credit.component.html',
  styleUrls: ['./deposit-credit.component.css']
})
export class DepositCreditComponent implements OnInit {

  @Input() credit : Credit;
  public newDepositForm: FormGroup;
  public loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DepositCreditComponent>,
    private fb: FormBuilder,
    private creditsService: CreditsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.newDepositForm = this.fb.group({
      value: ['', [Validators.required]],
    });
  }

  getFormField(field: string): AbstractControl {
    return this.newDepositForm.get(field);
  }

  newDeposit(): void {
    if (this.newDepositForm.valid) {
      this.loading = true;
      const value = this.getFormField('value').value;
      const deposit = {
        credit_id : this.credit.id,
        value
      }
      this.creditsService.depositCredit(deposit)
      .subscribe(resp => {
        this.loading = false;
        console.log(resp);
        SwalTool.onMessage('Abono agregado', `El abono se realizó correctamente`);
        this.dialogRef.close('YES');
      }, err => {
        this.loading = false;
        SwalTool.onError('Error', err.error.message);
      });
    }
  }

}
