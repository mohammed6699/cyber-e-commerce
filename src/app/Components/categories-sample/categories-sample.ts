import { Component, Input } from '@angular/core';
import { CategoriesModel } from '../../Models/Categories.model';

@Component({
  selector: 'app-categories-sample',
  imports: [],
  templateUrl: './categories-sample.html',
  styleUrl: './categories-sample.css',
})
export class CategoriesSample{
  @Input() categories!: CategoriesModel[];
}
