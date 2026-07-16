import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-card',
  imports: [CurrencyPipe, PercentPipe, FormsModule],
  templateUrl: './details-card.html',
  styleUrl: './details-card.css',
})
export class DetailsCard {
  @Input({required: true}) product!: ProductModel;
  // define quantity as 1 as requested in NCR min. 
  quantity: number = 1;

  @Output() addToCart = new EventEmitter<{product: ProductModel, quantity: number}>();
  @Output() wishList = new EventEmitter<ProductModel>()


  productOriginalPrice(price: number, discountPercentage: number){
    const originalPrice = price - (price * (discountPercentage / 100));
    return originalPrice.toFixed(2);
  }
  onAddToCartClick(): void{
    if(this.product.stock > 0){
      this.addToCart.emit({product: this.product, quantity: this.quantity})
    }
  }
  onWishListClick(): void{
    this.wishList.emit(this.product)
  }

  increment(): void {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decrement(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
