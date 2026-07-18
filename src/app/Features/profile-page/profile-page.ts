import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { UserModel } from '../../Models/User.model';
import { FinalOrderModel } from '../../Models/Final-order.model';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit{
  userData!: UserModel;
  orderData!: FinalOrderModel;
  constructor(
    private toast: HotToastService
  ){}
  ngOnInit(): void {
    this.getOrderData();
    this.getUserData();
  }
  getUserData(){
    const userString = localStorage.getItem("user");
    if (userString) {
      this.userData = JSON.parse(userString);
      this.toast.success(`welcome back ${this.userData.userName}`);
    }
    console.log(this.userData);
    
  }
  getOrderData(){
    const orderString = localStorage.getItem("finalOrder");
    if (orderString) {
      this.orderData = JSON.parse(orderString);
    }
    console.log(this.orderData);
  }
}
