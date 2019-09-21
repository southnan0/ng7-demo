import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CznMenuItemComponent } from './czn-menu-item/czn-menu-item.component';
import { CznMenuDirective } from './czn-menu.directive';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [CznMenuItemComponent, CznMenuDirective],
  exports: [CznMenuItemComponent, CznMenuDirective]
})
export class CznMenuModule { }
