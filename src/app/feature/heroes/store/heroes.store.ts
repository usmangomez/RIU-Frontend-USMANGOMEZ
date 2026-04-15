import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HeroesApi } from '../services/heroes-api';
import { HeroDetail } from '../models';

interface HeroesState {
  heroes: HeroDetail[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
}

const initialState: HeroesState = {
  heroes: [],
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,
  loading: false,
  error: null,
};

export const HeroesStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed(({ currentPage, totalPages }) => ({
    hasPrev: computed(() => currentPage() > 1),
    hasNext: computed(() => currentPage() < totalPages()),
  })),
  withMethods((store, heroesApi = inject(HeroesApi)) => ({
    loadHeroes: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap((page) =>
          heroesApi.getHeroes(page).pipe(
            tapResponse({
              next: (response) =>
                patchState(store, {
                  heroes: response.data as unknown as HeroDetail[],
                  currentPage: page,
                  totalPages: response.pages,
                  totalItems: response.items,
                  loading: false,
                }),
              error: (err: Error) => patchState(store, { loading: false, error: err.message }),
            }),
          ),
        ),
      ),
    ),
  })),
);
