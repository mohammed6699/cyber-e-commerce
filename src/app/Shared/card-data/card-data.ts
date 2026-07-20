import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';

@Component({
  selector: 'app-card-data',
  imports: [],
  templateUrl: './card-data.html',
  styleUrl: './card-data.css',
})
export class CardData {
  @Input({required: true}) products!: ProductModel[]
  @Input() showmoretn: boolean = false
  @Output() navigateToProducts = new EventEmitter<string>();

  onShowmoreClicked(){
    this.navigateToProducts.emit()
  }
}
