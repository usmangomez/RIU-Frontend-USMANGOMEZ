import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Heroes } from './heroes';
import { HeroesStore } from './store/heroes.store';

const mockStore = {
  heroes: signal<any[]>([]),
  hero: signal(null),
  powers: signal([]),
  publishers: signal([]),
  loading: signal(false),
  totalItems: signal(0),
  currentPage: signal(1),
  totalPages: signal(0),
  hasPrev: signal(false),
  hasNext: signal(false),
  error: signal(null),
  loadHeroes: jasmine.createSpy('loadHeroes'),
  loadHeroById: jasmine.createSpy('loadHeroById'),
  loadCatalogs: jasmine.createSpy('loadCatalogs'),
  createHero: jasmine.createSpy('createHero'),
  deleteHero: jasmine.createSpy('deleteHero'),
  updateHero: jasmine.createSpy('updateHero'),
};

describe('Heroes', () => {
  let component: Heroes;
  let fixture: ComponentFixture<Heroes>;
  let router: Router;

  beforeEach(async () => {
    mockStore.loadHeroes.calls.reset();

    await TestBed.configureTestingModule({
      imports: [Heroes],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
        { provide: HeroesStore, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Heroes);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadHeroes on init when heroes is empty', () => {
    expect(mockStore.loadHeroes).toHaveBeenCalled();
  });

  it('handlePaginatorChange should call loadHeroes with page params', () => {
    mockStore.loadHeroes.calls.reset();
    (component as any).handlePaginatorChange({ pageIndex: 1, pageSize: 5, length: 20 });
    expect(mockStore.loadHeroes).toHaveBeenCalledWith({ name: '', page: 2, perPage: 5 });
  });

  it('handleClickHero should navigate to hero id', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    (component as any).handleClickHero('42');
    expect(router.navigate).toHaveBeenCalledWith(['./', '42'], jasmine.anything());
  });

  it('handleAddHero should navigate to add', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    (component as any).handleAddHero();
    expect(router.navigate).toHaveBeenCalledWith(['./', 'add'], jasmine.anything());
  });
});
