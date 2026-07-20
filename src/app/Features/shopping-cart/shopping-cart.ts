import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../Services/Cart.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModel } from '../../Models/Product.model';
import { Router } from '@angular/router';
import { share } from 'rxjs';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart implements OnInit{
  quantity: number = 1;
  product!:ProductModel;
  orderForm!: FormGroup;
  discount: number = 0;
  tax: number = 15;
  shippigValue: number = 50;
  cartProces: any = null;
  currentLang: any
  constructor(
    public cartService: CartService,
    private fb: FormBuilder,
    private router: Router,
    private toast: HotToastService,
    private translateSer: TranslateService
) {}
  totalAmout: number = 0;
  FinalTotalAmout: number = this.totalAmout;
  ngOnInit(): void {
    this.totalAmout = this.cartService.cartTotalAmount();
    this.FinalTotalAmout = this.totalAmout;
    this.orderForm = this.fb.group({
      promoCode: ['', Validators.required],
      bonusCard: ['', Validators.required]
    })
    this.orderForm.valueChanges.subscribe(() => {
      this.calculateTotalPrice(this.orderForm.value);
    })
    this.calculateTotalPrice(this.orderForm.value);
    this.currentLang = localStorage.getItem('language')
  }
  poductsInCart(){
    return this.cartService.getCartItems()
  }
  productPrice(){
    // calaulate the toatl price for product
    return this.cartService.getCartTotalAmount()
  }
  decrement(item: ProductModel): void{
    const currentQty = item.quantity || 1;
    if(currentQty > 1){
      this.cartService.updateCartItemQuantity(item.id, currentQty - 1);
      this.calculateTotalPrice(this.orderForm.value);
    }
  }
  increment(item: ProductModel){
    const currentQty = item.quantity || 1;
    if(currentQty < item.stock){
      this.cartService.updateCartItemQuantity(item.id, currentQty + 1);
      this.calculateTotalPrice(this.orderForm.value);
    }
  }
  deleteItem(id: number){
    this.cartService.deleteCartItem(id);
    this.calculateTotalPrice(this.orderForm.value);
  }
  // cal. product price 
  cartPrice(item:ProductModel){
    return (item?.quantity || 1) * item?.price;
  }
  calculateTotalPrice(value: any){
    this.totalAmout = this.cartService.cartTotalAmount();
    
    let promoDiscount = 0;
    if(value.promoCode === 'PROMO20'){
      promoDiscount = this.totalAmout * 0.2;
    } else if (value.promoCode === 'PROMO50'){
      promoDiscount = this.totalAmout * 0.5;
    }
    
    let bonusDiscount = 0;
    if(value.bonusCard && value.bonusCard.length >= 12){
      bonusDiscount = 10;
    }
    if(this.cartService.cartTotalAmount() > 500){
      this.shippigValue = 0;
    }else{
      this.shippigValue = 50
    }
    this.discount = promoDiscount + bonusDiscount;
    this.FinalTotalAmout = Math.max(0, this.totalAmout - this.discount) + this.tax + this.shippigValue;
    this.cartProces = {
      totalAmout: this.totalAmout,
      discount: this.discount,
      tax: this.tax,
      shippigValue: this.shippigValue,
      FinalTotalAmout: this.FinalTotalAmout
    };
  }
  navigateToCheckout(){
    localStorage.setItem('cartDetails', JSON.stringify(this.cartProces))
   
    if(this.cartService.items().length === 0){
      this.toast.warning(this.translateSer.instant('Cart.empty_product'), {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    })
      return;
    }else{
      this.router.navigate(['/checkout'])
    }
  }
  navigateBack(){
    history.back()
  }
}