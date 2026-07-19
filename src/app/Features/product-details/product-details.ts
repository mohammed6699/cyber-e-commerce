import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/Product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../../Models/Product.model';
import { HotToastService } from '@ngxpert/hot-toast';
import { DetailsCard } from "../../Shared/details-card/details-card";
import { CartService } from '../../Services/Cart.service';
import { DetailsComponent } from "../../Shared/details-component/details-component";
import { NgClass } from '@angular/common';
import { ReviewsComponent } from "../../Shared/reviews-component/reviews-component";
import { ProductCard } from '../../Shared/product-card/product-card';
import { WishListService } from '../../Services/WishList.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-details',
  imports: [DetailsCard, DetailsComponent, NgClass, ReviewsComponent, ProductCard, TranslatePipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  productId!: number;
  product!: ProductModel;
  relatedProducts: ProductModel[] = [];

  constructor(
    private productSer: ProductService,
    private route: ActivatedRoute,
    private toast: HotToastService,
    private cartSer: CartService,
    private cdr: ChangeDetectorRef,
    private wishlistSer: WishListService
  ) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id')!);
      if (this.productId) {
        this.loadProductDetails()
      }
    })
  }
  loadProductDetails() {
    this.productSer.getProductDetails(this.productId).subscribe({
      next: (res) => {
        this.product = res;
        this.loadRelatedProducts(res.category);
        this.toast.success('Product Details loaded');
        this.cdr.detectChanges()
      },
      error: (err) => {
        this.toast.error('Error loading product details')
        console.log(err);
      }
    })
  }
  loadRelatedProducts(category: string) {
    this.productSer.getProductList().subscribe(res => {
      this.relatedProducts = res.products.filter(p => p.category === category && p.id !== this.productId);
      this.cdr.detectChanges()
    });
  }
  productOriginalPrice(price: number, discountPercentage: number) {
    const originalPrice = price - (price * (discountPercentage / 100));
    return originalPrice.toFixed(2);
  }
  AddToCart(event: { product: ProductModel, quantity: number }) {
    const existsItem = this.cartSer.items().find(item => item.id === event.product.id)
    if (existsItem) {
      const newQty = (existsItem.quantity || 1) + event.quantity;
      this.cartSer.updateCartItemQuantity(event.product.id, newQty)
    } else {
      this.cartSer.addToCart(event.product);
      this.cartSer.updateCartItemQuantity(event.product.id, event.quantity)
    }
  }
  cart(product: ProductModel){
    this.toast.success(`${product.title} added to cart`);
    this.cartSer.addToCart(product);
  }
  AddToWishlist(product: ProductModel) {
    this.toast.success(`${product.title} added to your wish list`)
    this.wishlistSer.addToWishlist(product)
  }
}
