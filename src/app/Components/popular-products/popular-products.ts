import { ChangeDetectorRef, Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { PopularProuctsCard } from "../../Shared/popular-proucts-card/popular-proucts-card";
import { HotToastService } from '@ngxpert/hot-toast';
import { CartService } from '../../Services/Cart.service';
import { NgClass } from '@angular/common';
import { register } from 'swiper/element/bundle';

@Component({
  selector: 'app-popular-products',
  imports: [PopularProuctsCard, NgClass],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PopularProducts implements OnInit{
  @Input() products: ProductModel[] = [];
  constructor(
    private toast: HotToastService,
    private cartSer: CartService,
    private cdr: ChangeDetectorRef
  ){}
  ngOnInit(): void {
    register();
  }

  onAddToCart(product: ProductModel){
    this.toast.success(`${product.title} added to cart successfully`);
    this.cartSer.addToCart(product);
  }
}
