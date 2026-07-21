import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../Services/Product.service';
import { ProductModel, SearchProducts } from '../../../Models/Product.model';

import { ProductCard } from '../../../Shared/product-card/product-card';
import { HotToastService } from '@ngxpert/hot-toast';
import { CartService } from '../../../Services/Cart.service';
import { WishListService } from '../../../Services/WishList.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { ProductCardSkeleton } from '../../../Shared/skeleton/product-card-skeleton/product-card-skeleton';
import { ProductsProxy } from './products.proxy';

@Component({
  selector: 'app-products',
  imports: [ProductCard, TranslatePipe, ProductCardSkeleton],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit{
  selectedCategories: string[] = []
  filteredProductList: ProductModel[] = [];
  currentLang: any
  isLoading: boolean = true;
  searchText: string = ''
  constructor(
    private route: ActivatedRoute,
    private productSer : ProductService,
    private toast: HotToastService,
    private cartSer: CartService,
    private wishlistSer: WishListService,
    private translate: TranslateService,
    public productsProxy: ProductsProxy,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const catName = params['slug'];

      // Reset state for new category
      this.productsProxy.filteredProductList.set([]);
      this.productsProxy.isLoading.set(true);

      if(catName){
        this.selectedCategories = [catName];
        this.productsProxy.selectedCategories.set([catName]);
      } else {
        this.productsProxy.selectedCategories.set([]);
      }

      this.productSer.search$.subscribe(query => {
        this.searchText = query;
        this.productsProxy.searchText = query
        this.productListMethod();
      })
    })
    this.currentLang = localStorage.getItem('language')
  }
  productListMethod(){
      this.productsProxy.productListMethod();
      this.cdr.detectChanges()
  }
  onAddToCart(product: ProductModel){
    this.toast.success(`${product.title} ${this.translate.instant('toasts.added_to_cart_succefully')}`, {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    });
    this.cartSer.addToCart(product);
  }
  onWishListClick(product: ProductModel): void{
    this.toast.success(`${product.title} ${this.translate.instant('toasts.added_to_wishList_succefully')}`, {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    });
    this.wishlistSer.toogleWishList(product)
    
  }
  navigateBack(){
    history.back()
  }
}
