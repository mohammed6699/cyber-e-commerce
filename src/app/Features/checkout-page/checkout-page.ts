import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { AddressPage } from "./address-page/address-page";

@Component({
  selector: 'app-checkout-page',
  imports: [RouterOutlet, RouterLinkWithHref, TranslatePipe, AddressPage],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {}
