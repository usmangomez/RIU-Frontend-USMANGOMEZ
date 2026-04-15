import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { forkJoin, pipe, switchMap, tap } from 'rxjs';
import { HeroesApi } from '../services/heroes-api';
import { HeroDetail, Power, Publisher } from '../models';

interface HeroesState {
  heroes: HeroDetail[];
  powers: Power[];
  publishers: Publisher[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
}

const initialState: HeroesState = {
  heroes: [],
  powers: [],
  publishers: [],
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
  loading: false,
  error: null,
};

export const HeroesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ currentPage, totalPages, powers, publishers }) => ({
    hasPrev: computed(() => currentPage() > 1),
    hasNext: computed(() => currentPage() < totalPages()),
    powersMap: computed(() => new Map<number, Power>(powers().map((p) => [+p.id, p]))),
    publishersMap: computed(
      () => new Map<number, Publisher>(publishers().map((p) => [+p.id, p])),
    ),
  })),
  withMethods((store, heroesApi = inject(HeroesApi)) => ({
    loadHeroes: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((page) =>
          heroesApi.getHeroes(page).pipe(
            tapResponse({
              next: (response) => {
                const heroes: HeroDetail[] = (response.data as unknown as any[]).map((hero) => ({
                  ...hero,
                  power: store.powersMap().get(hero.powerId)?.name!,
                  publisher: store.publishersMap().get(hero.publisherId)?.name!,
                }));

                patchState(store, {
                  heroes,
                  currentPage: page,
                  totalPages: response.pages,
                  totalItems: response.items,
                  loading: false,
                });
              },
              error: (err: Error) => patchState(store, { loading: false, error: err.message }),
            }),
          ),
        ),
      ),
    ),
  })),
  withMethods((store, heroesApi = inject(HeroesApi)) => ({
    initialLoad: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          forkJoin({
            powers: heroesApi.getPowers(),
            publishers: heroesApi.getPublishers(),
          }).pipe(
            tapResponse({
              next: ({ powers, publishers }) => {
                patchState(store, { powers, publishers });
                store.loadHeroes(1);
              },
              error: (err: Error) => patchState(store, { loading: false, error: err.message }),
            }),
          ),
        ),
      ),
    ),
  })),
  withHooks((store) => ({
    onInit: () => {
      store.initialLoad();
    }
  }))
);
