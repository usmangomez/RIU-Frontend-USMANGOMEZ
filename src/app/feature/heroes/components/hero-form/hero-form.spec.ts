import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HeroForm } from './hero-form';
import { HeroesStore } from '../../store/heroes.store';

const mockStore = {
  heroes: signal<any[]>([]),
  hero: signal(null),
  powers: signal([{ id: '1', name: 'Flight', description: '' }]),
  publishers: signal([{ id: '1', name: 'DC', universe: 'DC', founded: 1934 }]),
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

describe('HeroForm', () => {
  let component: HeroForm;
  let fixture: ComponentFixture<HeroForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroForm],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        { provide: HeroesStore, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit should not emit when form is invalid', () => {
    spyOn(component.onHeroSubmit, 'emit');
    (component as any).onSubmit();
    expect(component.onHeroSubmit.emit).not.toHaveBeenCalled();
  });

  it('onSubmit should emit hero data when form is valid', () => {
    spyOn(component.onHeroSubmit, 'emit');
    component.form.setValue({
      name: 'Test Hero',
      powerId: '1',
      publisherId: '1',
      firstAppearance: 2000,
    });
    (component as any).onSubmit();
    expect(component.onHeroSubmit.emit).toHaveBeenCalledWith({
      name: 'Test Hero',
      powerId: '1',
      publisherId: '1',
      firstAppearance: 2000,
    });
  });

  it('should patch form values when hero input is set', () => {
    const hero: any = { id: '1', name: 'Batman', powerId: '2', publisherId: '1', firstAppearance: 1939 };
    fixture.componentRef.setInput('hero', hero);
    fixture.detectChanges();
    expect(component.form.value.name).toBe('Batman');
    expect(component.form.value.powerId).toBe('2');
  });
});
