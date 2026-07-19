import { Component, Input } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { RouterLink } from "@angular/router";
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-announcement',
  imports: [RouterLink, NgClass, TranslatePipe],
  templateUrl: './announcement.html',
  styleUrl: './announcement.css',
})
export class Announcement{
  curentLanguage: any;
 
  @Input() products: ProductModel[] = [];
}
