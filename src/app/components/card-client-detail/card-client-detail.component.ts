import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Client} from '../../models/client.model';

@Component({
  selector: 'app-card-client-detail',
  templateUrl: './card-client-detail.component.html',
  styleUrls: ['./card-client-detail.component.css']
})
export class CardClientDetailComponent implements OnInit, OnChanges {

  @Input()
  client: Client;
  public name = '';
  public status = '';
  public documentType = '';
  public documentNumber = '';
  public email = '';
  public phone = '';
  public position = 'Cargo';
  public sign = '';
  public salary: string | number = 0;
  public created: Date | string;
  public updated: Date | string;
  public clientTypes: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.client !== undefined) {
      this.name = this.client.name;
      this.documentType = this.client.document_type;
      this.documentNumber = this.client.document_number;
      this.email = this.client.email;
      this.phone = this.client.phone;
      this.position = this.client.position !== null ? this.client.position : 'Cargo';
      this.salary = this.client.salary !== null ? this.client.salary : 0;
      this.status = this.client.status;
      this.created = this.client.created_at ? this.client.created_at : '';
      this.updated = this.client.updated_at ? this.client.updated_at : '';
      this.sign = this.verifySign(this.client.sign);
      if (this.client.client_type !== null) {
        this.clientTypes = JSON.parse(this.client.client_type);
      }
    }
  }

  verifySign(sign: string): string {
    if (sign.search('placeholder.com')) {
      return this.client.sign;
    }
    return sign;
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
