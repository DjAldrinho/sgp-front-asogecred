import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-processes',
  templateUrl: './table-processes.component.html',
  styleUrls: ['./table-processes.component.css']
})
export class TableProcessesComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  items: any[];
  @Input()
  pagination = false;
  @Input()
  idPg: string;
  @Input()
  totalPaginate: number;
  @Input()
  maxSize = 6;
  public page: number;
  public max: number;

  // tslint:disable-next-line:no-output-native
  @Output() processChange: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.page = 1;
    this.max = 10;
  }

  ngOnInit(): void {
  }

  getDate(item: any): string {
    return item.created_at ? item.created_at : item.updated_at;
  }

  onPageChange(page): void {
    this.page = page;
    this.processChange.emit(page);
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
