import { TestBed } from '@angular/core/testing';

import { FieldWorkersService } from './field-workers.service';

describe('FieldWorkersService', () => {
  let service: FieldWorkersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldWorkersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
