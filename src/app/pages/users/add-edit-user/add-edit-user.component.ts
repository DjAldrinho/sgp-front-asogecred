import { Component, Inject, Input, OnInit, Type } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeModal } from 'src/app/enums/modals.enum';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { SwalTool } from 'src/app/tools/swal.tool';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  @Input() title: string;
  @Input() type : TypeModal;
  @Input() user : User;
  
  public addEditUserForm: FormGroup;
  private emailRegex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddEditUserComponent>,
    private fb: FormBuilder,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(): void {
    this.addEditUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      password: ['', this.type == TypeModal.CREATE ? [Validators.required] : []],
      document_type: ['', [Validators.required]],
      document_number: ['', [Validators.required]],
      is_administrator: [false],
    });
    switch (this.type) {
      case TypeModal.CREATE:
        break;
      default:
        if(this.type === TypeModal.SHOW){
          this.addEditUserForm.disable();
        }else{

        }

        this.addEditUserForm.patchValue({
          name : this.user.name,
          email : this.user.email,
          document_type: this.user.document_type,
          document_number: this.user.document_number,
          is_administrator: this.user.is_administrator,
        });
        break;
    }
  }

  getFormField(field: string): AbstractControl {
    return this.addEditUserForm.get(field);
  }

  registerUpdateUser(): void {
    if (this.addEditUserForm.valid) {
      const name = this.getFormField('name').value;
      if(this.type === TypeModal.CREATE){
        this.loading = true;
        this.usersService.createUser(this.addEditUserForm.value)
        .subscribe(resp => {
          this.loading = false;
          SwalTool.onMessage('Usuario agregado', `El usuario ${name} fue agregado correctamente`);
          this.dialogRef.close('YES');
        }, err => {
          this.loading = false;
          SwalTool.onError('Error', 'No se pudo agregar el usuario');
        });
      }else{
        // this.loading = true;
        // this.usersService.updateUser(this.addEditUserForm.value, this.user.id)
        // .subscribe(resp => {
        //   this.loading = false;
        //   SwalTool.onMessage('Usuario actualizado', `El usuario ${name} fue actualizado correctamente`);
        //   this.dialogRef.close('YES');
        // }, err => {
        //   this.loading = false;
        //   SwalTool.onError('Error', 'No se pudo actualizar el usuario');
        // });
      }
    }
  }

  get isCreate() : boolean {
    return this.type == TypeModal.CREATE ? true : false;
  } 

}
