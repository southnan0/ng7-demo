import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.styl']
})
export class OrganizeComponent implements OnInit {
  addOrganizeVisible: boolean = true;
  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      orgName: ['', [Validators.required]],
    });
  }

  ngOnInit() {
  }

  handleCancel(type: string): void {
    this[type] = false;
  }

  handleAddOrganize() {
    console.info(this.validateForm.value);
  }
}
