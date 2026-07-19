import { Component, Input, OnInit } from '@angular/core';
import { CategoriesModel } from '../../Models/Categories.model';
import { TranslatePipe } from '@ngx-translate/core';
import { NgClass } from '@angular/common';
import { CatCard } from "../../directives/cat-card";

@Component({
  selector: 'app-categories-sample',
  imports: [TranslatePipe, NgClass, CatCard],
  templateUrl: './categories-sample.html',
  styleUrl: './categories-sample.css',
})
export class CategoriesSample implements OnInit{
  curentLanguage: any;
  ngOnInit(): void {
    this.curentLanguage = localStorage.getItem('language')
  }
  @Input() categories!: CategoriesModel[];
}
