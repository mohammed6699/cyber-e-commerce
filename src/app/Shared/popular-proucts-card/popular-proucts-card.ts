import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-popular-proucts-card',
  imports: [NgClass],
  templateUrl: './popular-proucts-card.html',
  styleUrl: './popular-proucts-card.css',
})
export class PopularProuctsCard {
  @Input({required: true}) product!: ProductModel
  @Input() bgColor: string = '#F5F5F5';
  @Input() isLast: boolean = false;
  @Output() addToCart = new EventEmitter<ProductModel>();

  onAddToCartClick(): void{
    if(this.product.stock > 0){
      this.addToCart.emit(this.product)
    }
  }
}
