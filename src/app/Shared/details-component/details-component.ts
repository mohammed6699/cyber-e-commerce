import { Component, Input } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-details-component',
  imports: [DatePipe],
  templateUrl: './details-component.html',
  styleUrl: './details-component.css',
})
export class DetailsComponent {
  @Input({required: true}) product!: ProductModel
}
