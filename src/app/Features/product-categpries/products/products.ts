import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../Services/Product.service';
import { ProductModel, SearchProducts } from '../../../Models/Product.model';

import { ProductCard } from '../../../Shared/product-card/product-card';
import { HotToastService } from '@ngxpert/hot-toast';
import { CartService } from '../../../Services/Cart.service';
import { WishListService } from '../../../Services/WishList.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [ProductCard, TranslatePipe],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit{
  selectedCategories: string[] = []
  filteredProductList: ProductModel[] = [];
  constructor(
    private route: ActivatedRoute,
    private productSer : ProductService,
    private toast: HotToastService,
    private cartSer: CartService,
    private wishlistSer: WishListService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const catName = params['slug'];
      if(catName){
        this.selectedCategories = [catName];
      }
      this.productListMethod();
    })
  }
  productListMethod(){
    this.productSer.searchProductList('', 0, 0).subscribe({
      next: (res: SearchProducts) => {
        let filteredProducts = res.products;

        if(this.selectedCategories.length > 0){
          filteredProducts = filteredProducts.filter((prd:any) => this.selectedCategories.includes(prd.category));
        }
        this.cdr.markForCheck()
        this.filteredProductList = filteredProducts;
        
      }
    })
  }
  onAddToCart(product: ProductModel){
    this.toast.success(`${product.title} added to cart suddefully`);
    this.cartSer.addToCart(product);
  }
  onWishListClick(product: ProductModel): void{
    this.toast.success(`${product.title} added to wishList suddefully`);
    this.wishlistSer.toogleWishList(product)
    
  }
}
