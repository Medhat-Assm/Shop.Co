import { Routes } from '@angular/router';
import { HomeComponent } from './pages/main/home/home.component';

let projectTitle: string = 'Shop.Co';
export const routes: Routes = [
  { path: '', component: HomeComponent, title: `${projectTitle} - Home` },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/layouts/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: `${projectTitle} - Not Found`,
  },
];
