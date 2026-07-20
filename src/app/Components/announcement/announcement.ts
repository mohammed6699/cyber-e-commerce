import { Component, Input } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { RouterLink } from "@angular/router";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-announcement',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './announcement.html',
  styleUrl: './announcement.css',
})
export class Announcement{
  curentLanguage: any;
 
  @Input() products: ProductModel[] = [];
}
