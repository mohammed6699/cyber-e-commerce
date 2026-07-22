import { ChangeDetectorRef, DestroyRef, Injectable, signal, Signal } from "@angular/core";
import { ProductService } from "../../Services/Product.service";
import { ProductModel, SearchProducts } from "../../Models/Product.model";
import { TranslateService } from "@ngx-translate/core";
import { HotToastService } from "@ngxpert/hot-toast";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriesModel } from "../../Models/Categories.model";
import { take } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
    providedIn: 'root'
})
export class ProductProxyService {
    searchText: string = '';
    selectedCategories: string[] = [];
    minPrice: number = 0;
    maxPrice: number = 3000;
    avgRate: number = 0;
    currentSort: string = 'Sort: Featured';
    total = signal<number>(0);
    skip: number = 0;
    pageNumber: number = 1;
    productList = signal<ProductModel[]>([])
    pageSize: number = 12;
    isLoading = signal<boolean>(true)
    currentLang: any;
    categories = signal<CategoriesModel[]>([])
    // in case you have to use takeUntillDestroy() ypu have to inject DestroyRef in consttructor
    constructor(
        private productService: ProductService,
        private translate:TranslateService,
        private toast:HotToastService,
        private router: Router,
        private route: ActivatedRoute,
        private destroy: DestroyRef
    ){
        this.currentLang = localStorage.getItem('language')
    }
    // handle filter and sort
    searchProductMethod(){
      this.isLoading.set(true)
      // handle the memory leak alos for search
        this.productService.searchProductList(this.searchText, 0, 0).pipe(
          takeUntilDestroyed(this.destroy),
        ).subscribe({
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
            this.total.set(filteredProducts.length);
            const start = (this.pageNumber - 1) * this.pageSize;
            const end = start + this.pageSize;
            this.productList.set(filteredProducts.slice(start, end));
            this.isLoading.set(false);
        },
        error: (err) => {
           this.isLoading.set(false);
            this.toast.error(this.translate.instant("products.Error_loading_products"), {
            duration: 1500,
            position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    })
        }
        })
    };
    onPageChange(newPage: number){
        this.pageNumber = newPage;
        this.skip = (newPage - 1) * this.pageSize;
        this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: newPage, q: this.searchText || '' },
        queryParamsHandling: 'merge',
      });
      this.searchProductMethod()
    }
    pageSizeChange(newSize: number){
      this.pageSize = newSize;
      this.pageNumber = 1
      this.searchProductMethod()
    };
    categoryList(){
    // handle memory leak using pipe and take
    this.productService.getCategoriesList().pipe(
      takeUntilDestroyed(this.destroy),
    ).subscribe({
      next: (res: any) => {
        this.categories.set(res)
      },
      error: (err) => {
      this.toast.error(this.translate.instant("products.Error_Loading_categories"), {
      duration: 1500,
      position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    })
    }
    })
    }
    // change category
    changeCategory(category: string, event: Event){
        const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }
    this.pageNumber = 1;
    this.searchProductMethod()
    }
    updatePrie(event: Event){
      const inputElement = event.target as HTMLInputElement;
      this.maxPrice = Number(inputElement.value);
      this.pageNumber = 1;
      this.searchProductMethod()

    }
    updateRate(event: Event){
      const inputElement = event.target as HTMLInputElement;
      this.avgRate = Number(inputElement.value);
      this.pageNumber = 1;
      this.searchProductMethod()

    }
    sortProducts(event: Event){
      const selectElement = event.target as HTMLSelectElement;
      this.currentSort = selectElement.value;
      this.pageNumber = 1;
      this.searchProductMethod()

    }
}