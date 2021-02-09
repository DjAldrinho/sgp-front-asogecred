import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

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

  constructor(private clientService: ClientsService) {
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
      page = 1;
    }
    this.clientService.getClients(this.page, this.max)
    .subscribe(resp => {
      this.clients = resp.clients;
      this.total = resp.total;
      console.log(this.clients);
    }, err => {
      Swal.fire('Error', "Ha ocurrido un error inesperado", 'error');
    });
  }

  onPageChange(page) {
    this.getClients(page);
  }

  deleteClient(client: Client){
    Swal.fire({
      title: '¿Borrar cliente?',
      text: `Está apunto de borrar el cliente ${client.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar'
    }).then((result) => {
      if(result.value){
        this.clientService.deleteClient(client)
        .subscribe(resp => {
          this.getClients();
          Swal.fire('Cliente eliminado', `El cliente ${client.name} fue eliminado correctamente`, 'success');
        }, err => {
          Swal.fire('Error', err.error.msg, 'error');
        });
      }
    });
  }

}
