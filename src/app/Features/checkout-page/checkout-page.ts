import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AddressPage } from "./address-page/address-page";

@Component({
  selector: 'app-checkout-page',
  imports: [RouterOutlet, RouterLinkWithHref, AddressPage],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {}
