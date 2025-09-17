import { Routes } from '@angular/router';
import { HomeComponent } from './pages/main/home/home.component';
import { loggedInGuard } from './core/guards/loggedIn/logged-in.guard';
import path from 'path';
import { loggedOutGuard } from './core/guards/loggedOut/logged-out.guard';
import { ProductsComponent } from './shared/components/products/products.component';
import { CategoriesComponent } from './shared/components/categories/categories.component';
import { BrandsComponent } from './shared/components/brands/brands.component';

let projectTitle: string = 'Shop.Co';
export const routes: Routes = [
  { path: '', component: HomeComponent, title: `${projectTitle} - Home` },
  { path: 'home', redirectTo: '', pathMatch: 'full' },

  //#region Auth Components
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
  //#endregion

  //#region Shared Component
  { path: 'products', component: ProductsComponent, title: `${projectTitle} - Products` },

  {
    path: 'product-details/:id',
    loadComponent: () =>
      import('./shared/components/products/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
    title: `${projectTitle} - Product Details`,
  },
  { path: 'categories', component: CategoriesComponent, title: `${projectTitle} - Categories` },
  { path: 'brands', component: BrandsComponent, title: `${projectTitle} - Brands` },
  //#endregion

  //#region Main Component
  {
    path: 'cart',
    loadComponent: () => import('./pages/main/cart/cart.component').then((m) => m.CartComponent),
    title: `${projectTitle} - Cart`,
    canActivate: [loggedOutGuard],
  },
  {
    path: `order/:id`,
    loadComponent: () =>
      import('./pages/main/cart/order/order.component').then((m) => m.OrderComponent),
    title: 'Shop.Co - Request Order',
    canActivate: [loggedOutGuard],
  },

  {
    path: 'wishlist',
    loadComponent: () =>
      import('./pages/main/wishlist/wishlist.component').then((m) => m.WishlistComponent),
    title: `${projectTitle} - Wishlist`,
    canActivate: [loggedOutGuard],
  },
  //#endregion
  {
    path: '**',
    loadComponent: () =>
      import('./pages/layouts/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: `${projectTitle} - Not Found`,
  },
];
