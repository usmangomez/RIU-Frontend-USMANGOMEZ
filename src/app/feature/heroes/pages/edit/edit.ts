import { Component, computed, effect, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HeroesStore } from '../../store/heroes.store';
import { HeroForm } from '../../components/hero-form/hero-form';
import { Hero } from '../../models';

@Component({
  selector: 'app-edit',
  imports: [HeroForm, MatButtonModule],
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
})
export class Edit {
  private readonly heroesStore = inject(HeroesStore);

  id = input<string>('-1');

  hero = computed(() =>
    this.heroesStore.heroes().find((h) => h.id === this.id()) ?? this.heroesStore.hero(),
  );

  constructor() {
    effect(() => {
      if (!this.hero()) this.heroesStore.loadHeroById({ id: this.id() });
    });
  }

  onSubmit(hero: Omit<Hero, 'id'>): void {
    this.heroesStore.updateHero({ id: this.id(), hero });
  }
}
