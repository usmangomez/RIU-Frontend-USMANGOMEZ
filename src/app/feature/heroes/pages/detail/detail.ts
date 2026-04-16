import { AfterViewInit, Component, computed, effect, inject, input, OnDestroy, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { TemplatePortal } from '@angular/cdk/portal';
import { HeroesStore } from '../../store/heroes.store';
import { SecondLevelService } from '../../services/second-level-service';

@Component({
  selector: 'app-detail',
  imports: [MatButtonModule, MatChipsModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail implements AfterViewInit, OnDestroy {
  private readonly heroesStore = inject(HeroesStore);
  private readonly router = inject(Router);
  private readonly aRoute = inject(ActivatedRoute);
  private readonly secondLevelService = inject(SecondLevelService);
  private readonly vcr = inject(ViewContainerRef);

  @ViewChild('actionsTemplate', { static: true }) actionsTemplate!: TemplateRef<unknown>;

  id = input<string>('-1');

  hero = computed(
    () =>
      this.heroesStore.heroes().filter((hero) => hero.id === this.id())[0] ||
      this.heroesStore.hero(),
  );

  loading = computed(() => this.heroesStore.loading());

  defaultImg =
    'https://img.freepik.com/free-vector/superhero-standing-front-sunburst_603843-1871.jpg';

  constructor() {
    effect(() => {
      if (!this.hero()) this.heroesStore.loadHeroById({ id: this.id() });
    });
  }

  ngAfterViewInit(): void {
    this.secondLevelService.setActions(new TemplatePortal(this.actionsTemplate, this.vcr));
  }

  ngOnDestroy(): void {
    this.secondLevelService.clearActions();
  }

  protected editHero(): void {
    this.router.navigate(['edit'], { relativeTo: this.aRoute });
  }
}
