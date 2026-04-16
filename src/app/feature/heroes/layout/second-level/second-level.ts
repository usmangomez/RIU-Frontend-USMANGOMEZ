import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { HeroesStore } from '../../store/heroes.store';

@Component({
  selector: 'app-second-level',
  imports: [RouterOutlet, MatButton],
  templateUrl: './second-level.html',
  styleUrl: './second-level.scss',
})
export class SecondLevel {
  private readonly heroesStore = inject(HeroesStore);
  private readonly router = inject(Router);
  private readonly aRoute = inject(ActivatedRoute);

  loading = computed(() => this.heroesStore.loading());

  protected goBack(): void {
    this.router.navigate(['./..'], { relativeTo: this.aRoute }).then();
  }
}
