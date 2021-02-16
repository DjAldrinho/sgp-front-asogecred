import {Component, Inject, Input, OnInit} from '@angular/core';
import {TypeModal} from '../../../enums/modals.enum';
import {Payroll} from '../../../models/payroll.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PayrollsService} from '../../../services/payrolls.service';

@Component({
  selector: 'app-add-edit-payrolls',
  templateUrl: './add-edit-payrolls.component.html',
  styleUrls: ['./add-edit-payrolls.component.css']
})
export class AddEditPayrollsComponent implements OnInit {

  @Input() title: string;
  @Input() type: TypeModal;
  @Input() payroll: Payroll;
  public addEditPayrollForm: FormGroup;
  public loading = false;

  constructor(public dialogRef: MatDialogRef<AddEditPayrollsComponent>,
              private fb: FormBuilder,
              private payrollsService: PayrollsService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.addEditPayrollForm = this.fb.group({
      name: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    switch (this.type) {
      case TypeModal.CREATE:
        break;
      default:
        if (this.type === TypeModal.SHOW) {
          this.addEditPayrollForm.disable();
        }

        this.addEditPayrollForm.patchValue({
          name: this.payroll.name,
          status: this.payroll.status
        });
        break;
    }
  }

  getFormField(field: string): AbstractControl {
    return this.addEditPayrollForm.get(field);
  }

}
