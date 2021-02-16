import {Component, OnInit} from '@angular/core';
import {Payroll} from '../../models/payroll.model';
import {PayrollsService} from '../../services/payrolls.service';
import {SwalTool} from '../../tools/swal.tool';
import Swal from 'sweetalert2';
import {TypeModal} from '../../enums/modals.enum';
import {AddEditPayrollsComponent} from './add-edit-payrolls/add-edit-payrolls.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-payrolls',
  templateUrl: './payrolls.component.html',
  styleUrls: ['./payrolls.component.css']
})
export class PayrollsComponent implements OnInit {

  public payrolls: Payroll[] = [];

  public page: number;
  public total: number;
  public max: number;

  constructor(private payrollService: PayrollsService, private dialog: MatDialog) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.getPayrolls();
  }

  // tslint:disable-next-line:variable-name
  getPayrolls(page?: number, query?: string): void {
    this.page = page;
    if (page == null) {
      this.page = 1;
    }

    this.payrollService.getPayrolls(this.page, this.max)
      .subscribe(({payrolls, total}) => {
        this.payrolls = payrolls;
        this.total = total;
      }, () => {
        SwalTool.onError('Error al cargar las pagadurias');
      });
  }

  onPageChange(page): void {
    this.getPayrolls(page);
  }

  openModal(typeModal: string, payroll?: Payroll): void {
    const dialogRef = this.dialog.open(AddEditPayrollsComponent, {width: '50%', panelClass: 'card'});
    switch (typeModal) {
      case 'C':
        dialogRef.componentInstance.title = 'Agregar pagaduría';
        dialogRef.componentInstance.type = TypeModal.CREATE;
        break;
      case 'E':
        dialogRef.componentInstance.title = 'Actualizar pagaduría';
        dialogRef.componentInstance.type = TypeModal.EDIT;
        dialogRef.componentInstance.payroll = payroll;
        break;
      default:
        dialogRef.componentInstance.title = 'Ver pagaduría';
        dialogRef.componentInstance.type = TypeModal.SHOW;
        dialogRef.componentInstance.payroll = payroll;
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'YES') {
        this.getPayrolls(this.page);
      }
    });
  }

  deletePayroll(payroll: Payroll): void {
    Swal.fire({
      title: '¿Borrar pagaduría?',
      text: `Está apunto de borrar la pagaduría ${payroll.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.payrollService.deletePayroll(payroll)
          .subscribe(() => {
            this.getPayrolls(this.page);
            SwalTool.onMessage('Pagaduría eliminada', `La pagaduría ${payroll.name} fue eliminada correctamente`);
          }, () => {
            SwalTool.onError('Error al eliminar la pagaduría');
          });
      }
    });

  }
}
