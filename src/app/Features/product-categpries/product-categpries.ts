import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductListModel } from '../../Models/Product.model';
import { CategoriesModel } from '../../Models/Categories.model';
import { ProductService } from '../../Services/Product.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-categpries',
  imports: [RouterLink],
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
