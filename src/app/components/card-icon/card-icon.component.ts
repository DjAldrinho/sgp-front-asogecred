import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-card-icon',
  templateUrl: './card-icon.component.html',
  styleUrls: ['./card-icon.component.css']
})
export class CardIconComponent implements OnInit {
  @Input()
  icon: string;
  @Input()
  title: string;
  @Input()
  value: string | number;
  @Input()
  money = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  getClass(text: string): string {
    let classValue: string;
    if (text.length <= 5) {
      classValue = 'lead text-center title-lg';
    } else if (text.length > 5 && text.length <= 13) {
      classValue = 'lead text-center title-md';
    } else if (text.length > 13) {
      classValue = 'lead text-center title-sm';
    } else {
      classValue = 'lead text-center title-lg';
    }
    return classValue;
  }

}
