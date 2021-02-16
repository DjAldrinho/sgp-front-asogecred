import {Component, Inject, Input, OnInit} from '@angular/core';
import {TypeModal} from '../../../enums/modals.enum';
import {Adviser} from '../../../models/adviser.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AdvisersService} from '../../../services/advisers.service';
import {SwalTool} from '../../../tools/swal.tool';

@Component({
  selector: 'app-add-edit-advisers',
  templateUrl: './add-edit-advisers.component.html',
  styleUrls: ['./add-edit-advisers.component.css']
})
export class AddEditAdvisersComponent implements OnInit {

  @Input() title: string;
  @Input() type: TypeModal;
  @Input() adviser: Adviser;
  public addEditAdviserForm: FormGroup;
  public loading = false;

  constructor(public dialogRef: MatDialogRef<AddEditAdvisersComponent>,
              private fb: FormBuilder,
              private advisersService: AdvisersService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initFormAdviser();
  }

  private initFormAdviser(): void {
    this.addEditAdviserForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });

    switch (this.type) {
      case TypeModal.CREATE:
        break;
      default:
        if (this.type === TypeModal.SHOW) {
          this.addEditAdviserForm.disable();
        }

        this.addEditAdviserForm.patchValue({
          name: this.adviser.name,
          phone: this.adviser.phone
        });
        break;
    }
  }

  getFormField(field: string): AbstractControl {
    return this.addEditAdviserForm.get(field);
  }

  registerUpdateAdviser(): void {
    if (this.addEditAdviserForm.valid) {
      const name = this.getFormField('name').value;
      if (this.type === TypeModal.CREATE) {
        this.loading = true;
        this.advisersService.createAdviser(this.addEditAdviserForm.value)
          .subscribe(() => {
            this.loading = false;
            SwalTool.onMessage('Asesor agregado', `el asesor ${name} fue agregado correctamente`);
            this.dialogRef.close('YES');
          }, () => {
            this.loading = false;
            SwalTool.onError('Error', 'No se pudo agregar el asesor');
          });
      } else {
        this.loading = true;
        this.advisersService.updateAdviser(this.addEditAdviserForm.value, this.adviser.id)
          .subscribe(() => {
            this.loading = false;
            SwalTool.onMessage('Asesor actualizado', `el asesor ${name} fue actualizado correctamente`);
            this.dialogRef.close('YES');
          }, () => {
            this.loading = false;
            SwalTool.onError('Error', 'No se pudo actualizar el asesor');
          });
      }
    }
  }

}
