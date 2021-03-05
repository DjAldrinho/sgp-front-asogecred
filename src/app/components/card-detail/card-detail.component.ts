import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Account} from '../../models/account.model';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit, OnChanges {

  @Input()
  account: Account;
  public name = '';
  public accountNumber = '';
  public status = '';
  public value = 0;
  public oldValue = 0;
  public created: Date | string;
  public updated: Date | string;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.account !== undefined) {
      this.name = this.account.name;
      this.accountNumber = this.account.account_number;
      this.status = this.account.status;
      this.value = parseFloat(this.account.value);
      this.oldValue = parseFloat(this.account.old_value);
      this.created = this.account.created_at ? this.account.created_at : '';
      this.updated = this.account.updated_at ? this.account.updated_at : '';
    }
  }

  getClassBadge(item: string): string {
    let classBadge: string;
    switch (item) {
      case 'A': {
        classBadge = 'w-50 badge badge-outline-success';
        break;
      }
      case 'I': {
        classBadge = 'w-50 badge badge-outline-danger';
        break;
      }
      default: {
        classBadge = 'w-50 badge badge-outline-primary';
        break;
      }
    }
    return classBadge;
  }

}
