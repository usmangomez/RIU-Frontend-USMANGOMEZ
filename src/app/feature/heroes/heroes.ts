import { Component, effect, inject } from '@angular/core';
import { HeroesApi } from './services/heroes-api';
import { HeroesStore } from './store/heroes.store';

@Component({
  selector: 'app-heroes',
  imports: [],
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
})
export class Heroes {
  private readonly heroesStore = inject(HeroesStore);

  constructor() {
    effect(() => {
      this.heroesStore.loadHeroes(2);
    });
  }
}
