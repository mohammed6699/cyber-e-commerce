import { Component } from '@angular/core';

@Component({
  selector: 'app-product-card-skeleton',
  template: `
    <div class="w-full h-auto rounded-[9px] shadow-md p-4 bg-[#F6F6F6] animate-pulse">
        <!-- Image Skeleton -->
        <div class="w-full h-[150px] md:h-[270px] bg-gray-200 rounded"></div>
        
        <!-- Details Skeleton -->
        <div class="mt-4 flex flex-col items-center w-full gap-2">
            <div class="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div class="h-3 w-1/2 bg-gray-200 rounded"></div>
            <div class="h-3 w-1/4 bg-gray-200 rounded mt-2"></div>
            <div class="h-8 w-full bg-gray-200 rounded mt-2"></div>
        </div>
    </div>
  `
})
export class ProductCardSkeleton {}
