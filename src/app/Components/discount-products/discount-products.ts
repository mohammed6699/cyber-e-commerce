import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { ProductCard } from "../../Shared/product-card/product-card";
import { CartService } from '../../Services/Cart.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { TranslatePipe } from '@ngx-translate/core';
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
    private toast: HotToastService
  ) {}
  ngOnInit(): void {
    this.currentLang = localStorage.getItem('language');
  }
  addTocart(product: ProductModel){
    this.toast.success(`${product.title} added to cart succefully`);
    this.cartSer.addToCart(product)
  }
}
