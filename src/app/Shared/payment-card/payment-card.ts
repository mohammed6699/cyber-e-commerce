import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment-card',
  imports: [CommonModule],
  templateUrl: './payment-card.html',
  styleUrl: './payment-card.css',
})
export class PaymentCard {
  @Input({required: true}) cardNumber = '';
  @Input({required: true}) cardOwnerName = '';
  @Input({required: true}) expireMonth = '';
  @Input({required: true}) expireYear = '';
  @Input({required: true}) cvv = '';
  @Input() isFlipped = false;

  // function 
  getCardOwnerNameDisplay(): string {
    return this.cardOwnerName ? String(this.cardOwnerName) : 'card owner';
  }

  getCardNumberDisplay(): string {
    return this.cardNumber ? String(this.cardNumber) : '•••• •••• •••• ••••';
  }

  getExpireMonthDisplay(): string {
    const month = this.expireMonth ? String(this.expireMonth) : '';
    return month ? month.padStart(2, '0') : 'MM';
  }

  getExpireYearDisplay(): string {
    const year = this.expireYear ? String(this.expireYear) : '';
    return year ? year.slice(-2) : 'YY';
  }

  get cvvDisplay(): string {
    return this.cvv ? this.cvv : '•••';
  }
}
