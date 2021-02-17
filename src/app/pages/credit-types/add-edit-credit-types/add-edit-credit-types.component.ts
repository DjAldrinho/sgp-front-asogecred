import {Component, Inject, Input, OnInit} from '@angular/core';
import {TypeModal} from '../../../enums/modals.enum';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreditType} from '../../../models/credit-type.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CreditTypesService} from '../../../services/credit-types.service';
import {SwalTool} from '../../../tools/swal.tool';

@Component({
  selector: 'app-add-edit-credit-types',
  templateUrl: 'add-edit-credit-types.component.html',
  styleUrls: ['add-edit-credit-types.component.css']
})
export class AddEditCreditTypesComponent implements OnInit {

  @Input() title: string;
  @Input() type: TypeModal;
  @Input() creditType: CreditType;
  public addEditCreditTypeForm: FormGroup;
  public loading = false;

  constructor(public dialogRef: MatDialogRef<AddEditCreditTypesComponent>,
              private fb: FormBuilder,
              private creditTypesService: CreditTypesService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initFormCreditType();
  }

  private initFormCreditType(): void {
    this.addEditCreditTypeForm = this.fb.group({
      name: ['', [Validators.required]],
      value: ['', [Validators.required]]
    });

    switch (this.type) {
      case TypeModal.CREATE:
        break;
      default:
        if (this.type === TypeModal.SHOW) {
          this.addEditCreditTypeForm.disable();
        }

        this.addEditCreditTypeForm.patchValue({
          name: this.creditType.name,
          value: this.creditType.value
        });
        break;
    }
  }

  getFormField(field: string): AbstractControl {
    return this.addEditCreditTypeForm.get(field);
  }

  registerUpdateCreditType(): void {
    if (this.addEditCreditTypeForm.valid) {
      const name = this.getFormField('name').value;
      if (this.type === TypeModal.CREATE) {
        this.loading = true;
        this.creditTypesService.createCreditType(this.addEditCreditTypeForm.value)
          .subscribe(() => {
            this.loading = false;
            SwalTool.onMessage('Tipo de credito agregado', `el tipo de credito ${name} fue agregado correctamente`);
            this.dialogRef.close('YES');
          }, () => {
            this.loading = false;
            SwalTool.onError('Error', 'No se pudo agregar el tipo de credito');
          });
      } else {
        this.loading = true;
        this.creditTypesService.updateCreditType(this.addEditCreditTypeForm.value, this.creditType.id)
          .subscribe(() => {
            this.loading = false;
            SwalTool.onMessage('Tipo de credito actualizado', `el tipo de credito ${name} fue actualizado correctamente`);
            this.dialogRef.close('YES');
          }, () => {
            this.loading = false;
            SwalTool.onError('Error', 'No se pudo actualizar el tipo de credito');
          });
      }
    }
  }

}
