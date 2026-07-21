import { Injectable, signal } from "@angular/core";
import { ProductModel, SearchProducts } from "../../../Models/Product.model";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../../Services/Product.service";
import { HotToastService } from "@ngxpert/hot-toast";
import { CartService } from "../../../Services/Cart.service";
import { WishListService } from "../../../Services/WishList.service";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class ProductsProxy {
    selectedCategories = signal<string[]>([]);
    filteredProductList = signal<ProductModel[]>([]);
    currentLang = signal<any>(null);
    isLoading = signal<boolean>(true);
    searchText: string= ''
    constructor(
        private productSer : ProductService,
    ){
      this.currentLang.set(localStorage.getItem('language'))
      
    }
    productListMethod(){
        this.isLoading.set(true);
    this.productSer.searchProductList(this.searchText, 0, 0).subscribe({
      next: (res: SearchProducts) => {
        let filteredProducts = res.products;

        if(this.selectedCategories().length > 0){
          filteredProducts = filteredProducts.filter((prd:any) => this.selectedCategories().includes(prd.category));
        }
        this.filteredProductList.set(filteredProducts);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    })
      }
    
}