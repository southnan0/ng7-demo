import {Component, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {Refund} from '../refund';
import {LoggerService} from '../logger.service';

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.styl'],
  providers: [LoggerService]
})
export class FinancialComponent implements OnInit {

  constructor(private modalService: NzModalService, private logger: LoggerService) {
  }

  dataSet = [
    new Refund(1, new Date().getTime()),
    new Refund(2, new Date().getTime()),
  ];

  showCancelConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<b>确定取消退款单？</b>',
      nzContent: '',
      nzOnOk: () => console.log('OK')
    });
  }

  showRefundConfirm(): void {
    this.modalService.confirm({
      nzTitle: '<b>确定执行退款？</b>',
      nzOnOk: () => console.log('OK')
    });
  }

  ngOnInit() {
    this.logger.log('OnInit');
  }

}
