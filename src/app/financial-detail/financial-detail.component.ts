import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-financial-detail',
  templateUrl: './financial-detail.component.html',
  styleUrls: ['./financial-detail.component.styl']
})
export class FinancialDetailComponent implements OnInit {

  constructor() {
  }

  basicInfo = {
    orderNo: 123456,
    time: (new Date()).getTime()
  };

  ngOnInit() {
  }

}
