import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HeroesApi } from './heroes-api';

describe('HeroesApi', () => {
  let service: HeroesApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(HeroesApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getHeroes should call GET /heroes with pagination params', () => {
    const mockResponse = {
      data: [], pages: 1, items: 0, first: 1, prev: null, next: null, last: 1,
    };
    service.getHeroes('hero', 1, 10).subscribe();
    const req = httpMock.expectOne((r) => r.url.includes('/heroes'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('name_contains')).toBe('hero');
    expect(req.request.params.get('_page')).toBe('1');
    req.flush(mockResponse);
  });

  it('getHeroes without name should not include name_contains param', () => {
    const mockResponse = {
      data: [], pages: 1, items: 0, first: 1, prev: null, next: null, last: 1,
    };
    service.getHeroes().subscribe();
    const req = httpMock.expectOne((r) => r.url.includes('/heroes'));
    expect(req.request.params.has('name_contains')).toBeFalse();
    req.flush(mockResponse);
  });

  it('getHeroById should call GET /heroes/:id', () => {
    service.getHeroById('42').subscribe();
    const req = httpMock.expectOne((r) => r.url.includes('/heroes/42'));
    expect(req.request.method).toBe('GET');
    req.flush({ id: '42', name: 'Test' });
  });

  it('getPowers should call GET /powers', () => {
    service.getPowers().subscribe();
    const req = httpMock.expectOne((r) => r.url.includes('/powers'));
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('getPublishers should call GET /publishers', () => {
    service.getPublishers().subscribe();
    const req = httpMock.expectOne((r) => r.url.includes('/publishers'));
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('postHero should call POST /heroes with body', () => {
    const body = { name: 'Hero', powerId: '1', publisherId: '1', firstAppearance: 2000 };
    service.postHero(body).subscribe();
    const req = httpMock.expectOne((r) => r.url.includes('/heroes'));
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(body);
    req.flush({ id: '99', ...body });
  });

  it('putHero should call PUT /heroes/:id with body', () => {
    const body = { name: 'Hero', powerId: '1', publisherId: '1', firstAppearance: 2000 };
    service.putHero('1', body).subscribe();
    const req = httpMock.expectOne((r) => r.url.includes('/heroes/1'));
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(body);
    req.flush({ id: '1', ...body });
  });

  it('deleteHero should call DELETE /heroes/:id', () => {
    service.deleteHero('1').subscribe();
    const req = httpMock.expectOne((r) => r.url.includes('/heroes/1'));
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
