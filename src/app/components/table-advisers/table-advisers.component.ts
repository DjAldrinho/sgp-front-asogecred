import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-advisers',
  templateUrl: './table-advisers.component.html',
  styleUrls: ['./table-advisers.component.css']
})
export class TableAdvisersComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  credits: any[];
  @Input()
  pagination = false;
  @Input()
  idPg: string;
  @Input()
  totalPaginate: number;
  public page: number;
  public max: number;

  // tslint:disable-next-line:no-output-native
  @Output() creditAdviserChange: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.page = 1;
    this.max = 10;
  }

  ngOnInit(): void {
  }

  onPageChange(page): void {
    this.page = page;
    this.creditAdviserChange.emit(page);
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
