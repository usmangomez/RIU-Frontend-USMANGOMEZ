import { Component, computed, effect, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { HeroesStore } from '../../store/heroes.store';

@Component({
  selector: 'app-detail',
  imports: [MatButtonModule, MatChipsModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail {
  private readonly heroesStore = inject(HeroesStore);
  private readonly router = inject(Router);
  private readonly aRoute = inject(ActivatedRoute);

  id = input<string>('-1');

  hero = computed(() =>
    this.heroesStore.heroes()
      .filter(hero => +hero.id === +this.id())[0]
    || this.heroesStore.hero()
  );

  loading = computed(() => this.heroesStore.loading());

  defaultImg = 'https://img.freepik.com/free-vector/superhero-standing-front-sunburst_603843-1871.jpg';

  constructor() {
    effect(() => {
      if(!this.hero()) this.heroesStore.loadHeroById({ id: this.id() });
    });
  }

  goBack(): void {
    this.router.navigate(['./..'], { relativeTo: this.aRoute }).then();
  }
}
