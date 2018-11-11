import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CznMenuItemComponent } from './czn-menu-item.component';

describe('CznMenuItemComponent', () => {
  let component: CznMenuItemComponent;
  let fixture: ComponentFixture<CznMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CznMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CznMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
