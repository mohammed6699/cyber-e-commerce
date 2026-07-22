import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../Services/Product.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchProducts, ProductModel } from '../../Models/Product.model';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { CategoriesModel } from '../../Models/Categories.model';
import { ProductCard } from '../../Shared/product-card/product-card';
import { CartService } from '../../Services/Cart.service';
import { WishListService } from '../../Services/WishList.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProductCardSkeleton } from '../../Shared/skeleton/product-card-skeleton/product-card-skeleton';
import { ProductProxyService } from './Product.proxy';

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe, ProductCard, TranslatePipe, ProductCardSkeleton],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage implements OnInit, OnDestroy {
  searchText: string = '';
  pageSize: number = 12;
  get total(): number { return this.productProxy.total(); }
  skip: number = 0;
  pageNumber: number = 1;
  productList: ProductModel[] = [];
  productPrice!: number[]
  get categories() { return this.productProxy.categories(); }
  private searchSub!: Subscription;
  selectedCategories: string[] = []
  minPrice: number = 0;
  maxPrice: number = 3000;
  avgRate: number = 0;
  productNum!: number;
  sortProduct: string[] = [];
  currentSort: string = 'Sort: Featured';
  isFilterOpen: boolean = false;
  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize) || 1;
  }
  currentLang: any
  constructor(
    private productSer: ProductService,
    private toast: HotToastService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private cartSer: CartService,
    private wishlistSer: WishListService,
    private translateSer: TranslateService,
    public productProxy: ProductProxyService
  ) { }
  
  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  ngOnInit(): void {
    const initialsearch = this.activatedRoute.snapshot.queryParams['q'];
    if(initialsearch){
      this.productSer.search = initialsearch;
    }
    import('rxjs').then(({ combineLatest }) => {
      this.searchSub = combineLatest([
        this.activatedRoute.queryParams,
        this.productSer.search$
      ]).subscribe(([params, query]) => {
        this.pageNumber = params['page'] ? +params['page'] : 1;
        const previousSearchText = this.searchText;
        this.searchText = query;
        this.productProxy.searchText = query;
        if (previousSearchText !== query) {
          this.pageNumber = 1;
          this.pageSize = 12;
        }
        this.skip = (this.pageNumber - 1) * this.pageSize;
        this.cdr.detectChanges();
        this.productListMethod();
      });
    });
    this.loadGategoryList();
    this.currentLang = localStorage.getItem('language')
  }
  ngOnDestroy(): void {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }
  productListMethod() {
    this.productProxy.searchProductMethod();
  }
  onPageChange(newPage:number) {
    this.productProxy.onPageChange(newPage)
  }
  onPageSizeChange(newSize: number) {
    this.productProxy.pageSizeChange(newSize)
  }
  productOriginalrice(price: number, discountPercentage: number) {
    const originalPrice = price / (1 - (discountPercentage / 100));
    return originalPrice.toFixed(2);
  }
  // gategory list
  loadGategoryList() {
   this.productProxy.categoryList();
  }
  onCategoryChange(category: string, event: Event): void {
    this.productProxy.changeCategory(category, event)
  }

  updatePrice(event: Event) {
    this.productProxy.updatePrie(event)
  }

  updateRate(event: Event){
    this.productProxy.updateRate(event)
  }

  onSortChange(event: Event) {
    this.productProxy.sortProducts(event)
  }
  // add to cart
  onAddToCart(product: ProductModel){
    this.toast.success(`${product.title} ${this.translateSer.instant('products.added_to_cart_succefully')}`, {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-left' : 'top-right'
    });
    this.cartSer.addToCart(product);
  }
  // wish list
  onWishList(product: ProductModel){
    this.toast.success(`${product.title} ${this.translateSer.instant('products.added_to_wish_list_succefully')}`, {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-left' : 'top-right'
    });
    this.wishlistSer.addToWishlist(product)
  }
  onNavigateToDetails(id: number){
    this.route.navigate(['/products/details', id])
  }
}
