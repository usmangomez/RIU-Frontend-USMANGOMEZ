import { TestBed } from '@angular/core/testing';

import { SecondLevelService } from './second-level-service';

describe('SecondLevels', () => {
  let service: SecondLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecondLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
