import { TestBed } from '@angular/core/testing';

import { OrganizeService } from './organize.service';

describe('OrganizeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrganizeService = TestBed.get(OrganizeService);
    expect(service).toBeTruthy();
  });
});
