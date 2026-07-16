import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ProductService } from '../../Services/Product.service';
import { ProductModel } from '../../Models/Product.model';
import { ProductCard } from "../../Shared/product-card/product-card";
import { CartService } from '../../Services/Cart.service';
import { ProductDetails } from '../../Features/product-details/product-details';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-discount-products',
  imports: [ProductCard],
  templateUrl: './discount-products.html',
  styleUrl: './discount-products.css',
})
export class DiscountProducts{ 
  @Input() products: ProductModel[] = [];
  constructor(
    private cartSer: CartService,
    private toast: HotToastService
  ) { }
  addTocart(product: ProductModel){
    this.toast.success(`${product.title} added to cart succefully`);
    this.cartSer.addToCart(product)
  }
}
