import { Component, computed, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, NgStyle, NgClass } from '@angular/common';
import { WishListService } from '../../Services/WishList.service';
import { Button } from "../../directives/button";
import { TitleSlicePipe } from '../../pipes/title-slice-pipe';

@Component({
  selector: 'app-product-card',
  imports: [NgStyle, CurrencyPipe, NgClass, Button, TitleSlicePipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input({required: true}) product!: ProductModel
  @Input() showDetailsBtn: boolean = false;
  @Output() addToCart = new EventEmitter<ProductModel>();
  @Output() wishList = new EventEmitter<ProductModel>();
  @Output()navigateToDetails = new EventEmitter<number>();
  // remeber to use some as it return true or false
  isWishList = computed(() => this.wishlistSer.items().some((item) => item.id === this.product.id));

  constructor(
    private router: Router,
    public wishlistSer: WishListService
  ){}
  
  onWishListClick(): void{
    this.wishlistSer.toogleWishList(this.product)
    
  }
  onAddToCartClick(): void{
    if(this.product.stock > 0){
      this.addToCart.emit(this.product)
    }
  }
  navigateToProductDetails(): void{
    this.navigateToDetails.emit(this.product.id)
  }
  productOriginalrice(price: number, discountPercentage: number){
    const originalPrice = price - (price * (discountPercentage / 100));
    return originalPrice.toFixed(2);
  }
}
