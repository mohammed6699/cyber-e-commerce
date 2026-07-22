import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';
import { UserModel } from '../../Models/User.model';
import { FinalOrderModel } from '../../Models/Final-order.model';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-page',
  imports: [TranslatePipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit{
  userData!: UserModel;
  ordersList: FinalOrderModel[] = [];
  currentLang: any
  constructor(
    private toast: HotToastService,
    private translateSer: TranslateService
  ){}
  ngOnInit(): void {
    this.getOrderData();
    this.getUserData();
    this.currentLang = localStorage.getItem('language')
  }
  getUserData(){
    const userString = localStorage.getItem("user");
    if (userString) {
      this.userData = JSON.parse(userString);
      this.toast.success(`${this.translateSer.instant('profile.Welcome_back')} ${this.userData.userName}`, {
        duration: 1500,
        position: this.currentLang === 'ar' ? 'top-right' : 'top-left'
    });
    }
    console.log(this.userData);
    
  }
  getOrderData(){
    const orderString = localStorage.getItem("finalOrder");
    if (orderString) {
      try {
        const orders = JSON.parse(orderString);
        // Assuming the structure is an array of orders
        if (Array.isArray(orders)) {
          this.ordersList = [...orders].reverse();
        } 
        // Fallback: If it was stored as a single object previously
        else if (orders && typeof orders === 'object') {
          this.ordersList = [orders];
        }
      } catch (e) {
        console.error("Error parsing orders:", e);
      }
    }
    console.log("Final ordersList:", this.ordersList);
  }
}
