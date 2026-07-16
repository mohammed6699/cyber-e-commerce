import { Component, Input } from '@angular/core';
import { CardData } from "../../Shared/card-data/card-data";
import { ProductModel } from '../../Models/Product.model';

@Component({
  selector: 'app-sample-product',
  imports: [CardData],
  templateUrl: './sample-product.html',
  styleUrl: './sample-product.css',
})
export class SampleProduct {
  @Input() products: ProductModel[] = [];
}
