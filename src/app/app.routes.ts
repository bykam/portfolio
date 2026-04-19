import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/portfolio/pages/home/home').then((c) => c.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./features/portfolio/pages/about/about').then((c) => c.About),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./features/portfolio/pages/projects/projects').then((c) => c.Projects),
  },
];
