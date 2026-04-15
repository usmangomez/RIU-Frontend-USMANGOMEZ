import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./heroes').then(m => m.Heroes),
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/detail/detail').then(m => m.Detail),
  }
];
