import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../Services/Product.service';
import { CartService } from '../../Services/Cart.service';
import { WishListService } from '../../Services/WishList.service';
import { LanguageService } from '../../Services/Language.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass, CommonModule, FormsModule, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit{
  searchQuery: string = ''
  isMenuOpen: boolean = false;
  currentLang = 'en';
  token: any;
  constructor(
    private productService: ProductService,
    private router: Router,
    public cartSer: CartService,
    public wishlistSer: WishListService,
    private translateService: LanguageService,
  ){}
  ngOnInit(): void {
    this.translateService.language$.subscribe(lang => {
      this.currentLang = lang
    })
    this.token = localStorage.getItem('access-token');
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearch(q: string){
    this.productService.search = q;
  }
  navigateToLogin(){
    this.router.navigate(['/login'])
  }
  // handle transaltion logic
  changeLang(lang:string){
    this.translateService.changeLang(lang)
  }
  logout(){
    localStorage.removeItem('access-token');
    this.router.navigate(['/login'])
  }
}
