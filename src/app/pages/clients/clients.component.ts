import {Component, OnInit} from '@angular/core';
import {Client} from 'src/app/models/client.model';
import {ClientsService} from 'src/app/services/clients.service';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {AddEditClientComponent} from './add-edit-client/add-edit-client.component';
import { TypeModal } from 'src/app/enums/modals.enum';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public clients: Client[] = [];

  public page: number;
  public total: number;
  public max: number;

  constructor(private clientService: ClientsService,
              private dialog: MatDialog,) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(page?: number, query?: string): void {
    this.page = page;
    if (page == null) {
      this.page = 1;
    }
    this.clientService.getClients(this.page, this.max)
      .subscribe(resp => {
        this.clients = resp.clients;
        this.total = resp.total;
        console.log(this.clients);
      }, err => {
        Swal.fire('Error', 'Ha ocurrido un error inesperado', 'error');
      });
  }

  onPageChange(page): void {
    this.getClients(page);
  }

  openModal(typeModal: string, client?: Client): void {
    const dialogRef = this.dialog.open(AddEditClientComponent, {width: '50%', panelClass: 'card'});
    switch (typeModal) {
      case 'C':
        dialogRef.componentInstance.title = 'Agregar cliente';
        dialogRef.componentInstance.type = TypeModal.CREATE;
        break;
      case 'E':
        dialogRef.componentInstance.title = 'Actualizar cliente';
        dialogRef.componentInstance.type = TypeModal.EDIT;
        dialogRef.componentInstance.client = client;
        break;
      default:
        dialogRef.componentInstance.title = 'Ver cliente';
        dialogRef.componentInstance.type = TypeModal.SHOW;
        dialogRef.componentInstance.client = client;
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result == 'YES') {
        this.getClients(this.page);
      }
    });
  }

  deleteClient(client: Client): void {
    Swal.fire({
      title: '¿Borrar cliente?',
      text: `Está apunto de borrar el cliente ${client.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(client)
          .subscribe(resp => {
            this.getClients(this.page);
            Swal.fire('Cliente eliminado', `El cliente ${client.name} fue eliminado correctamente`, 'success');
          }, err => {
            Swal.fire('Error', err.error.msg, 'error');
          });
      }
    });
  }

}
