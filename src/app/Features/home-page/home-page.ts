import { Component, OnInit } from '@angular/core';
import { Hero } from "../../Components/hero/hero";
import { SampleProduct } from "../../Components/sample-product/sample-product";
import { CategoriesSample } from "../../Components/categories-sample/categories-sample";
import { ProductsSample } from "../../Components/products-sample/products-sample";
import { PopularProducts } from "../../Components/popular-products/popular-products";
import { DiscountProducts } from "../../Components/discount-products/discount-products";
import { ProductListModel } from '../../Models/Product.model';
import { ActivatedRoute } from '@angular/router';
import { CategoriesModel } from '../../Models/Categories.model';
import { Announcement } from "../../Components/announcement/announcement";

@Component({
  selector: 'app-home-page',
  imports: [Hero, SampleProduct, CategoriesSample, ProductsSample, PopularProducts, DiscountProducts, Announcement],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  products!: ProductListModel;
  categories!: CategoriesModel[];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.products = this.activatedRoute.snapshot.data['products'];
    this.categories = this.activatedRoute.snapshot.data['categories'];
    
  }
}
