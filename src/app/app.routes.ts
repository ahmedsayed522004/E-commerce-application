import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layouts/auth-layout/auth-layout.component').then((c) => c.AuthLayoutComponent),
    canActivate: [guestGuard],
    children: [
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then((c) => c.RegisterComponent),
        title: 'Register',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then((c) => c.LoginComponent),
        title: 'Login',
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./core/auth/forget-password/forget-password.component').then(
            (c) => c.ForgetPasswordComponent,
          ),
        title: 'Forgot Password',
      },
      {
        path: 'reset-code',
        loadComponent: () =>
          import('./core/auth/reset-code/reset-code.component').then((c) => c.ResetCodeComponent),
        title: 'Reset Code',
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./core/auth/reset-password/reset-password.component').then(
            (c) => c.ResetPasswordComponent,
          ),
        title: 'Reset Password',
      },
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./core/layouts/main-layout/main-layout.component').then((c) => c.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent),
        title: 'Home',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then((c) => c.ProductsComponent),
        title: 'Products',
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart.component').then((c) => c.CartComponent),
        title: 'Cart',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then((c) => c.BrandsComponent),
        title: 'Brands',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then((c) => c.CategoriesComponent),
        title: 'Categories',
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () =>
          import('./features/details/details.component').then((c) => c.DetailsComponent),
        title: 'Details',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent),
        title: 'Checkout',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component').then((c) => c.AllordersComponent),
        title: 'Allorders',
      },
      {
        path: 'whishlist',
        loadComponent: () =>
          import('./features/whishlist/whishlist.component').then((c) => c.WhishlistComponent),
        title: 'Whishlist',
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./core/auth/change-password/change-password.component').then(
            (c) => c.ChangePasswordComponent,
          ),
        title: 'Change Password',
      },
    ],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then((c) => c.NotfoundComponent),
    title: 'Error',
  },
];
