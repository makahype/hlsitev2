import { TestBed } from '@angular/core/testing';

import { DancingdotsService } from './dancingdots.service';

describe('DancingdotsService', () => {
  let service: DancingdotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DancingdotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
