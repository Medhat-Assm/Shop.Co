# 🛍️ Shop.Co

Live Demo 👉 [Shop.Co on Vercel](https://shop-co-lime-one.vercel.app/)

Shop.Co is a modern **e-commerce web application** built with the latest Angular ecosystem. It demonstrates clean architecture, scalable folder structure, server-side rendering (SSR), and a responsive UI powered by TailwindCSS.

This project UI/UX was inspired by a [Figma E-commerce Template](https://www.figma.com/community/file/1273571982885059508).

The application is fully integrated with an external **E-commerce API** 👉 [Postman Documentation](https://documenter.getpostman.com/view/5709532/2s93JqTRWN#intro) for handling products, categories, authentication, orders, and more.

---

## 🚀 Features

- 🔐 **Authentication flow**

  - Login / Register
  - Verification Code
  - Forget Password & Reset Password (fully handled with API integration)
  - Change User Password

- 🛒 **Wishlist & Cart** management using Angular **Signals**
- 📦 **Dynamic product catalog** with categories, brands & filters
- ❤️ Add / remove products from wishlist
- 🌙 Dark / light mode toggle
- 🌍 **Multi-language support** (RTL/LTR switch using ngx-translate)
- 📱 Fully responsive layout
- ⚡ Optimized with **SSR + Prerendering**
- 🎨 Modern UI with **TailwindCSS + Flowbite components**

---

## 🛠️ Tech Stack

- **Framework**: [Angular 17](https://angular.dev) (Standalone Components, Signals, Angular Forms, Server Routes)
- **Styling**: [TailwindCSS](https://tailwindcss.com) + [Flowbite](https://flowbite.com) + [FontAwesome](https://fontawesome.com) + [Lucide Icons](https://lucide.dev)
- **State Management**: Angular **Signals**
- **Routing**: Angular Server Routes (SSR / Prerender)
- **Utilities**:

  - `jwt-decode` → Decode JWT tokens
  - `ngx-owl-carousel-o` → Product carousels & sliders
  - `ngx-spinner` → Loading spinners
  - `ngx-toastr` → Toast notifications
  - `@ngx-translate/core` & `@ngx-translate/http-loader` → Internationalization (i18n)

- **Backend API**: [E-commerce API](https://documenter.getpostman.com/view/5709532/2s93JqTRWN#intro)
- **Build & Deploy**: [Vercel](https://vercel.com)
- **Linting & Formatting**: ESLint + Prettier

---

## 📂 Services

- **Auth Service** → Handle authentication (login, register, JWT decode, verification, forget password, change password)
- **Categories Service** → Fetch and manage product categories
- **Sub Categories Service** → Manage nested categories
- **Brands Service** → Manage product brands
- **Products Service** → Handle product CRUD and fetching logic
- **Wishlist Service** → Add/remove/get wishlist items
- **User Address Service** → Store & manage user addresses
- **Cart Service** → Add/remove/update cart items
- **Order Service** → Place and manage user orders
- **Platform Service** → Detect and adapt to platform (server/client)

---

## 🔄 RxJS Pipe Operators Used

- **map** → Transform API responses before reaching components
- **shareReplay** → Cache the latest API response and share it with multiple subscribers (avoid duplicate calls)

---

## 🧩 Interceptors

- **Error Interceptor** → Global error handling
- **Header Interceptor** → Attach authentication headers (e.g., JWT)
- **Loading Interceptor** → Trigger loading spinner during HTTP requests

---

## 🔐 Guards

- **LoggedInGuard** → Prevents logged-in users from accessing auth pages (login/register)
- **LoggedOutGuard** → Prevents non-authenticated users from accessing protected pages (wishlist, cart, checkout, orders)

---

## 🧱 Components

### Layout

- Layout Component
- Navbar
- Footer
- NotFound

### Auth

- Login
- Register
- Forget Password (API integrated)
- Change User Password
- Verification Code

### Shared

- Products
- Filter
- Categories
- Brands

### Main

- Home

  - Hero Component
  - New Arrival
  - Top Selling
  - Browse By Category
  - Testimonial

- Wishlist
- Cart
- Checkout Order
- All Orders
- About Us

---

## 📂 Project Structure

```
src/
 ├── app/
 │   ├── core/         # Core services, guards, interceptors
 │   ├── features/     # Feature modules (auth, cart, wishlist, products…)
 │   ├── shared/       # Shared UI components & utilities
 │   ├── app.config.ts # Angular app bootstrap config
 │   └── app.routes.ts # Server routes (SSR / Prerender)
 ├── assets/           # Static assets (images, icons…)
 └── styles/           # Global Tailwind styles
```

---

## ⚙️ Installation & Running Locally

1. Clone the repo:

```bash
git clone https://github.com/Medhat-Assm/Shop.Co.git
cd Shop.Co
```

2. Install dependencies:

```bash
npm install
```

3. Run in development mode:

```bash
npm start
```

The app will be available at `http://localhost:4200`.

4. Build for production:

```bash
npm run build
```

---

## 🌍 Deployment

- The project is deployed on **Vercel** using Angular SSR adapter.
- Automatic builds & deployments on push to `main`.

---

## 👨‍💻 Author

Developed with ❤️ by [Medhat Assem](https://github.com/Medhat-Assm)

---
