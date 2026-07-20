import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../Services/Product.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { SearchProducts, ProductModel, ProductListModel } from '../../Models/Product.model';
import { Subscription } from 'rxjs';
import { CurrencyPipe, NgStyle } from '@angular/common';
import { CategoriesModel } from '../../Models/Categories.model';
import { ProductCard } from '../../Shared/product-card/product-card';
import { CartService } from '../../Services/Cart.service';
import { WishListService } from '../../Services/WishList.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProductCardSkeleton } from '../../Shared/skeleton/product-card-skeleton/product-card-skeleton';

@Component({
  selector: 'app-product-page',
  imports: [CurrencyPipe, NgStyle, ProductCard, RouterLink, TranslatePipe, ProductCardSkeleton],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage implements OnInit, OnDestroy {
  isLoading: boolean = true;
  searchText: string = '';
  pageSize: number = 12;
  total: number = 0;
  skip: number = 0;
  pageNumber: number = 1;
  productList: ProductModel[] = [];
  productPrice!: number[]
  categories: CategoriesModel[] = []
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
    private translateSer: TranslateService
  ) { }
  
  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
  }

  ngOnInit(): void {
    import('rxjs').then(({ combineLatest }) => {
      this.searchSub = combineLatest([
        this.activatedRoute.queryParams,
        this.productSer.search$
      ]).subscribe(([params, query]) => {
        this.pageNumber = params['page'] ? +params['page'] : 1;
        this.searchText = query;
        if (this.searchText !== query) {
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
    this.isLoading = true;
    this.productSer.searchProductList(this.searchText, 0, 0).subscribe({
      next: (res: SearchProducts) => {
        let filteredProducts = res.products;        
        //Category Filter
        if (this.selectedCategories.length > 0) {
          filteredProducts = filteredProducts.filter((prd:any) => this.selectedCategories.includes(prd.category));
        }
        //Price Filter
        filteredProducts = filteredProducts.filter((prd:any) => prd.price >= this.minPrice && prd.price <= this.maxPrice);
        //Rate Filter
        filteredProducts = filteredProducts.filter((prd:any) => prd.rating >= this.avgRate);
        // sort products
        switch(this.currentSort){
            case 'Price: Low to High':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
          case 'Price: High to Low':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
          case 'Rate: High to Low':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
          case 'Name: A to Z':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'Name: Z to A':
            filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
            break;
          }
        this.total = filteredProducts.length;

        // Apply Local Pagination
        const start = (this.pageNumber - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.productList = filteredProducts.slice(start, end);

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        // console.log("Error message", err);
        this.toast.error(this.translateSer.instant("products.Error_loading_products"), {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    })
      }
    })
  }
  onPageChange(newPage: number) {
    this.pageNumber = newPage;
    this.skip = (newPage - 1) * this.pageSize;
    this.route.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: newPage, q: this.searchText || '' },
      queryParamsHandling: 'merge',
    });
    this.productListMethod()
  }
  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.pageNumber = 1;
    this.productListMethod()
  }
  productOriginalrice(price: number, discountPercentage: number) {
    const originalPrice = price / (1 - (discountPercentage / 100));
    return originalPrice.toFixed(2);
  }
  // gategory list
  loadGategoryList() {
    this.productSer.getCategoriesList().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        // console.log("error loading catgories", err)
        this.toast.error(this.translateSer.instant("products.Error_Loading_categories"), {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    })
      }
    })
  }
  onCategoryChange(category: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }
    this.pageNumber = 1;
    this.productListMethod();
  }

  updatePrice(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.maxPrice = Number(inputElement.value);
    this.pageNumber = 1;
    this.productListMethod();
  }

  updateRate(event: Event){
    const inputElement = event.target as HTMLInputElement;
    this.avgRate = Number(inputElement.value);
    this.pageNumber = 1;
    this.productListMethod();
  }

  onSortChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.currentSort = selectElement.value;
    this.pageNumber = 1;
    this.productListMethod();
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
