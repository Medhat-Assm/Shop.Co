import { Routes } from '@angular/router';
import { HomeComponent } from './pages/main/home/home.component';
import { loggedInGuard } from './core/guards/loggedIn/logged-in.guard';

let projectTitle: string = 'Shop.Co';
export const routes: Routes = [
  { path: '', component: HomeComponent, title: `${projectTitle} - Home` },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/auth/register/register.component').then((m) => m.RegisterComponent),
    canActivate: [loggedInGuard],
    title: `${projectTitle} - Register`,
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then((m) => m.LoginComponent),
    canActivate: [loggedInGuard],
    title: `${projectTitle} - Register`,
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/layouts/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: `${projectTitle} - Not Found`,
  },
];
