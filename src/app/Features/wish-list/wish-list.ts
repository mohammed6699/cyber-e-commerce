import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { WishListService } from '../../Services/WishList.service';
import { ProductCard } from '../../Shared/product-card/product-card';
import { ProductModel } from '../../Models/Product.model';
import { CartService } from '../../Services/Cart.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { ProductService } from '../../Services/Product.service';
import { Subscription } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Emptysection } from "../../directives/emptysection";

@Component({
  selector: 'app-wish-list',
  imports: [ProductCard, TranslatePipe, Emptysection],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css',
})
export class WishList implements OnInit, OnDestroy {
  searchQuery = signal<string>('');
  
  filteredItems = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const items = this.wishlistSer.items();
    if (!query) {
      return items;
    }
    return items.filter(item => 
      item.title.toLowerCase().includes(query)
    );
  });

  private searchSub!: Subscription;
  currentLang: any
  constructor (
    public wishlistSer: WishListService,
    private cartSer: CartService,
    private toast: HotToastService,
    private productSer: ProductService,
    private translate: TranslateService
  ){}

  ngOnInit() {
    // Subscribe to the global search
    this.searchSub = this.productSer.search$.subscribe(query => {
      this.searchQuery.set(query || '');
    });
    this.currentLang = localStorage.getItem('language')
  }

  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

  deleteItem(id: number){
    this.wishlistSer.deleteWishlistItem(id);
  }
  
  addTocart(product: ProductModel){
    this.toast.success(`${product.title} ${this.translate.instant('toasts.added_to_cart')}`, {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    });
    this.cartSer.addToCart(product);
  }
  navigateBack(){
    history.back()
  }
}
