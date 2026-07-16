import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { PopularProuctsCard } from "../../Shared/popular-proucts-card/popular-proucts-card";
import { ProductService } from '../../Services/Product.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { CartService } from '../../Services/Cart.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-popular-products',
  imports: [PopularProuctsCard, NgClass],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css',
})
export class PopularProducts implements OnInit{
  @Input() products: ProductModel[] = [];
  constructor(
    private toast: HotToastService,
    private cartSer: CartService,
    private cdr: ChangeDetectorRef
  ){}
  ngOnInit(): void {
    // this.getProductList();
  }
  // getProductList(){
  //   this.prdSer.getProductList().subscribe({
  //     next:(res: any)=>{
  //       this.product = res.products;
  //       this.cdr.detectChanges();
  //     },
  //     error:(err)=> console.log('error loading products', err)
  //   })
  // }
  onAddToCart(product: ProductModel){
    this.toast.success(`${product.title} added to cart suddefully`);
    this.cartSer.addToCart(product);
  }
  
}
