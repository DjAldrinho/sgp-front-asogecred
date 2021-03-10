import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TypeModal} from 'src/app/enums/modals.enum';
import {Supplier} from 'src/app/models/supplier.model';
import {SuppliersService} from 'src/app/services/suppliers.service';
import {SwalTool} from 'src/app/tools/swal.tool';
import {AddEditSupplierComponent} from './add-edit-supplier/add-edit-supplier.component';
import Swal from 'sweetalert2';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  public suppliers: Supplier[] = [];
  public searchSupplierForm: FormGroup;

  public page: number;
  public total: number;
  public max: number;

  constructor(private supplierService: SuppliersService,
              private dialog: MatDialog,
              private fb: FormBuilder) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.getSuppliers();
    this.initFormSearch();
  }

  private initFormSearch(): void {
    this.searchSupplierForm = this.fb.group({
      supplierSearch: ['']
    });
  }

  getFormField(field: string): AbstractControl {
    return this.searchSupplierForm.get(field);
  }

  suppliersFilter(page?: number): void {
    if (this.searchSupplierForm.valid) {
      this.page = page ?? null;
      const supplierSearch = this.getFormField('supplierSearch').value
        ? this.getFormField('supplierSearch').value
        : null;
      if (supplierSearch) {
        this.supplierService.getSuppliers(this.page, this.max, null, supplierSearch)
          .subscribe(resp => {
            this.suppliers = resp.suppliers;
            this.total = resp.total;
          }, () => {
            SwalTool.onError('Error al cargar los resultados de la busqueda');
          });
      }

    }
  }

  clearFilter(): void {
    this.searchSupplierForm.patchValue({supplierSearch: null});
    this.getSuppliers();
  }

  getSuppliers(page?: number, query?: string): void {
    this.page = page;
    if (page == null) {
      this.page = 1;
    }
    this.supplierService.getSuppliers(this.page, this.max)
      .subscribe(resp => {
        this.suppliers = resp.suppliers;
        this.total = resp.total;
      }, () => {
        SwalTool.onError('Error al cargar los proveedores');
      });
  }

  onPageChange(page): void {
    this.getSuppliers(page);
  }

  openModal(typeModal: string, supplier?: Supplier): void {
    const dialogRef = this.dialog.open(AddEditSupplierComponent, {width: '50%', panelClass: 'card'});
    switch (typeModal) {
      case 'C':
        dialogRef.componentInstance.title = 'Agregar proveedor';
        dialogRef.componentInstance.type = TypeModal.CREATE;
        break;
      case 'E':
        dialogRef.componentInstance.title = 'Actualizar proveedor';
        dialogRef.componentInstance.type = TypeModal.EDIT;
        dialogRef.componentInstance.supplier = supplier;
        break;
      default:
        dialogRef.componentInstance.title = 'Ver proveedor';
        dialogRef.componentInstance.type = TypeModal.SHOW;
        dialogRef.componentInstance.supplier = supplier;
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == 'YES') {
        this.getSuppliers(this.page);
      }
    });
  }

  deleteSupplier(supplier: Supplier): void {
    Swal.fire({
      title: '¿Borrar proveedor?',
      text: `Está apunto de borrar el proveedor ${supplier.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.supplierService.deleteSupplier(supplier)
          .subscribe(resp => {
            this.getSuppliers(this.page);
            SwalTool.onMessage('Proveedor eliminado', `El proveedor ${supplier.name} fue eliminado correctamente`);
          }, () => {
            SwalTool.onError('Error al eliminar el proveedor');
          });
      }
    });
  }

}
