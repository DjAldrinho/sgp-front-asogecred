import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { SwalTool } from 'src/app/tools/swal.tool';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  
  public changePasswordForm: FormGroup;
  public loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.changePasswordForm = this.fb.group({
      new_password: ['', [Validators.required]],
      confirm_new_password: ['', [Validators.required]],
    },{
      validators: this.passwordsEquals('new_password', 'confirm_new_password')
    });
  }

  getFormField(field: string): AbstractControl {
    return this.changePasswordForm.get(field);
  }

  changePassword(): void {
    if (this.changePasswordForm.valid) {
      const new_password = this.getFormField('new_password').value;
      this.loading = true;
      this.userService.changePassword(new_password)
      .subscribe(resp => {
        this.loading = false;
        SwalTool.onMessage('Contraseña actualizada', `La contraseña fue actualizada correctamente`);
        this.dialogRef.close('YES');
      }, err => {
        this.loading = false;
        SwalTool.onError('Error', 'No se pudo actualizar la contraseña');
      });
    }
  }

  checkPasswords(): boolean {
    const pass1 = this.changePasswordForm.get('new_password').value;
    const pass2 = this.changePasswordForm.get('confirm_new_password').value;

    if(pass1 !== pass2 && this.changePasswordForm.dirty) {
      return true;
    }else{
      return false;
    }
  }


  passwordsEquals(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({notEqual: true});
      }
    }
  }

}
