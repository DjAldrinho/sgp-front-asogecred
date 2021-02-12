import {Component, OnInit, Inject, Input} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TypeModal} from 'src/app/enums/modals.enum';
import {Client} from 'src/app/models/client.model';
import {ClientsService} from 'src/app/services/clients.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.css']
})
export class AddEditClientComponent implements OnInit {

  @Input() title: string;
  @Input() type: TypeModal;
  @Input() client: Client;
  public addEditClientForm: FormGroup;
  private emailRegex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public loading = false;
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
      email: ['', [Validators.pattern(this.emailRegex)]],
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
    switch (this.type) {
      case TypeModal.CREATE:
        break;
      default:
        if (this.type === TypeModal.SHOW) {
          this.addEditClientForm.disable();
        } else {
          this.getFormField('name').disable();
          this.getFormField('document_type').disable();
          this.getFormField('document_number').disable();
        }

        let formatedDate = '';
        if (this.client.start_date) {
          formatedDate = moment.utc(this.client.start_date).format('yyyy-MM-DD');
        }

        const arrayTypes = JSON.parse(this.client.client_type);
        const clientType = arrayTypes.join();

        this.addEditClientForm.patchValue({
          name: this.client.name,
          email: this.client.email,
          document_type: this.client.document_type,
          document_number: this.client.document_number,
          client_type: clientType,
          phone: this.client.phone,
          sign: this.client.sign_url,
          position: this.client.position,
          salary: this.client.salary,
          start_date: formatedDate,
          bonding: this.client.bonding,
        });
        break;
    }
  }

  getFormField(field: string): AbstractControl {
    return this.addEditClientForm.get(field);
  }

  registerUpdateClient(): void {
    if (this.addEditClientForm.valid) {
      const name = this.getFormField('name').value;
      if (this.type === TypeModal.CREATE) {
        this.loading = true;
        this.clientService.createClient(this.addEditClientForm.value, this.imageToUpload)
          .subscribe(resp => {
            this.loading = false;
            console.log(resp);
            Swal.fire('Cliente agregado', `El cliente ${name} fue agregado correctamente`, 'success');
            this.dialogRef.close('YES');
          }, err => {
            this.loading = false;
            Swal.fire('Error', 'No se pudo agregar el cliente', 'error');
          });
      } else {
        this.loading = true;
        this.clientService.updateClient(this.addEditClientForm.value, this.client.id, this.imageToUpload)
          .subscribe(resp => {
            this.loading = false;
            Swal.fire('Cliente actualizado', `El cliente ${name} fue actualizado correctamente`, 'success');
            this.dialogRef.close('YES');
          }, err => {
            this.loading = false;
            Swal.fire('Error', 'No se pudo actualizar el cliente', 'error');
          });
      }
    }
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.addEditClientForm.patchValue({
        file
      });
      this.imageToUpload = file;
    }
  }

}
