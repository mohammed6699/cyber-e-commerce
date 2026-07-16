import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../Services/Product.service';
import { CartService } from '../../Services/Cart.service';
import { WishListService } from '../../Services/WishList.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass, CommonModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  searchQuery: string = ''
  constructor(
    private productService: ProductService,
    private router: Router,
    public cartSer: CartService,
    public wishlistSer: WishListService
  ){}
  onSearch(q: string){
    this.productService.search = q;
  }
  navigateToLogin(){
    this.router.navigate(['/login'])
  }
}
