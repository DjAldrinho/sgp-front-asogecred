import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeModal } from 'src/app/enums/modals.enum';
import { Account } from 'src/app/models/account.model';
import { AccountsService } from 'src/app/services/accounts.service';
import { SwalTool } from 'src/app/tools/swal.tool';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.css']
})
export class AddEditAccountComponent implements OnInit {

  @Input() title: string;
  @Input() type : TypeModal;
  @Input() account : Account;
  public addEditAccountForm: FormGroup;
  public loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddEditAccountComponent>,
    private fb: FormBuilder,
    private accountService: AccountsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.addEditAccountForm = this.fb.group({
      name: ['', [Validators.required]],
      account_number: ['', [Validators.required]],
      value: ['', [Validators.required]],
    });

    switch (this.type) {
      case TypeModal.CREATE:
        break;
      default:
        if(this.type === TypeModal.SHOW){
          this.addEditAccountForm.disable();
        }

        this.addEditAccountForm.patchValue({
          name : this.account.name,
          account_number : this.account.account_number,
          value: this.account.value,
        });
        break;
    }
  }

  getFormField(field: string): AbstractControl {
    return this.addEditAccountForm.get(field);
  }

  registerUpdateAccount(): void {
    console.log(this.addEditAccountForm.value);
    if (this.addEditAccountForm.valid) {
      const number = this.getFormField('account_number').value;
      if(this.type === TypeModal.CREATE){
        this.loading = true;
        this.accountService.createAccount(this.addEditAccountForm.value)
        .subscribe(resp => {
          this.loading = false;
          SwalTool.onMessage('Cuenta agregada', `La cuenta No. ${number} fue agregada correctamente`);
          this.dialogRef.close('YES');
        }, err => {
          this.loading = false;
          SwalTool.onError('Error', 'No se pudo agregar la cuenta');
        });
      }else{
        this.loading = true;
        // this.accountService.updateClient(this.addEditClientForm.value, this.client.id, this.imageToUpload)
        // .subscribe(resp => {
        //   this.loading = false;
        //   console.log(resp);
        //   Swal.fire('Cuenta actualizado', `La cuenta No. ${number} fue actualizada correctamente`, 'success');
        //   this.dialogRef.close('YES');
        // }, err => {
        //   this.loading = false;
        //   Swal.fire('Error', 'No se pudo actualizar la cuenta', 'error');
        // });
      }
    }
  }

}
