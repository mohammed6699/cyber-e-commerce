import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { ProductCard } from "../../Shared/product-card/product-card";
import { CartService } from '../../Services/Cart.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-discount-products',
  imports: [ProductCard, TranslatePipe,NgClass],
  templateUrl: './discount-products.html',
  styleUrl: './discount-products.css',
})
export class DiscountProducts implements OnInit{ 
  @Input() products: ProductModel[] = [];
  currentLang: any;
  constructor(
    private cartSer: CartService,
    private toast: HotToastService,
    private tranlate: TranslateService
  ) {}
  ngOnInit(): void {
    this.currentLang = localStorage.getItem('language');
  }
  addTocart(product: ProductModel){
    this.toast.success(`${product.title} ${this.tranlate.instant('toasts.added_to_cart_succefully')}`, 
      {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    });
    this.cartSer.addToCart(product)
  }
}
