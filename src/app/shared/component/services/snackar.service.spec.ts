import { TestBed } from '@angular/core/testing';

import { SnackarService } from './snackar.service';

describe('SnackarService', () => {
  let service: SnackarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
