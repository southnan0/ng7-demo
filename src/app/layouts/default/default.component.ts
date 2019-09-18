import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import appData from '../../config/app-data';
import _ from 'lodash';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.styl']
})
export class DefaultComponent implements OnInit {
  private menu: any[];
  private title: string;

  constructor(
    private route:ActivatedRoute, 
              private location:Location,
    private router: Router
  ) {
    this.menu = _.cloneDeep(appData.menu);
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event=>event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.resetMenuData();
      })
  }

  resetMenuData(): void{
    this.menu.forEach((item) => {
      item.open = false;
      item.children.forEach((child) => {
        if(child.link === this.location.path()){
          child.selected = true;
          item.open = true;
          this.title = child.text;
        }else{
          child.selected = false;
        }
      });
    });
  }

  getBreadCrumbData(): void{
    const arr = [];


  }
}
