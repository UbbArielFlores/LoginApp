import { TestBed } from '@angular/core/testing';

import { ConBackendService } from './con-backend.service';

describe('ConBackendService', () => {
  let service: ConBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
