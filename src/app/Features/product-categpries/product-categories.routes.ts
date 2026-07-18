import { Routes } from "@angular/router";
import { categoryResolver } from "../../Resolvers/categoryresolver";

export const PRODUCT_CATEGORIES: Routes = [
    {
        path: '',
        children: [
            {
                path: 'categories',
                resolve: { 'categories': categoryResolver },
                loadComponent: () => import('./product-categpries').then(x => x.ProductCategpries)
            },
            {
                path: 'category-products/:slug',
                loadComponent: () => import('./products/products').then(x => x.Products)
            }
        ]
    }
]