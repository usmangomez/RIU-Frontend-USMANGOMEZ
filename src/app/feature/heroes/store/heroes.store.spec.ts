import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { HeroesStore } from './heroes.store';

const listResponse = {
  data: [], pages: 1, items: 0, first: 1, prev: null, next: null, last: 1,
};

describe('HeroesStore', () => {
  let store: InstanceType<typeof HeroesStore>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    });
    store = TestBed.inject(HeroesStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should have initial state', () => {
    expect(store.heroes()).toEqual([]);
    expect(store.hero()).toBeNull();
    expect(store.loading()).toBeFalse();
    expect(store.hasPrev()).toBeFalse();
    expect(store.hasNext()).toBeFalse();
  });

  it('loadHeroes should update heroes state on success', () => {
    const mockResponse = {
      data: [{ id: '1', name: 'Superman', powerId: '1', publisherId: '1', firstAppearance: 1938 }],
      pages: 2, items: 11, first: 1, prev: null, next: 2, last: 2,
    };

    store.loadHeroes({ page: 1 });

    const req = httpMock.expectOne((r) => r.url.includes('/heroes') && r.method === 'GET');
    req.flush(mockResponse);

    expect(store.heroes()).toEqual(mockResponse.data as any);
    expect(store.totalPages()).toBe(2);
    expect(store.totalItems()).toBe(11);
    expect(store.loading()).toBeFalse();
    expect(store.hasNext()).toBeTrue();
  });

  it('loadHeroes should set error on failure', () => {
    store.loadHeroes({});

    const req = httpMock.expectOne((r) => r.url.includes('/heroes') && r.method === 'GET');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(store.loading()).toBeFalse();
    expect(store.error()).toBeTruthy();
  });

  it('loadHeroById should update hero state on success', () => {
    const mockHero = { id: '1', name: 'Batman', powerId: '2', publisherId: '1', firstAppearance: 1939 };

    store.loadHeroById({ id: '1' });

    const req = httpMock.expectOne((r) => r.url.includes('/heroes/1') && r.method === 'GET');
    req.flush(mockHero);

    expect(store.hero()).toEqual(mockHero as any);
    expect(store.loading()).toBeFalse();
  });

  it('loadHeroById should set error on failure', () => {
    store.loadHeroById({ id: '999' });

    const req = httpMock.expectOne((r) => r.url.includes('/heroes/999') && r.method === 'GET');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });

    expect(store.loading()).toBeFalse();
    expect(store.error()).toBeTruthy();
  });

  it('loadCatalogs should update powers and publishers', () => {
    const mockPowers = [{ id: '1', name: 'Flight', description: 'Can fly' }];
    const mockPublishers = [{ id: '1', name: 'DC', universe: 'DC', founded: 1934 }];

    store.loadCatalogs();

    const powersReq = httpMock.expectOne((r) => r.url.includes('/powers'));
    const publishersReq = httpMock.expectOne((r) => r.url.includes('/publishers'));
    powersReq.flush(mockPowers);
    publishersReq.flush(mockPublishers);

    expect(store.powers()).toEqual(mockPowers as any);
    expect(store.publishers()).toEqual(mockPublishers as any);
    expect(store.loading()).toBeFalse();
  });

  it('deleteHero should navigate to /heroes after success', () => {
    store.deleteHero({ id: '1' });

    const deleteReq = httpMock.expectOne((r) => r.url.includes('/heroes/1') && r.method === 'DELETE');
    deleteReq.flush(null);

    const listReq = httpMock.expectOne((r) => r.url.includes('/heroes') && r.method === 'GET');
    listReq.flush(listResponse);

    expect(store.loading()).toBeFalse();
  });
});
