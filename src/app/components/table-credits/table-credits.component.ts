import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-table-credits',
  templateUrl: './table-credits.component.html',
  styleUrls: ['./table-credits.component.css']
})
export class TableCreditsComponent implements OnInit {

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
  @Output() creditChange: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.page = 1;
    this.max = 5;
  }

  ngOnInit(): void {
  }

  getDate(credit: any): string {
    return credit.created_at ? credit.created_at : credit.updated_at;
  }

  onPageChange(page): void {
    this.page = page;
    this.creditChange.emit(page);
  }

}
