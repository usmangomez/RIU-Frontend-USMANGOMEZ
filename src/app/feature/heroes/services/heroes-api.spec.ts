import { TestBed } from '@angular/core/testing';

import { HeroesApi } from './heroes-api';

describe('HeroesApi', () => {
  let service: HeroesApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
