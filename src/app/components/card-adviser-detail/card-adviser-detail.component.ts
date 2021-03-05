import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Adviser} from '../../models/adviser.model';

@Component({
  selector: 'app-card-adviser-detail',
  templateUrl: './card-adviser-detail.component.html',
  styleUrls: ['./card-adviser-detail.component.css']
})
export class CardAdviserDetailComponent implements OnInit, OnChanges {

  @Input()
  adviser: Adviser;
  public name = '';
  public status = '';
  public commissionsTotal = '';
  public phone = '';
  public created: Date | string;
  public updated: Date | string;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.adviser !== undefined) {
      this.name = this.adviser.name;
      this.commissionsTotal = this.adviser.total_commissions;
      this.phone = this.adviser.phone;
      this.status = this.adviser.status;
      this.created = this.adviser.created_at ? this.adviser.created_at : '';
      this.updated = this.adviser.updated_at ? this.adviser.updated_at : '';
    }
  }

  getClassBadge(item: string): string {
    let classBadge: string;
    switch (item) {
      case 'A': {
        classBadge = 'badge badge-outline-success';
        break;
      }
      case 'I': {
        classBadge = 'badge badge-outline-danger';
        break;
      }
      default: {
        classBadge = 'badge badge-outline-primary';
        break;
      }
    }
    return classBadge;
  }

}
