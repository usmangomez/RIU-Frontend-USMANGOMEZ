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
import { Router } from '@angular/router';
import { HeroesApi } from '../services/heroes-api';
import { Hero, HeroDetail, Power, Publisher } from '../models';

interface HeroesState {
  heroes: HeroDetail[];
  hero: HeroDetail | null;
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
  hero: null,
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
  withComputed(({ currentPage, totalPages }) => ({
    hasPrev: computed(() => currentPage() > 1),
    hasNext: computed(() => currentPage() < totalPages()),
  })),
  withMethods((store, heroesApi = inject(HeroesApi)) => ({
    loadHeroes: rxMethod<{ name?: string; page?: number; perPage?: number }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ name = '', page = 1, perPage = 10 }) =>
          heroesApi.getHeroes(name, page, perPage).pipe(
            tapResponse({
              next: (response) => {
                patchState(store, {
                  heroes: response.data,
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
    loadHeroById: rxMethod<{ id: string }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ id }) =>
          heroesApi.getHeroById(id).pipe(
            tapResponse({
              next: (hero) => {
                patchState(store, {
                  hero,
                  loading: false,
                });
              },
              error: (err: Error) => patchState(store, { loading: false, error: err.message }),
            }),
          ),
        ),
      ),
    ),
    loadCatalogs: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          forkJoin({
            powers: heroesApi.getPowers(),
            publishers: heroesApi.getPublishers(),
          }).pipe(
            tapResponse({
              next: ({ powers, publishers }) => {
                patchState(store, { loading: false, powers, publishers });
              },
              error: (err: Error) => patchState(store, { loading: false, error: err.message }),
            }),
          ),
        ),
      ),
    ),
  })),
  withMethods((store, heroesApi = inject(HeroesApi), router = inject(Router)) => ({
    createHero: rxMethod<Omit<Hero, 'id'>>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((hero) =>
          heroesApi.postHero(hero).pipe(
            tapResponse({
              next: () => {
                patchState(store, { loading: false });
                store.loadHeroes({});
                router.navigate(['/heroes']);
              },
              error: (err: Error) => patchState(store, { loading: false, error: err.message }),
            }),
          ),
        ),
      ),
    ),
    updateHero: rxMethod<{ id: string; hero: Omit<Hero, 'id'> }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(({ id, hero }) =>
          heroesApi.putHero(id, hero).pipe(
            tapResponse({
              next: () => {
                patchState(store, { loading: false });
                store.loadHeroById({id});
                store.loadHeroes({});
                router.navigate(['/heroes', id]);
              },
              error: (err: Error) => patchState(store, { loading: false, error: err.message }),
            }),
          ),
        ),
      ),
    ),
  })),
);
