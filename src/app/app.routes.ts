import { Routes } from '@angular/router';
import { HomeComponent } from './features/main/home/home.component';
let projectTitle: string = `Shop.Co`;
export const routes: Routes = [
  // Home Page
  { path: ``, component: HomeComponent, title: `${projectTitle} - Home` },
  { path: `home`, redirectTo: ``, title: `${projectTitle} - Home` },

  // Auth Page
  {
    path: `register`,
    loadComponent: () =>
      import(`./features/auth/register/register.component`).then((m) => m.RegisterComponent),
    title: `${projectTitle} - Register`,
  },
  {
    path: `login`,
    loadComponent: () =>
      import(`./features/auth/login/login.component`).then((m) => m.LoginComponent),
    title: `${projectTitle} - Login`,
  },
  {
    path: `profile`,
    loadComponent: () =>
      import(`./features/auth/profile/profile.component`).then((m) => m.ProfileComponent),
    title: `${projectTitle} - Profile`,
  },

  // Shared Components
  {
    path: `products`,
    loadComponent: () =>
      import(`./shared/components/products/products.component`).then((m) => m.ProductsComponent),
    title: `${projectTitle} - Products`,
  },
  {
    path: `categories`,
    loadComponent: () =>
      import(`./shared/components/categories/categories.component`).then(
        (m) => m.CategoriesComponent
      ),
    title: `${projectTitle} - Categories`,
  },
  {
    path: `brands`,
    loadComponent: () =>
      import(`./shared/components/brands/brands.component`).then((m) => m.BrandsComponent),
    title: `${projectTitle} - Brands`,
  },

  // Main Components
  {
    path: `cart`,
    loadComponent: () => import(`./features/main/cart/cart.component`).then((m) => m.CartComponent),
    title: `${projectTitle} - Cart`,
  },
  {
    path: `wishlist`,
    loadComponent: () =>
      import(`./features/main/wishlist/wishlist.component`).then((m) => m.WishlistComponent),
    title: `${projectTitle} - Wishlist`,
  },
  {
    path: `about-us`,
    loadComponent: () =>
      import(`./features/main/about-us/about-us.component`).then((m) => m.AboutUsComponent),
    title: `${projectTitle} - About Us`,
  },

  // Not Found Page
  {
    path: `**`,
    loadComponent: () =>
      import(`./layouts/not-found/not-found.component`).then((m) => m.NotFoundComponent),
    title: `${projectTitle} - Not Found`,
  },
];
