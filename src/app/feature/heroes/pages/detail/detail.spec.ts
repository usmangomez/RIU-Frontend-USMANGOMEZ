import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Detail } from './detail';
import { HeroesStore } from '../../store/heroes.store';

const mockHero: any = {
  id: '1',
  name: 'Superman',
  powerId: '1',
  publisherId: '1',
  firstAppearance: 1938,
  power: { id: '1', name: 'Flight', description: 'Ability to fly' },
  publisher: { id: '1', name: 'DC Comics', universe: 'DC', founded: 1934 },
};

const mockStore = {
  heroes: signal<any[]>([mockHero]),
  hero: signal<any>(mockHero),
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

describe('Detail', () => {
  let component: Detail;
  let fixture: ComponentFixture<Detail>;
  let router: Router;

  beforeEach(async () => {
    mockStore.deleteHero.calls.reset();

    await TestBed.configureTestingModule({
      imports: [Detail],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideHttpClient(),
        { provide: HeroesStore, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Detail);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('editHero should navigate to edit route', () => {
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    (component as any).editHero();
    expect(router.navigate).toHaveBeenCalledWith(['edit'], jasmine.anything());
  });

  it('RemoveHero should call deleteHero when dialog is confirmed', () => {
    const dialog = TestBed.inject(MatDialog);
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(true) } as any);
    fixture.componentRef.setInput('id', '3');
    (component as any).RemoveHero();
    expect(mockStore.deleteHero).toHaveBeenCalledWith({ id: '3' });
  });

  it('RemoveHero should NOT call deleteHero when dialog is cancelled', () => {
    const dialog = TestBed.inject(MatDialog);
    spyOn(dialog, 'open').and.returnValue({ afterClosed: () => of(false) } as any);
    (component as any).RemoveHero();
    expect(mockStore.deleteHero).not.toHaveBeenCalled();
  });
});
