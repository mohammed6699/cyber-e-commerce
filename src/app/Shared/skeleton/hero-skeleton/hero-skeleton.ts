import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-skeleton',
  template: `
    <div>
        <div class="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
            <!-- Text Skeleton -->
            <div class="w-full lg:w-[714px] flex flex-col gap-6 text-center md:text-left">
                <div class="h-6 w-1/4 bg-gray-700 rounded mx-auto md:mx-0"></div>
                <div class="h-20 w-full bg-gray-700 rounded"></div>
                <div class="h-16 w-3/4 bg-gray-700 rounded mx-auto md:mx-0"></div>
                <div class="h-14 w-40 bg-gray-700 rounded mx-auto md:mx-0"></div>
            </div>
            <!-- Image Skeleton -->
            <div class="w-full flex justify-center items-center">
                <div class="h-[300px] md:h-[450px] w-full max-w-[400px] bg-gray-700 rounded"></div>
            </div>
        </div>
    </div>
  `
})
export class HeroSkeleton {}
