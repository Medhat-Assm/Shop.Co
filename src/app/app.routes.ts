import { Routes } from '@angular/router';
import { HomeComponent } from './pages/main/home/home.component';
import { loggedInGuard } from './core/guards/loggedIn/logged-in.guard';
import path from 'path';
import { loggedOutGuard } from './core/guards/loggedOut/logged-out.guard';

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
    path: 'forget-password',
    loadComponent: () =>
      import('./pages/auth/forget-password/forget-password.component').then(
        (m) => m.ForgetPasswordComponent
      ),
    canActivate: [loggedInGuard],
    title: `${projectTitle} - Forget Password`,
  },
  {
    path: 'verification-code',
    loadComponent: () =>
      import('./pages/auth/forget-password/verification-code/verification-code.component').then(
        (m) => m.VerificationCodeComponent
      ),
    canActivate: [loggedInGuard],
    title: `${projectTitle} - Verification Code`,
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./pages/auth/forget-password/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
    canActivate: [loggedInGuard],
    title: `${projectTitle} - Reset Password`,
  },
  {
    path: 'change-password',
    loadComponent: () =>
      import('./pages/auth/change-password/change-password.component').then(
        (m) => m.ChangePasswordComponent
      ),
    canActivate: [loggedOutGuard],
    title: `${projectTitle} - Change Password`,
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/layouts/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: `${projectTitle} - Not Found`,
  },
];
