import {EventEmitter, Output} from '@angular/core';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-transactions',
  templateUrl: './table-transactions.component.html',
  styleUrls: ['./table-transactions.component.css']
})
export class TableTransactionsComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  items: any[];
  @Input()
  pagination = false;
  @Input()
  idPg: string;
  @Input()
  total?: string;
  @Input()
  totalPaginate: number;
  @Input()
  maxSize = 5;
  public page: number;
  public max: number;

  // tslint:disable-next-line:no-output-native
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.page = 1;
    this.max = 5;
  }

  ngOnInit(): void {
  }

  getDate(item: any): string {
    return item.created_at ? item.created_at : item.updated_at;
  }

  onPageChange(page): void {
    this.page = page;
    this.pageChange.emit(page);
  }

  getClassBadge(item: string): string {
    let classBadge: string;
    switch (item) {
      case 'deposit': {
        classBadge = 'badge badge-success';
        break;
      }
      case 'retire': {
        classBadge = 'badge badge-danger';
        break;
      }
      case 'credit_payment': {
        classBadge = 'badge badge-success';
        break;
      }
      case 'commission': {
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
