import {Component, OnInit} from '@angular/core';
import {Adviser} from '../../models/adviser.model';
import {AdvisersService} from '../../services/advisers.service';
import {MatDialog} from '@angular/material/dialog';
import {SwalTool} from '../../tools/swal.tool';
import Swal from 'sweetalert2';
import {AddEditAdvisersComponent} from './add-edit-advisers/add-edit-advisers.component';
import {TypeModal} from '../../enums/modals.enum';

@Component({
  selector: 'app-advisers',
  templateUrl: './advisers.component.html',
  styleUrls: ['./advisers.component.css']
})
export class AdvisersComponent implements OnInit {

  public advisers: Adviser[] = [];

  public page: number;
  public total: number;
  public max: number;

  constructor(private adviserService: AdvisersService, private dialog: MatDialog) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.getAdvisers();
  }

  // tslint:disable-next-line:variable-name
  getAdvisers(page?: number, query?: string): void {
    this.page = page;
    if (page == null) {
      this.page = 1;
    }

    this.adviserService.getAdvisers(this.page, this.max)
      .subscribe(({advisers, total}) => {
        this.advisers = advisers;
        this.total = total;
      }, () => {
        SwalTool.onError('Error al cargar los asesores');
      });
  }

  onPageChange(page): void {
    this.getAdvisers(page);
  }

  openModal(typeModal: string, adviser?: Adviser): void {
    const dialogRef = this.dialog.open(AddEditAdvisersComponent, {width: '50%', panelClass: 'card'});
    switch (typeModal) {
      case 'C':
        dialogRef.componentInstance.title = 'Agregar asesor';
        dialogRef.componentInstance.type = TypeModal.CREATE;
        break;
      case 'E':
        dialogRef.componentInstance.title = 'Actualizar asesor';
        dialogRef.componentInstance.type = TypeModal.EDIT;
        dialogRef.componentInstance.adviser = adviser;
        break;
      default:
        dialogRef.componentInstance.title = 'Ver asesor';
        dialogRef.componentInstance.type = TypeModal.SHOW;
        dialogRef.componentInstance.adviser = adviser;
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'YES') {
        this.getAdvisers(this.page);
      }
    });
  }

  deleteAdviser(adviser: Adviser): void {
    Swal.fire({
      title: '¿Borrar asesor?',
      text: `Está apunto de borrar el asesor ${adviser.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.adviserService.deleteAdviser(adviser)
          .subscribe(() => {
            this.getAdvisers(this.page);
            SwalTool.onMessage('Asesor eliminado', `El asesor ${adviser.name} fue eliminado correctamente`);
          }, () => {
            SwalTool.onError('Error al eliminar el asesor');
          });
      }
    });
  }

}
