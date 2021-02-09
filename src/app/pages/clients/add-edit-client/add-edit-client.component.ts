import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.css']
})
export class AddEditClientComponent implements OnInit {

  @Input() title: string;
  public addEditClientForm: FormGroup;
  private emailRegex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public loading: boolean = false;
  public imageToUpload: File;

  constructor(public dialogRef: MatDialogRef<AddEditClientComponent>,
    private fb: FormBuilder,
    private clientService: ClientsService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      
    }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.addEditClientForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      document_type: ['', [Validators.required]],
      document_number: ['', [Validators.required]],
      client_type: ['', [Validators.required]],
      phone: [''],
      sign: [null],
      position: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
      bonding: ['', [Validators.required]],
    });
  }

  getFormField(field: string) {
    return this.addEditClientForm.get(field);
  }

  registerUpdateClient(): void {
    console.log(this.addEditClientForm.value);
    if (this.addEditClientForm.valid) {
      this.loading = true;
      this.clientService.createClient(this.addEditClientForm.value, this.imageToUpload)
      .subscribe(resp => {
        this.loading = false;
        console.log(resp);
        Swal.fire('Cliente agregado', `El cliente fue agregado correctamente`, 'success');
        this.dialogRef.close('YES');
      }, err => {
        this.loading = false;
        Swal.fire('Error', "No se pudo agregar el cliente", 'error');
      });
    }
  }

  onFileChange(event) {
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.addEditClientForm.patchValue({
        file: file
      });
      this.imageToUpload = file;
    }
  }

}
