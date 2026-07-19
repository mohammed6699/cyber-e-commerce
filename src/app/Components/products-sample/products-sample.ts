import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CategoriesModel } from '../../Models/Categories.model';
import { ProductModel } from '../../Models/Product.model';
import { ProductCard } from "../../Shared/product-card/product-card";
import { CartService } from '../../Services/Cart.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-sample',
  imports: [ProductCard],
  templateUrl: './products-sample.html',
  styleUrl: './products-sample.css',
})
export class ProductsSample implements OnChanges, OnInit {
  // instaed of apply the route.data.subscribe as using the @Input and receive teh data from hpme page to make dynamic 
  // as resolver slready saved teh data 
  @Input() categories: CategoriesModel[] = [];
  selectedCategories: string[] = [];
  @Input() allProducts: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];
  currentLang: any

  constructor(
    private cdr: ChangeDetectorRef,
    private toast: HotToastService,
    private cartSer: CartService,
    private translate: TranslateService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.currentLang = localStorage.getItem('language')
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['allProducts'] && this.allProducts.length > 0 && this.categories.length > 0){
      this.onCategorySelect(this.categories[0].slug);
    }
  }

  onCategorySelect(categorySlug: string) {
    this.selectedCategories = [categorySlug];
    this.filteredProducts = this.allProducts
        .filter(p => p.category === categorySlug)
        .slice(0, 4);
    this.cdr.detectChanges();
  }
  onAddToCart(product: ProductModel){
    this.toast.success(`${product.title} ${this.translate.instant('toasts.added_to_cart_suddefully')}`, 
      {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    });
    this.cartSer.addToCart(product);
  };
  onViewDetails(id:number){
    this.router.navigate(['/products/details', id]);
  }
}
