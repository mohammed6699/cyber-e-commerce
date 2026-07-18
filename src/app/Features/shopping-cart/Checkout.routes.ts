import { Routes } from "@angular/router";

export const CHECKOUT_ROUTES: Routes = [
    {
        path: 'cart',
        children: [
            {
                path: '',
                loadComponent: () => import('./shopping-cart').then(x => x.ShoppingCart),
            }
        ]
    }

]