import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Add } from './add';
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

describe('Add', () => {
  let component: Add;
  let fixture: ComponentFixture<Add>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Add],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
        { provide: HeroesStore, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Add);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleHeroCreate should call store createHero', () => {
    const hero = { name: 'Test', powerId: '1', publisherId: '1', firstAppearance: 2000 };
    (component as any).handleHeroCreate(hero);
    expect(mockStore.createHero).toHaveBeenCalledWith(hero);
  });
});
