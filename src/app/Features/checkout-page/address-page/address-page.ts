import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { AddressModel } from '../../../Models/Address.model';

@Component({
  selector: 'app-address-page',
  imports: [ReactiveFormsModule],
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
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toast: HotToastService
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
      this.toast.success('Address saved successfully')
    }else{
      this.toast.warning('Please fill all the fields')
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
  }
}
