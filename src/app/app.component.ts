import {Component} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd, NavigationStart} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  private layout: string;

  constructor(private router: Router) {
    this.layout = 'default';

    this.router.events
      .pipe(filter(evt => evt instanceof NavigationStart))
      .subscribe((evt:NavigationStart) => {
        if(evt.url.match('/user/login')){
          this.layout = 'full';
        }else {
          this.layout = 'default';
        }
      })
  }
}
