import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-shipping-page',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './shipping-page.html',
  styleUrl: './shipping-page.css',
})
export class ShippingPage implements OnInit {
  shippingForm!: FormGroup;

  shipmentTypes = [
    { id: 1, price: 'Free', type: 'Regulary shipment', data: '17/07/2026 - 20/07/2026' },
    { id: 2, price: '8.5', type: 'Express', data: '18/07/2026 - 19/07/2026' },
    { id: 3, price: '', type: 'Scheduled', data: 'Choose a date' }
  ];

  constructor(
    private fb: FormBuilder,
    private toast: HotToastService,
    private router: Router,
    private translateSer: TranslateService
  ) {}

  ngOnInit(): void {
    this.shippingForm = this.fb.group({
      method: [null, Validators.required],
      deliveryDate: [null]
    });

    this.shippingForm.get('method')?.valueChanges.subscribe(value => {
      const dateControl = this.shippingForm.get('deliveryDate');
      if (value?.id === 3) {
        dateControl?.setValidators(Validators.required);
      } else {
        dateControl?.clearValidators();
      }
      dateControl?.updateValueAndValidity()
    });
  }

  selectShipment(shipment: any) {
    this.shippingForm.patchValue({ method: shipment });
  }

  submit() {
    if (this.shippingForm.valid) {
      localStorage.setItem('shipment', JSON.stringify(this.shippingForm.value));
      this.toast.success(this.translateSer.instant('Shipment.Shipping_method_saved'), {duration: 1500});
      this.router.navigate(['checkout/payment']);
    }
  }

  navigateBack() {
    history.back();
  }
}
