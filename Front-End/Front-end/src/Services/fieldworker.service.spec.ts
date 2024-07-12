import { TestBed } from '@angular/core/testing';

import { FieldworkerService } from './fieldworker.service';

describe('FieldworkerService', () => {
  let service: FieldworkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldworkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
