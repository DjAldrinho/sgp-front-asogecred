import {Component, OnInit} from '@angular/core';
import {Process} from 'src/app/models/process.model';
import {ProcessesService} from 'src/app/services/processes.service';
import {SwalTool} from 'src/app/tools/swal.tool';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.css']
})
export class ProcessesComponent implements OnInit {

  public processes: Process[] = [];
  public page: number;
  public total: number;
  public max: number;

  constructor(private processesService: ProcessesService) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }

  ngOnInit(): void {
    this.getProcesses();
  }

  getProcesses(page?: number, query?: string): void {
    this.page = page;
    if (page == null) {
      this.page = 1;
    }
    this.processesService.getProcesses(this.page, this.max)
      .subscribe(resp => {
        this.processes = resp.processes;
        this.total = resp.total;
      }, () => {
        SwalTool.onError('Error al cargar los procesos');
      });
  }

  onPageChange(page): void {
    this.getProcesses(page);
  }

  getClassBadge(item: string): string {
    let classBadge: string;
    switch (item) {
      case 'P': {
        classBadge = 'badge badge-warning';
        break;
      }
      case 'A': {
        classBadge = 'badge badge-success';
        break;
      }
      case 'F': {
        classBadge = 'badge badge-secondary';
        break;
      }
      case 'I': {
        classBadge = 'badge badge-danger';
        break;
      }
      case 'C': {
        classBadge = 'badge badge-danger';
        break;
      }
      default: {
        classBadge = 'badge badge-primary';
        break;
      }
    }
    return classBadge;
  }

}
