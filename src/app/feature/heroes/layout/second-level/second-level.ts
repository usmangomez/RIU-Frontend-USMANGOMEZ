import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { HeroesStore } from '../../store/heroes.store';
import { SecondLevelService } from '../../services/second-level-service';

@Component({
  selector: 'app-second-level',
  imports: [RouterOutlet, MatButton, CdkPortalOutlet],
  templateUrl: './second-level.html',
  styleUrl: './second-level.scss',
})
export class SecondLevel {
  private readonly heroesStore = inject(HeroesStore);
  private readonly router = inject(Router);
  private readonly aRoute = inject(ActivatedRoute);
  readonly secondLevelService = inject(SecondLevelService);

  loading = computed(() => this.heroesStore.loading());

  protected goBack(): void {
    this.router.navigate(['./..'], { relativeTo: this.aRoute }).then();
  }
}
