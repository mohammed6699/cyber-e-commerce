import { Component, Input } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';

@Component({
  selector: 'app-sample-product',
  imports: [],
  templateUrl: './sample-product.html',
  styleUrl: './sample-product.css',
})
export class SampleProduct {
  @Input() products: ProductModel[] = [];
  @Input() isLoading: boolean = false;
}
