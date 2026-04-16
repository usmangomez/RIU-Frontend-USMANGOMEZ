import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./heroes').then((m) => m.Heroes),
  },
  {
    path: '',
    loadComponent: () => import('./layout/second-level/second-level').then((m) => m.SecondLevel),
    children: [
      {
        path: 'add',
        loadComponent: () => import('./pages/add/add').then((m) => m.Add),
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/detail/detail').then((m) => m.Detail),
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./pages/edit/edit').then((m) => m.Edit),
      },
    ],
  },
];
