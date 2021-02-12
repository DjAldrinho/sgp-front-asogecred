import { Component, Inject, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeModal } from 'src/app/enums/modals.enum';
import { Supplier } from 'src/app/models/supplier.model';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { SwalTool } from 'src/app/tools/swal.tool';

@Component({
  selector: 'app-add-edit-supplier',
  templateUrl: './add-edit-supplier.component.html',
  styleUrls: ['./add-edit-supplier.component.css']
})
export class AddEditSupplierComponent implements OnInit {

  @Input() title: string;
  @Input() type : TypeModal;
  @Input() supplier : Supplier;
  public addEditSupplierForm: FormGroup;
  public loading: boolean = false;

  constructor(public dialogRef: MatDialogRef<AddEditSupplierComponent>,
    private fb: FormBuilder,
    private supplierService: SuppliersService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.addEditSupplierForm = this.fb.group({
      name: ['', [Validators.required]],
    });

    switch (this.type) {
      case TypeModal.CREATE:
        break;
      default:
        if(this.type === TypeModal.SHOW){
          this.addEditSupplierForm.disable();
        }

        this.addEditSupplierForm.patchValue({
          name : this.supplier.name,
        });
        break;
    }
  }

  getFormField(field: string): AbstractControl {
    return this.addEditSupplierForm.get(field);
  }

  registerUpdateSupplier(): void {
    if (this.addEditSupplierForm.valid) {
      const name = this.getFormField('name').value;
      if(this.type === TypeModal.CREATE){
        this.loading = true;
        this.supplierService.createSupplier(this.addEditSupplierForm.value)
        .subscribe(resp => {
          this.loading = false;
          SwalTool.onMessage('Proveedor agregado', `El proveedor ${name} fue agregado correctamente`);
          this.dialogRef.close('YES');
        }, err => {
          this.loading = false;
          SwalTool.onError('Error', 'No se pudo agregar el proveedor');
        });
      }else{
        this.loading = true;
        this.supplierService.updateSupplier(this.addEditSupplierForm.value, this.supplier.id, )
        .subscribe(resp => {
          this.loading = false;
          SwalTool.onMessage('Proveedor actualizado', `El proveedor ${name} fue actualizado correctamente`);
          this.dialogRef.close('YES');
        }, err => {
          this.loading = false;
          SwalTool.onError('Error', 'No se pudo actualizar el proveedor');
        });
      }
    }
  }

}
