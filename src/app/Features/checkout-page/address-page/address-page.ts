import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { AddressModel } from '../../../Models/Address.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { FormInput } from "../../../Shared/form-input/form-input";

@Component({
  selector: 'app-address-page',
  imports: [ReactiveFormsModule, TranslatePipe, FormInput],
  templateUrl: './address-page.html',
  styleUrl: './address-page.css',
})
export class AddressPage implements OnInit{
  addressForm!: FormGroup;
  isFormVisible: boolean = false;
  addresses: AddressModel[] = [];
  edittingIndex: number | null = null
  codeRegex = '^[0-9]+$';
  titleRegex = "^[a-zA-Z\u0600-\u06FF\s']{4,20}$";
  addRegex = "^[a-zA-Z0-9\u0600-\u06FF\s,.\-\/#]{5,}$";
  currentLang: any
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: HotToastService,
    private transate: TranslateService
  ){}
  ngOnInit(): void {
    this.addressForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(this.titleRegex)]],
      address: ['', [Validators.required, Validators.pattern(this.addRegex)]],
      Postcode: ['', [Validators.required, Validators.pattern(this.codeRegex)]],
      place: ['Home', Validators.required]
    })
    const savedAddress = localStorage.getItem('useraddress');
    this.addresses = savedAddress ? JSON.parse(savedAddress) : [];
    this.currentLang = localStorage.getItem('language')
  }
  saveAddress(){
    if(this.addressForm.valid){
      if(this.edittingIndex !== null){
        this.addresses[this.edittingIndex] = this.addressForm.value
        this.edittingIndex = null
      } else {
        this.addresses.push(this.addressForm.value)
      }
      localStorage.setItem('useraddress', JSON.stringify(this.addresses));
      this.addressForm.reset();
      this.isFormVisible = false
      this.toast.success(this.transate.instant('Address.Address_saved_successfully'), {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    })
    }else{
      this.toast.warning(this.transate.instant('Address.Please_fill_all_the_fields'), {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    })
    }
  }
  navigateBack(){
    history.back()
  }
  toggleForm(){
    this.isFormVisible = !this.isFormVisible;
    if(!this.isFormVisible){
      this.edittingIndex = null;
      this.addressForm.reset()
    }
  }
  selectAddress(address: any){
    this.router.navigate(['checkout/shipping']);
  }
  deleteAddress(index: number){
    this.addresses.splice(index, 1);
    localStorage.setItem('useraddress', JSON.stringify(this.addresses));
  }
  editAddress(index:number){
    this.edittingIndex = index
    const addressToEdit = this.addresses[index];
    this.addressForm.patchValue(addressToEdit);
    this.isFormVisible = true;
    this.toast.success(this.transate.instant('Address.Address_updated_successfully'),{
      duration: 1500,
      position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
  });
  }
}
