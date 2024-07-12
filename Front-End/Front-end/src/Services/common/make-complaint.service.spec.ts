import { TestBed } from '@angular/core/testing';

import { MakeComplaintService } from './make-complaint.service';

describe('MakeComplaintService', () => {
  let service: MakeComplaintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakeComplaintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
