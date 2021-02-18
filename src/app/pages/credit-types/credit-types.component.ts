import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SwalTool} from '../../tools/swal.tool';
import {CreditTypesService} from '../../services/credit-types.service';
import {CreditType} from '../../models/credit-type.model';
import {TypeModal} from '../../enums/modals.enum';
import Swal from 'sweetalert2';
import {AddEditCreditTypesComponent} from './add-edit-credit-types/add-edit-credit-types.component';

@Component({
  selector: 'app-credit-types',
  templateUrl: './credit-types.component.html',
  styleUrls: ['./credit-types.component.css']
})
export class CreditTypesComponent implements OnInit {

  public creditTypes: CreditType[] = [];

  public page: number;
  public total: number;
  public max: number;

  constructor(private creditTypesService: CreditTypesService, private dialog: MatDialog) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.getCreditTypes();
  }

  // tslint:disable-next-line:variable-name
  getCreditTypes(page?: number, query?: string): void {
    this.page = page;
    if (page == null) {
      this.page = 1;
    }

    this.creditTypesService.getCreditTypes(this.page, this.max)
      .subscribe(({creditTypes, total}) => {
        this.creditTypes = creditTypes;
        this.total = total;
      }, () => {
        SwalTool.onError('Error al cargar los tipos de credito');
      });
  }

  onPageChange(page): void {
    this.getCreditTypes(page);
  }

  openModal(typeModal: string, creditType?: CreditType): void {
    const dialogRef = this.dialog.open(AddEditCreditTypesComponent, {width: '50%', panelClass: 'card'});
    switch (typeModal) {
      case 'C':
        dialogRef.componentInstance.title = 'Agregar tipo de credito';
        dialogRef.componentInstance.type = TypeModal.CREATE;
        break;
      case 'E':
        dialogRef.componentInstance.title = 'Actualizar tipo de credito';
        dialogRef.componentInstance.type = TypeModal.EDIT;
        dialogRef.componentInstance.creditType = creditType;
        break;
      default:
        dialogRef.componentInstance.title = 'Ver tipo de credito';
        dialogRef.componentInstance.type = TypeModal.SHOW;
        dialogRef.componentInstance.creditType = creditType;
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'YES') {
        this.getCreditTypes(this.page);
      }
    });
  }

  deleteCreditType(creditType: CreditType): void {
    Swal.fire({
      title: '¿Borrar tipo de credito?',
      text: `Está apunto de borrar el tipo de credito ${creditType.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.creditTypesService.deleteCreditType(creditType)
          .subscribe(() => {
            this.getCreditTypes(this.page);
            SwalTool.onMessage('Tipo de credito eliminado', `El tipo de credito ${creditType.name} fue eliminado correctamente`);
          }, () => {
            SwalTool.onError('Error al eliminar el tipo de credito');
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
