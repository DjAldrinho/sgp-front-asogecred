import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientsService} from '../../../services/clients.service';
import {SwalTool} from '../../../tools/swal.tool';
import {BlobService} from '../../../services/blob.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-modal-massive-load',
  templateUrl: './modal-massive-load.component.html',
  styleUrls: ['./modal-massive-load.component.css']
})
export class ModalMassiveLoadComponent implements OnInit {

  public approveClientForm: FormGroup;
  public loading = false;
  public fileText = 'Descargar plantilla';
  public uploadText = 'Cargar archivo';
  public fileLoading = false;
  public fileToUpload: File;

  constructor(public dialogRef: MatDialogRef<ModalMassiveLoadComponent>,
              private fb: FormBuilder,
              private clientsService: ClientsService,
              private blobService: BlobService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initFormClient();
  }

  private initFormClient(): void {
    this.approveClientForm = this.fb.group({
      files: ['', [Validators.required]]
    });
  }

  getFormField(field: string): AbstractControl {
    return this.approveClientForm.get(field);
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.approveClientForm.patchValue({file});
      this.fileToUpload = file;
    }
  }

  massiveLoad(): void {
    if (this.approveClientForm.valid) {
      this.uploadText = "Cargando..."
      this.loading = true;
      this.clientsService.massiveLoad(this.fileToUpload)
        .subscribe(() => {
          this.uploadText = 'Cargar archivo';
          this.loading = false;
          SwalTool.onMessage('Clientes cargados', `Los clientes se han cargado correctamente`);
          this.dialogRef.close('YES');
        }, () => {
          this.uploadText = 'Cargar archivo';
          this.loading = false;
          SwalTool.onError('Error al cargar los clientes');
        });
    }
  }

  getTemplate(): void {
    this.fileText = 'Descargando...';
    this.fileLoading = true;
    this.blobService.getFile('/clients/template', 'template-clients.xls')
      .subscribe(() => {
        setTimeout(() => {
          this.fileText = 'Descargar plantilla';
          this.fileLoading = false;
        }, 500);
      }, () => {
        this.fileLoading = false;
        SwalTool.onError('Error al descargar la plantilla');
      });
  }

}
