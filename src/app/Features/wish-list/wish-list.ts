import { Component, OnInit, OnDestroy } from '@angular/core';
import { WishListService } from '../../Services/WishList.service';
import { ProductCard } from '../../Shared/product-card/product-card';
import { ProductModel } from '../../Models/Product.model';
import { CartService } from '../../Services/Cart.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { ProductService } from '../../Services/Product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wish-list',
  imports: [ProductCard],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css',
})
export class WishList implements OnInit, OnDestroy {
  filteredItems: ProductModel[] = [];
  private searchSub!: Subscription;

  constructor (
    public wishlistSer: WishListService,
    private cartSer: CartService,
    private toast: HotToastService,
    private productSer: ProductService
  ){}

  ngOnInit() {
    this.filteredItems = this.wishlistSer.items();
    
    // Subscribe to the global search
    this.searchSub = this.productSer.search$.subscribe(query => {
      this.filterItems(query);
    });
  }

  filterItems(query: string) {
    const allItems = this.wishlistSer.items();
    if (!query) {
      this.filteredItems = allItems;
    } else {
      this.filteredItems = allItems.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

  deleteItem(id: number){
    this.wishlistSer.deleteWishlistItem(id);
    // getValue built in function for behaviour subject
    this.filterItems(this.productSer['searchSubject'].getValue() || '');
    console.log(`item deleted`);
  }
  
  addTocart(product: ProductModel){
    this.toast.success(`${product.title} added to cart suddefully`);
    this.cartSer.addToCart(product);
  }
}
