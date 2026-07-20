import { Component, Input, OnInit } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { RouterLink } from "@angular/router";
import { TranslatePipe } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { HeroSkeleton } from '../../Shared/skeleton/hero-skeleton/hero-skeleton';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, TranslatePipe, NgClass, HeroSkeleton],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit{
  
  @Input() products: ProductModel[] = [];
  @Input() isLoading: boolean = false;
  currentLanguage!: any
  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('language')
  }
}
