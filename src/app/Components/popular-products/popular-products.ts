import { ChangeDetectorRef, Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { PopularProuctsCard } from "../../Shared/popular-proucts-card/popular-proucts-card";
import { HotToastService } from '@ngxpert/hot-toast';
import { CartService } from '../../Services/Cart.service';
import { NgClass } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-popular-products',
  imports: [PopularProuctsCard, NgClass, TranslatePipe],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PopularProducts implements OnInit{
  @Input() products: ProductModel[] = [];
  currentLang: any
  constructor(
    private toast: HotToastService,
    private cartSer: CartService,
    private translate: TranslateService
  ){}
  ngOnInit(): void {
    register();
    this.currentLang = localStorage.getItem('language')
  }

  onAddToCart(product: ProductModel){
    this.toast.success(`${product.title} ${this.translate.instant('toasts.added_to_cart_succefully')}`, 
      { duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    });
    this.cartSer.addToCart(product);
  }
 
}
