import {Component, OnInit} from '@angular/core';
import {Lawyer} from '../../models/lawyer.model';
import {LawyersService} from '../../services/lawyers.service';
import {SwalTool} from '../../tools/swal.tool';
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';
import {AddEditLawyerComponent} from './add-edit-lawyer/add-edit-lawyer.component';
import {TypeModal} from '../../enums/modals.enum';

@Component({
  selector: 'app-lawyers',
  templateUrl: './lawyers.component.html',
  styleUrls: ['./lawyers.component.css']
})
export class LawyersComponent implements OnInit {

  public lawyers: Lawyer[] = [];

  public page: number;
  public total: number;
  public max: number;

  constructor(private lawyerService: LawyersService, private dialog: MatDialog) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.getLawyers();
  }

  onPageChange(page): void {
    this.getLawyers(page);
  }

  openModal(typeModal: string, lawyer?: Lawyer): void {
    const dialogRef = this.dialog.open(AddEditLawyerComponent, {width: '50%', panelClass: 'card'});
    switch (typeModal) {
      case 'C':
        dialogRef.componentInstance.title = 'Agregar abogado';
        dialogRef.componentInstance.type = TypeModal.CREATE;
        break;
      case 'E':
        dialogRef.componentInstance.title = 'Actualizar abogado';
        dialogRef.componentInstance.type = TypeModal.EDIT;
        dialogRef.componentInstance.lawyer = lawyer;
        break;
      default:
        dialogRef.componentInstance.title = 'Ver abogado';
        dialogRef.componentInstance.type = TypeModal.SHOW;
        dialogRef.componentInstance.lawyer = lawyer;
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'YES') {
        this.getLawyers(this.page);
      }
    });
  }

  getLawyers(page?: number, query?: string): void {
    this.page = page;
    if (page == null) {
      this.page = 1;
    }

    this.lawyerService.getLawyers(this.page, this.max)
      .subscribe(resp => {
        this.lawyers = resp.lawyers;
        this.total = resp.total;
      }, () => {
        SwalTool.onError('Error al cargar las abogados');
      });
  }

  deleteLawyer(lawyer: Lawyer): void {
    Swal.fire({
      title: '¿Borrar abogado?',
      text: `Está apunto de borrar el abogado ${lawyer.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.lawyerService.deleteLawyer(lawyer)
          .subscribe(resp => {
            this.getLawyers(this.page);
            SwalTool.onMessage('Abogado eliminado', `El abogado ${lawyer.name} fue eliminado correctamente`);
          }, () => {
            SwalTool.onError("Error al eliminar el abogado");
          });
      }
    });
  }

}
