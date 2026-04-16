import { Component, computed, effect, inject, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroesStore } from '../../store/heroes.store';
import { Hero } from '../../models';
import { ToUpperCase } from '../../../../core/directives/to-upper-case';

@Component({
  selector: 'app-hero-form',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    ToUpperCase,
  ],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
})
export class HeroForm {
  private readonly fb = inject(FormBuilder);
  private readonly heroesStore = inject(HeroesStore);

  hero = input<Hero | null>(null);
  buttonText = input<string>('Add Hero');

  powers = computed(() => this.heroesStore.powers());
  publishers = computed(() => this.heroesStore.publishers());
  loading = computed(() => this.heroesStore.loading());

  onHeroSubmit = output<Omit<Hero, 'id'>>();

  form = this.fb.group({
    name: ['', Validators.required],
    powerId: ['', Validators.required],
    publisherId: ['', Validators.required],
    firstAppearance: [null as number | null, [Validators.required, Validators.min(1900)]],
  });

  constructor() {
    if (this.powers().length === 0 || this.publishers().length === 0)
      this.heroesStore.loadCatalogs();

    effect(() => {
      const hero = this.hero();
      if (!hero) return;
      this.form.patchValue({
        name: hero.name,
        powerId: hero.powerId,
        publisherId: hero.publisherId,
        firstAppearance: hero.firstAppearance,
      });
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.onHeroSubmit.emit(this.form.getRawValue() as Omit<Hero, 'id'>);
  }
}
