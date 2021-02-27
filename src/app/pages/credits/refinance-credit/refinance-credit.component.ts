import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Credit } from 'src/app/models/credit.model';
import { CreditsService } from 'src/app/services/credits.service';
import { SwalTool } from 'src/app/tools/swal.tool';

@Component({
  selector: 'app-refinance-credit',
  templateUrl: './refinance-credit.component.html',
  styleUrls: ['./refinance-credit.component.css']
})
export class RefinanceCreditComponent implements OnInit {

  @Input() credit : Credit;
  public refinanceCreditForm: FormGroup;
  public loading: boolean = false;
  public filesToUpload: File[];

  constructor(public dialogRef: MatDialogRef<RefinanceCreditComponent>,
    private fb: FormBuilder,
    private creditsService: CreditsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
  }
  
  private initForm(): void {
    this.refinanceCreditForm = this.fb.group({
      capital_value: [this.credit.capital_value, [Validators.required]],
      fee: [this.credit.fee, [Validators.required]],
      transport_value: [this.credit.transport_value, [Validators.required]],
      files: ['', [Validators.required]],
    });
  }

  getFormField(field: string): AbstractControl {
    return this.refinanceCreditForm.get(field);
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      this.refinanceCreditForm.patchValue({file: files});
      this.filesToUpload = files;
      console.log(this.filesToUpload);
    }
  }

  refinanceCredit(): void {
    if (this.refinanceCreditForm.valid) {
      this.loading = true;
      const refinance = {
        credit_id : this.credit.id,
        ...this.refinanceCreditForm.value
      }
      this.creditsService.refinanceCredit(refinance, this.filesToUpload)
      .subscribe((resp : any) => {
        this.loading = false;
        console.log(resp);
        SwalTool.onMessage('Credito refinanciado', `El credito fue refinanciado correctamente`);
        this.dialogRef.close('YES');
      }, err => {
        this.loading = false;
        SwalTool.onError('Error', err.error.message);
      });
    }
  }

}
