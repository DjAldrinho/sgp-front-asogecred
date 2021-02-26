import {Component, OnInit} from '@angular/core';
import {Credit} from 'src/app/models/credit.model';
import {CreditsService} from 'src/app/services/credits.service';
import {SwalTool} from 'src/app/tools/swal.tool';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {

  public credits: Credit[] = [];

  public page: number;
  public total: number;
  public max: number;

  constructor(private creditService: CreditsService) {
    this.page = 1;
    this.total = 0;
    this.max = 10;
  }


  ngOnInit(): void {
    this.getCredits();
  }

  getCredits(page?: number, query?: string): void {
    this.page = page;
    if (page == null) {
      this.page = 1;
    }
    this.creditService.getCredits(this.page, this.max)
      .subscribe(resp => {
        this.credits = resp.credits;
        this.total = resp.total;
        console.log(this.credits);
      }, () => {
        SwalTool.onError('Error al cargar los créditos');
      });
  }

  onPageChange(page): void {
    this.getCredits(page);
  }

}
