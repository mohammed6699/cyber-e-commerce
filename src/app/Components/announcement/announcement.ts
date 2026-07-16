import { Component, Input } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-announcement',
  imports: [RouterLink],
  templateUrl: './announcement.html',
  styleUrl: './announcement.css',
})
export class Announcement {
  @Input() products: ProductModel[] = [];
}
