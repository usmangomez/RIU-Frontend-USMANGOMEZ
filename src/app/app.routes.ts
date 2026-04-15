import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./core/layout/main/main').then((m) => m.Main),
    children: [
      {
        path: '',
        redirectTo: 'heroes',
        pathMatch: 'full',
      },
      {
        path: 'heroes',
        loadChildren: () => import('./feature/heroes/heroes.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'heroes',
  },
];
