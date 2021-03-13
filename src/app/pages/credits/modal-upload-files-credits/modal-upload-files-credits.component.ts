import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Credit } from 'src/app/models/credit.model';
import { CreditsService } from 'src/app/services/credits.service';
import { SwalTool } from 'src/app/tools/swal.tool';

@Component({
  selector: 'app-modal-upload-files-credits',
  templateUrl: './modal-upload-files-credits.component.html',
  styleUrls: ['./modal-upload-files-credits.component.css']
})
export class ModalUploadFilesCreditsComponent implements OnInit {

  @Input() credit: Credit;
  public uploadDocumentsForm: FormGroup;
  public loading = false;
  public filesToUpload: File[];

  constructor(public dialogRef: MatDialogRef<ModalUploadFilesCreditsComponent>,
    private fb: FormBuilder,
    private creditsService: CreditsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.uploadDocumentsForm = this.fb.group({
      files: ['', [Validators.required]]
    });
  }

  getFormField(field: string): AbstractControl {
    return this.uploadDocumentsForm.get(field);
  }

  onFileChange(event): void {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files;
      this.uploadDocumentsForm.patchValue({ file: files });
      this.filesToUpload = files;
    }
  }

  uploadDocuments(): void {
    if (this.uploadDocumentsForm.valid) {
      this.loading = true;
      this.creditsService.uploadDocumentsCredit(this.credit.id, this.filesToUpload)
      .subscribe(() => {
        this.loading = false;
        SwalTool.onMessage('Documentos cargados', `Los documentos fueron cargados correctamente`);
        this.dialogRef.close('YES');
      }, (err) => {
        this.loading = false;
        SwalTool.onError('Error', err.error.message);
      });
    }
  }

}
