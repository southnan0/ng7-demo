import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrganizeComponent } from './modal-organize.component';

describe('ModalOrganizeComponent', () => {
  let component: ModalOrganizeComponent;
  let fixture: ComponentFixture<ModalOrganizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOrganizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrganizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
