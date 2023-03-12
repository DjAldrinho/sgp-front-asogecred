import {EventEmitter, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../../models/transaction.model';

@Component({
  selector: 'app-table-transactions',
  templateUrl: './table-transactions.component.html',
  styleUrls: ['./table-transactions.component.css']
})
export class TableTransactionsComponent implements OnInit, OnChanges {

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
  max = 5;
  @Input()
  maxSize = 5;
  @Input()
  count: number;
  @Input()
  commentary = false;
  @Input()
  deleteTransaction = false;
  public page: number;
  public transactions: any[];
  public counter: number;

  // tslint:disable-next-line:no-output-native
  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  // tslint:disable-next-line:no-output-native no-output-on-prefix
  @Output() onDeleteTransaction: EventEmitter<Transaction> = new EventEmitter();

  constructor() {
    this.page = 1;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.items.length > 0) {
      this.counter = ((this.page * this.max) - this.max);
      this.transactions = this.items.map((item) => {
        return {count: ++this.counter, ...item};
      });
    }
  }

  getDate(item: any): string {
    return item.transaction_date ? item.transaction_date : item.created_at;
  }

  onPageChange(page): void {
    this.page = page;
    this.pageChange.emit(page);
  }

  getDeleteTransaction(item: Transaction): void {
    if (item.origin === 'deposit') {
      this.onDeleteTransaction.emit(item);
    }
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
      case 'process_payment': {
        classBadge = 'badge badge-success';
        break;
      }
      case 'credit': {
        classBadge = 'badge badge-primary';
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
