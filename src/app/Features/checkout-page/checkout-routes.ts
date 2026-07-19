import { Routes } from "@angular/router";

export const CHECKOUT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./checkout-page').then(x => x.CheckoutPage),
        children: [
            {
                path: '',
                redirectTo: 'address',
                pathMatch: 'full'
            },
            {
                path: 'address',
                loadComponent: () => import('./address-page/address-page').then(x => x.AddressPage)
            },
            {
                path: 'shipping',
                loadComponent: () => import('./shipping-page/shipping-page').then(x => x.ShippingPage)
            },
            {
                path: 'payment',
                loadComponent: () => import('./payment-page/payment-page').then(x => x.PaymentPage)
            }
        ]
    }
]