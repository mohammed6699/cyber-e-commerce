import { Routes } from '@angular/router';
import { EmptyLayout } from './Layouts/empty-layout/empty-layout';
import { MainLayout } from './Layouts/main-layout/main-layout';
import { authGuard } from './Guards/auth-guard';
import { productResolver } from './Resolvers/product.resolver';
import { categoryResolver } from './Resolvers/categoryresolver';

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
                path: 'home',
                resolve: { products: productResolver, categories: categoryResolver },
                loadComponent: () => import('./Features/home-page/home-page').then(x => x.HomePage)
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
                canActivate: [authGuard],
                loadComponent: () => import('./Features/wish-list/wish-list').then(x => x.WishList)
            },
            {
                path: 'checkout',
                canActivate: [authGuard],
                loadChildren: () => import('./Features/checkout-page/checkout-routes').then(x => x.CHECKOUT_ROUTES)
            },
            {
                path: 'profile-page',
                canActivate: [authGuard],
                loadComponent: () => import('./Features/profile-page/profile-page').then(x => x.ProfilePage)
            }
        ]
    }
];
