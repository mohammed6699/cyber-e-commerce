import { Component, OnInit } from '@angular/core';
import { CategoriesModel } from '../../Models/Categories.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { CatCard } from "../../directives/cat-card";

@Component({
  selector: 'app-product-categpries',
  imports: [RouterLink, TranslatePipe, CatCard],
  templateUrl: './product-categpries.html',
  styleUrl: './product-categpries.css',
})
export class ProductCategpries implements OnInit{
  categories: CategoriesModel[] = [];
  displayCateogires: number = 6
  constructor(
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.categories = data['categories'];
      }
    })
  }
  loadMore():void{
    this.displayCateogires += 6;
  }
}
