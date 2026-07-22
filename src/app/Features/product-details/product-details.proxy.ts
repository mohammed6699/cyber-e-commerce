import { Injectable, OnInit, signal } from "@angular/core";
import { ProductModel } from "../../Models/Product.model";
import { ProductService } from "../../Services/Product.service";
import { ActivatedRoute } from "@angular/router";
import { HotToastService } from "@ngxpert/hot-toast";
import { CartService } from "../../Services/Cart.service";
import { TranslateService } from "@ngx-translate/core";
import { WishListService } from "../../Services/WishList.service";
import { take } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProductDetailsProxy {
    isRelatedLoading = signal<boolean>(true);
    productId!: number;
    product = signal<ProductModel | null>(null);
    relatedProducts = signal<ProductModel[]>([]);
    currentLang: any
    constructor(
        private productSer: ProductService,
        private toast: HotToastService,
        private translate: TranslateService,
        private route: ActivatedRoute
    ){
        this.currentLang = localStorage.getItem('language')
    }
    loadProductDetails(){
        this.productSer.getProductDetails(this.productId).pipe(
          take(1),
        ).subscribe({
      next: (res) => {
        this.product.set(res);
        this.loadRelatedProducts(res.category);
        this.toast.success(`${this.translate.instant('toasts.Product_Details_loaded')}`, {
            duration: 1500,
            position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
        });
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
    this.isRelatedLoading.set(true);
    this.productSer.getProductList().pipe(
      take(1),
    ).subscribe(res => {
      this.relatedProducts.set(res.products.filter(p => p.category === category && p.id !== this.productId));
      this.isRelatedLoading.set(false);
    });
}
}