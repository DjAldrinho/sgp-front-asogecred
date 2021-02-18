import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SwalTool} from '../../tools/swal.tool';
import {TypeModal} from '../../enums/modals.enum';
import Swal from 'sweetalert2';
import {TransactionType} from '../../models/transaction-type.model';
import {TransactionTypeService} from '../../services/transaction-types.service';
import {AddEditTransactionTypesComponent} from './add-edit-transaction-types/add-edit-transaction-types.component';

@Component({
  selector: 'app-transaction-types',
  templateUrl: './transaction-types.component.html',
  styleUrls: ['./transaction-types.component.css']
})
export class TransactionTypesComponent implements OnInit {

  public transactionTypes: TransactionType[] = [];

  public page: number;
  public total: number;
  public max: number;

  constructor(private transactionTypesService: TransactionTypeService, private dialog: MatDialog) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.getTransactionTypes();
  }

  // tslint:disable-next-line:variable-name
  getTransactionTypes(page?: number, query?: string): void {
    this.page = page;
    if (page == null) {
      this.page = 1;
    }

    this.transactionTypesService.getTransactionTypes(this.page, this.max)
      .subscribe(({transactionTypes, total}) => {
        this.transactionTypes = transactionTypes;
        this.total = total;
      }, () => {
        SwalTool.onError('Error al cargar los asesores');
      });
  }

  onPageChange(page): void {
    this.getTransactionTypes(page);
  }

  openModal(typeModal: string, transactionType?: TransactionType): void {
    const dialogRef = this.dialog.open(AddEditTransactionTypesComponent, {width: '50%', panelClass: 'card'});
    switch (typeModal) {
      case 'C':
        dialogRef.componentInstance.title = 'Agregar tipo de transación';
        dialogRef.componentInstance.type = TypeModal.CREATE;
        break;
      case 'E':
        dialogRef.componentInstance.title = 'Actualizar tipo de transación';
        dialogRef.componentInstance.type = TypeModal.EDIT;
        dialogRef.componentInstance.transactionType = transactionType;
        break;
      default:
        dialogRef.componentInstance.title = 'Ver tipo de transación';
        dialogRef.componentInstance.type = TypeModal.SHOW;
        dialogRef.componentInstance.transactionType = transactionType;
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'YES') {
        this.getTransactionTypes(this.page);
      }
    });
  }

  deleteTransactionType(transactionType: TransactionType): void {
    Swal.fire({
      title: '¿Borrar tipo de transación?',
      text: `Está apunto de borrar el tipo de transación ${transactionType.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.transactionTypesService.deleteTransactionType(transactionType)
          .subscribe(() => {
            this.getTransactionTypes(this.page);
            SwalTool.onMessage('Tipo de transación eliminado', `El tipo de transación ${transactionType.name} fue eliminado correctamente`);
          }, () => {
            SwalTool.onError('Error al eliminar el tipo de transación');
          });
      }
    });
  }

  getClassBadge(item: string): string {
    let classBadge: string;
    switch (item) {
      case 'A': {
        classBadge = 'badge badge-success';
        break;
      }
      default: {
        classBadge = 'badge badge-danger';
        break;
      }
    }
    return classBadge;
  }

}
