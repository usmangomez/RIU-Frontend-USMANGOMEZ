import { Component, computed, effect, inject } from '@angular/core';
import { HeroesApi } from './services/heroes-api';
import { HeroesStore } from './store/heroes.store';
import { HeroCard } from './components/hero-card/hero-card';

@Component({
  selector: 'app-heroes',
  imports: [HeroCard],
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
})
export class Heroes {
  private readonly heroesStore = inject(HeroesStore);

  heroes = computed(() => this.heroesStore.heroes());
}
