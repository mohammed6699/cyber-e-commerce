import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
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
  isMenuOpen: boolean = false;

  constructor(
    private productService: ProductService,
    private router: Router,
    public cartSer: CartService,
    public wishlistSer: WishListService
  ){}
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearch(q: string){
    this.productService.search = q;
  }
  navigateToLogin(){
    this.router.navigate(['/login'])
  }
}
