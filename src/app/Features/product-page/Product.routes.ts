import { Routes } from "@angular/router";

export const PRODUCT_ROUTES: Routes = [
    {
        path: 'products',
        children: [
            {
                path: '',
                loadComponent: () => import('./product-page').then(x => x.ProductPage)
            },
            {
                path: 'details/:id',
                loadComponent: () => import('../product-details/product-details').then(x => x.ProductDetails)
            }
        ]
    }
]