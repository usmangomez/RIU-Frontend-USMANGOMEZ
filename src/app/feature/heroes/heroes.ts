import { Component, computed, effect, inject } from '@angular/core';
import { HeroesStore } from './store/heroes.store';
import { HeroCard } from './components/hero-card/hero-card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  imports: [HeroCard, MatFormField, MatLabel, MatInput, ReactiveFormsModule, MatPaginator],
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
})
export class Heroes {
  private readonly heroesStore = inject(HeroesStore);
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly aRoute = inject(ActivatedRoute);

  heroes = computed(() => this.heroesStore.heroes());
  totalHeroItems = computed(() => this.heroesStore.totalItems());
  loading = computed(() => this.heroesStore.loading());

  form = this.formBuilder.group({
    search: [''],
  });

  searchValue = toSignal(this.form.controls.search.valueChanges.pipe(debounceTime(500)));

  constructor() {
    effect(() => {
      const name = this.searchValue();
      if (name === undefined) return;
      this.heroesStore.loadHeroes({ name: name || '' });
    });

    if(this.heroesStore.heroes().length === 0) {
      this.heroesStore.loadHeroes({});
    }
  }

  protected handlePaginatorChange(paginator: PageEvent) {
    this.heroesStore.loadHeroes({ name: this.searchValue() || '', page: paginator.pageIndex+1, perPage: paginator.pageSize });
  }

  protected handleClickHero(id: number) {
    this.router.navigate(['./', id], { relativeTo: this.aRoute}).then();
  }
}
