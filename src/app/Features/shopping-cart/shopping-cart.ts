import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartService } from '../../Services/Cart.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductModel } from '../../Models/Product.model';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart implements OnInit{
  quantity: number = 1;
  product!:ProductModel;
  orderForm!: FormGroup;
  discount: number = 0
  constructor(
    public cartService: CartService,
    private fb: FormBuilder
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
      this.cartService.updateCartItemQuantity(item.id, currentQty - 1)
    }
  }
  increment(item: ProductModel){
    const currentQty = item.quantity || 1;
    if(currentQty < item.stock){
      this.cartService.updateCartItemQuantity(item.id, currentQty + 1)
    }
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
    
    this.discount = promoDiscount + bonusDiscount;
    this.FinalTotalAmout = Math.max(0, this.totalAmout - this.discount);
  }
}