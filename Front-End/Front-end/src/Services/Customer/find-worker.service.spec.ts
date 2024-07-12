import { TestBed } from '@angular/core/testing';

import { FindWorkerService } from './find-worker.service';

describe('FindWorkerService', () => {
  let service: FindWorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindWorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
