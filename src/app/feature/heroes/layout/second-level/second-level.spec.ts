import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { SecondLevel } from './second-level';
import { HeroesStore } from '../../store/heroes.store';

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

describe('SecondLevel', () => {
  let component: SecondLevel;
  let fixture: ComponentFixture<SecondLevel>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondLevel],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
        { provide: HeroesStore, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SecondLevel);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goBack should navigate to parent route', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    (component as any).goBack();
    expect(router.navigate).toHaveBeenCalledWith(['./..'], jasmine.anything());
  });
});
