import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoriesModel } from '../../Models/Categories.model';
import { ProductModel } from '../../Models/Product.model';
import { ProductCard } from "../../Shared/product-card/product-card";
import { CartService } from '../../Services/Cart.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-products-sample',
  imports: [ProductCard],
  templateUrl: './products-sample.html',
  styleUrl: './products-sample.css',
})
export class ProductsSample implements OnChanges {
  // instaed of apply the route.data.subscribe as using the @Input and receive teh data from hpme page to make dynamic 
  // as resolver slready saved teh data 
  @Input() categories: CategoriesModel[] = [];
  selectedCategories: string[] = [];
  @Input() allProducts: ProductModel[] = [];
  filteredProducts: ProductModel[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private toast: HotToastService,
    private cartSer: CartService
  ) { }
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
    this.toast.success(`${product.title} added to cart suddefully`);
    this.cartSer.addToCart(product);
  }
}
