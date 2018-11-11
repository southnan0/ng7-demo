import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-czn-menu-item',
  templateUrl: './czn-menu-item.component.html',
  styleUrls: ['./czn-menu-item.component.styl']
})
export class CznMenuItemComponent implements OnInit {
  @Input() link: string;

  constructor() {
  }

  ngOnInit() {
  }

}
