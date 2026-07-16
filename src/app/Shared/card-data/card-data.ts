import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card-data',
  imports: [RouterLink],
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
