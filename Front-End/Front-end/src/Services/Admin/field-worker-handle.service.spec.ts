import { TestBed } from '@angular/core/testing';

import { FieldWorkerHandleService } from './field-worker-handle.service';

describe('FieldWorkerHandleService', () => {
  let service: FieldWorkerHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldWorkerHandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
