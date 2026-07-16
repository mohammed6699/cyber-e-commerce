import { Routes } from "@angular/router";

export const PRODUCT_CATEGORIES: Routes = [
    {
        path: '',
        children: [
            {
                path: 'categories',
                loadComponent: () => import('./product-categpries').then(x => x.ProductCategpries)
            },
        ]
    }
]