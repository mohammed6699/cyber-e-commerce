import { Component, OnInit } from '@angular/core';
import { AddressModel, CartPaymentDetails, ShipmentModel } from '../../../Models/Address.model';
import { CurrencyPipe } from '@angular/common';
import { PaymentCard } from "../../../Shared/payment-card/payment-card";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-payment-page',
  imports: [CurrencyPipe, PaymentCard, ReactiveFormsModule, FormsModule, TranslatePipe],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.css',
})
export class PaymentPage implements OnInit{

  // get address, shipment, items form cart summary
  // payment two options card, cash on delivery
  catItems!: any[]
  shipmentItems!: ShipmentModel;
  addressItems!: AddressModel;
  cartDetails!: CartPaymentDetails;
  cardDetails = {
    cardNumber: '',
    cardOwnerName: '',
    expireMonth: '',
    expireYear: '',
    cvv: ''
  }
  paymentForm!: FormGroup;
  paymentType: string = 'card';
  isFlipped = false;
  
  constructor(
    private fb: FormBuilder,
    private toast: HotToastService,
    private translateSer: TranslateService
  ){}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      cardOwnerName: ['', Validators.required],
      expireMonth: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      expireYear: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
    this.getCartItemsFromLocalStorage()
    this.getShipmentItemsFromLocalStorage()
    this.getAddressItemsFromLocalStorage()
    this.getCartDetails()
  }
  // right side data details from l.s
  getCardDetailsFromLocalStorage(){
    const cardDetails = localStorage.getItem('card')
    if(cardDetails){
      this.cardDetails = JSON.parse(cardDetails)
    }
    console.log(this.cardDetails);
  }

  getCartItemsFromLocalStorage(){
    this.catItems = JSON.parse(localStorage.getItem('cart') || '[]')
  }
  getShipmentItemsFromLocalStorage(){
    const shipment = localStorage.getItem('shipment')
    if(shipment){
      this.shipmentItems = JSON.parse(shipment)
    }
    console.log(shipment);
  }
  
  getAddressItemsFromLocalStorage(){
    const addresses = JSON.parse(localStorage.getItem('useraddress')!)
    if(addresses.length > 0){
      this.addressItems = addresses[addresses.length - 1]
    }
  }
  getCartDetails(){
    const cartDetails = localStorage.getItem('cartDetails');
    if(cartDetails){
      this.cartDetails = JSON.parse(cartDetails)
    }
    console.log(this.cartDetails);
  }

  handlePayment(){
    const finalOrder = {
      items: this.catItems,
      address: this.addressItems,
      shipment: this.shipmentItems,
      paymentDetails: this.cartDetails,
      paymentMethod: this.paymentType,
      cardDetails: this.paymentType === 'card' ? this.paymentForm.value : null
    };

    localStorage.setItem('finalOrder', JSON.stringify(finalOrder));
    this.toast.success(`${this.translateSer.instant('payment.Payment_processed_successfully_via')} ${this.paymentType}!`, {duration: 1500});
    this.paymentForm.reset()
    console.log('Order saved:', finalOrder);
  }
  navigateBack(){
    history.back()
  }
}
