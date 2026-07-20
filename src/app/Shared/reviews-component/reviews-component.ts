import { Component, Input } from '@angular/core';
import { ProductModel } from '../../Models/Product.model';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Services/Cart.service';
import { ProductService } from '../../Services/Product.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-reviews-component',
  imports: [DatePipe, FormsModule, TranslatePipe],
  templateUrl: './reviews-component.html',
  styleUrl: './reviews-component.css',
})
export class ReviewsComponent{
  @Input({required: true}) product!: ProductModel
  selectedCategories: string[] = [];
  products!: ProductModel[];
  newComment: string = '';
  relatedProducts: ProductModel[] = [];

  constructor(
    private cartSer: CartService,
    private prouctSer: ProductService
  ){}


  submitReview(): void {
    if (this.newComment.trim()) {
      this.product.reviews.unshift({
        reviewerName: 'Current User', 
        date: new Date().toISOString(),
        comment: this.newComment,
        rating: 5,
        reviewerEmail: 'emailll' 
      });
      this.newComment = '';
    }
    localStorage.setItem('user review', JSON.stringify(this.product.reviews))
  }

  AvgRate(): string {
    if (this.product.reviews.length === 0) return '0.0';
    const sum = this.product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / this.product.reviews.length).toFixed(1);
  }
  TotalReviews(){
    return this.product.reviews.length;
  }
  StarsDistributionPercentage(stars: number): number {
    if (this.product.reviews.length === 0) return 0;
    const count = this.product.reviews.filter((review) => review.rating === stars).length;
    return Math.round((count / this.product.reviews.length) * 100);
  }
}
