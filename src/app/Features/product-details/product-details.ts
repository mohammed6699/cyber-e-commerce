import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/Product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../../Models/Product.model';
import { HotToastService } from '@ngxpert/hot-toast';
import { DetailsCard } from "../../Shared/details-card/details-card";
import { CartService } from '../../Services/Cart.service';
import { DetailsComponent } from "../../Shared/details-component/details-component";
import { NgClass } from '@angular/common';
import { ReviewsComponent } from "../../Shared/reviews-component/reviews-component";
import { ProductCard } from '../../Shared/product-card/product-card';
import { WishListService } from '../../Services/WishList.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProductCardSkeleton } from '../../Shared/skeleton/product-card-skeleton/product-card-skeleton';
import { DetailsCardSkeleton } from "../../Shared/skeleton/details-card/details-card-skeleton";
import { DetailsSkeleton } from "../../Shared/skeleton/details-card/details.skeleton";
import { ReviewSkeleton } from "../../Shared/skeleton/details-card/review-skeleton";

@Component({
  selector: 'app-product-details',
  imports: [DetailsCard, DetailsComponent, NgClass, ReviewsComponent, ProductCard, TranslatePipe, ProductCardSkeleton, DetailsCardSkeleton, DetailsSkeleton, ReviewSkeleton],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  isRelatedLoading: boolean = true;
  productId!: number;
  product!: ProductModel;
  relatedProducts: ProductModel[] = [];
  currentLang: any
  constructor(
    private productSer: ProductService,
    private route: ActivatedRoute,
    private toast: HotToastService,
    private cartSer: CartService,
    private cdr: ChangeDetectorRef,
    private wishlistSer: WishListService,
    private translate: TranslateService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id')!);
      if (this.productId) {
        this.loadProductDetails()
      }
    })
    this.currentLang = localStorage.getItem('language')
  }
  loadProductDetails() {
    this.productSer.getProductDetails(this.productId).subscribe({
      next: (res) => {
        this.product = res;
        this.loadRelatedProducts(res.category);
        this.toast.success(`${this.translate.instant('toasts.Product_Details_loaded')}`, {
            duration: 1500,
            position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
        });
        this.cdr.detectChanges()
      },
      error: (err) => {
        this.toast.error(`${this.translate.instant('toasts.Error_loading_product_details')}`, {
            duration: 1500,
            position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
        });
        console.log(err);
      }
    })
  }
  loadRelatedProducts(category: string) {
    this.isRelatedLoading = true;
    this.productSer.getProductList().subscribe(res => {
      this.relatedProducts = res.products.filter(p => p.category === category && p.id !== this.productId);
      this.isRelatedLoading = false;
      this.cdr.detectChanges()
    });
  }
  productOriginalPrice(price: number, discountPercentage: number) {
    const originalPrice = price - (price * (discountPercentage / 100));
    return originalPrice.toFixed(2);
  }
  AddToCart(event: { product: ProductModel, quantity: number }) {
    const existsItem = this.cartSer.items().find(item => item.id === event.product.id)
    if (existsItem) {
      const newQty = (existsItem.quantity || 1) + event.quantity;
      this.cartSer.updateCartItemQuantity(event.product.id, newQty)
    } else {
      this.cartSer.addToCart(event.product);
      this.cartSer.updateCartItemQuantity(event.product.id, event.quantity)
    }
  }
  cart(product: ProductModel){
    this.toast.success(`${product.title} ${this.translate.instant('toasts.added_to_cart')}`, {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    });
    this.cartSer.addToCart(product);
  }
  AddToWishlist(product: ProductModel) {
    this.toast.success(`${product.title} ${this.translate.instant('toasts.added_to_your_wish_list')}`, {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    })
    this.wishlistSer.addToWishlist(product)
  }
}
