import { Component, computed, effect, inject } from '@angular/core';
import { HeroesApi } from './services/heroes-api';
import { HeroesStore } from './store/heroes.store';
import { HeroCard } from './components/hero-card/hero-card';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-heroes',
  imports: [HeroCard, MatFormField, MatLabel, MatInput, ReactiveFormsModule, MatPaginator],
  templateUrl: './heroes.html',
  styleUrl: './heroes.scss',
})
export class Heroes {
  private readonly heroesStore = inject(HeroesStore);
  private readonly formBuilder = inject(FormBuilder);

  heroes = computed(() => this.heroesStore.heroes());
  totalHeroItems = computed(() => this.heroesStore.totalItems());

  form = this.formBuilder.group({
    search: [''],
  });

  searchValue = toSignal(this.form.controls.search.valueChanges.pipe(debounceTime(500)));

  constructor() {
    effect(() => {
      this.heroesStore.loadHeroes({ name: this.searchValue() || '' });
    });
  }

  protected handlePaginatorChange(paginator: PageEvent) {
    this.heroesStore.loadHeroes({ name: this.searchValue() || '', page: paginator.pageIndex+1, perPage: paginator.pageSize });
  }
}
