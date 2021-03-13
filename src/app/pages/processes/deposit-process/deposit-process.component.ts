import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Process } from 'src/app/models/process.model';
import { ProcessesService } from 'src/app/services/processes.service';
import { SwalTool } from 'src/app/tools/swal.tool';

@Component({
  selector: 'app-deposit-process',
  templateUrl: './deposit-process.component.html',
  styleUrls: ['./deposit-process.component.css']
})
export class DepositProcessComponent implements OnInit {

  @Input() process : Process;
  public newDepositProcessForm: FormGroup;
  public loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<DepositProcessComponent>,
    private fb: FormBuilder,
    private processesService: ProcessesService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.newDepositProcessForm = this.fb.group({
      value: ['', [Validators.required]],
    });
  }

  getFormField(field: string): AbstractControl {
    return this.newDepositProcessForm.get(field);
  }

  newDeposit(): void {
    if (this.newDepositProcessForm.valid) {
      this.loading = true;
      const value = this.getFormField('value').value;
      const deposit = {
        process_id : this.process.id,
        value
      }
      this.processesService.depositProcess(deposit)
      .subscribe(resp => {
        this.loading = false;
        console.log(resp);
        SwalTool.onMessage('Depósito agregado', `El depósito se realizó correctamente`);
        this.dialogRef.close('YES');
      }, err => {
        this.loading = false;
        SwalTool.onError('Error', err.error.message);
      });
    }
  }

}
