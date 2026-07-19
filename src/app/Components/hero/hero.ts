import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { RouterLink } from "@angular/router";
import { TranslatePipe } from '@ngx-translate/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, TranslatePipe, NgClass],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit{
  
  @Input() products: ProductModel[] = [];
  currentLanguage!: any
  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('language')
  }
}
