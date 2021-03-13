import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Lawyer} from '../../models/lawyer.model';

@Component({
  selector: 'app-card-lawyer-detail',
  templateUrl: './card-lawyer-detail.component.html',
  styleUrls: ['./card-lawyer-detail.component.css']
})
export class CardLawyerDetailComponent implements OnInit, OnChanges {

  @Input()
  lawyer: Lawyer;
  public name = '';
  public status = '';
  public documentType = '';
  public documentNumber = '';
  public email = '';
  public phone = '';
  public professionalCard = '';
  public created: Date | string;
  public updated: Date | string;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.lawyer !== undefined) {
      this.name = this.lawyer.name;
      this.documentType = this.lawyer.document_type;
      this.documentNumber = this.lawyer.document_number;
      this.email = this.lawyer.email;
      this.phone = this.lawyer.phone;
      this.status = this.lawyer.status;
      this.created = this.lawyer.created_at ? this.lawyer.created_at : '';
      this.updated = this.lawyer.updated_at ? this.lawyer.updated_at : '';
      this.professionalCard = this.verifyProfessionalCard(this.lawyer.professional_card);
    }
  }

  verifyProfessionalCard(professionalCard: string): string {
    if (professionalCard.search('placeholder.com')) {
      return this.lawyer.professional_card;
    }
    return professionalCard;
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
