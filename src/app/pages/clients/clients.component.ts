import {Component, OnInit} from '@angular/core';
import {Client} from 'src/app/models/client.model';
import {ClientsService} from 'src/app/services/clients.service';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {AddEditClientComponent} from './add-edit-client/add-edit-client.component';
import {TypeModal} from 'src/app/enums/modals.enum';
import {SwalTool} from 'src/app/tools/swal.tool';
import {ModalMassiveLoadComponent} from './modal-massive-load/modal-massive-load.component';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public clients: Client[] = [];
  public searchClientForm: FormGroup;

  public page: number;
  public total: number;
  public max: number;

  constructor(private clientService: ClientsService,
              private dialog: MatDialog,
              private fb: FormBuilder) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.getClients();
    this.initFormSearch();
  }

  private initFormSearch(): void {
    this.searchClientForm = this.fb.group({
      clientSearch: ['']
    });
  }

  getFormField(field: string): AbstractControl {
    return this.searchClientForm.get(field);
  }

  clientsFilter(page?: number): void {
    if (this.searchClientForm.valid) {
      this.page = page ?? null;
      const clientSearch = this.getFormField('clientSearch').value
        ? this.getFormField('clientSearch').value
        : null;
      if (clientSearch) {
        this.clientService.getClients(this.page, this.max, clientSearch)
          .subscribe(resp => {
            this.clients = resp.clients;
            this.total = resp.total;
          }, () => {
            SwalTool.onError('Error al cargar los resultados de la busqueda');
          });
      }

    }
  }

  clearFilter(): void {
    this.searchClientForm.patchValue({clientSearch: null});
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
      }, () => {
        SwalTool.onError('Error al cargar los clientes');
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
      if (result === 'YES') {
        this.getClients(this.page);
      }
    });
  }

  openModalMassiveLoad(): void {
    const dialogRef = this.dialog.open(ModalMassiveLoadComponent, {width: '50%', panelClass: 'card'});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'YES') {
        this.getClients();
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
          .subscribe(() => {
            this.getClients(this.page);
            SwalTool.onMessage('Cliente eliminado', `El cliente ${client.name} fue eliminado correctamente`);
          }, () => {
            SwalTool.onError('Error al eliminar el cliente');
          });
      }
    });
  }

}
