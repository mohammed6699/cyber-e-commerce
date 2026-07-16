import { Routes } from '@angular/router';
import { EmptyLayout } from './Layouts/empty-layout/empty-layout';
import { MainLayout } from './Layouts/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        component: EmptyLayout,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./Components/login/login').then(x => x.Login)
            }
        ]
    },
    {
        path: '',
        component: MainLayout,
        children: [
            {
                path: 'home', loadComponent: () => import('./Features/home-page/home-page').then(x => x.HomePage)
            },
            {
                path: 'about-us',
                loadComponent: () => import('./Features/aboutus-page/aboutus-page').then(x => x.AboutusPage)
            },
            {
                path: '',
                loadChildren: () => import('./Features/product-page/Product.routes').then(x => x.PRODUCT_ROUTES)
            },
            {
                path: '',
                loadChildren: () => import('./Features/product-categpries/product-categories.routes').then(x => x.PRODUCT_CATEGORIES)
            },
            {
                path: 'cart',
                loadComponent: () => import('./Features/shopping-cart/shopping-cart').then(x => x.ShoppingCart)
            },
            {
                path: 'wishlist',
                loadComponent: () => import('./Features/wish-list/wish-list').then(x => x.WishList)
            },
            {
                path: 'checkout',
                loadComponent: () => import('./Features/checkout-page/checkout-page').then(x => x.CheckoutPage)
            }
        ]
    }
];
