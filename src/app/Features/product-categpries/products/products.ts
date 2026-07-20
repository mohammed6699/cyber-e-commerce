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
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const catName = params['slug'];
      if(catName){
        this.selectedCategories = [catName];
      }
      // this.productListMethod();
      // handle search for the page
      this.productSer.search$.subscribe(query => {
        this.searchText = query;
        this.productListMethod();
      })
    })
    this.currentLang = localStorage.getItem('language')
  }
  productListMethod(){
    this.isLoading = true;
    this.productSer.searchProductList(this.searchText, 0, 0).subscribe({
      next: (res: SearchProducts) => {
        let filteredProducts = res.products;

        if(this.selectedCategories.length > 0){
          filteredProducts = filteredProducts.filter((prd:any) => this.selectedCategories.includes(prd.category));
        }
        this.cdr.markForCheck()
        this.filteredProductList = filteredProducts;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    })
  }
  onAddToCart(product: ProductModel){
    this.toast.success(`${product.title} ${this.translate.instant('toasts.added_to_cart_suddefully')}`, {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    });
    this.cartSer.addToCart(product);
  }
  onWishListClick(product: ProductModel): void{
    this.toast.success(`${product.title} added to wishList suddefully`, {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    });
    this.wishlistSer.toogleWishList(product)
    
  }
  navigateBack(){
    history.back()
  }
}
