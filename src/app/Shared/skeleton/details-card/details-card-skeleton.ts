import { Component } from "@angular/core";

@Component({
    selector: 'app-details-card-skeleton',
    template: `
    <section class="font-['Poppins'] flex flex-col items-center justify-center animate-pulse">
      <div class="flex flex-col md:flex-row p-4 md:p-10 bg-white w-full md:max-w-[1300px] gap-8">
        
        <!-- images wrapper -->
        <div class="flex flex-col-reverse md:flex-row gap-4 items-center">
            <div class="flex md:flex-col gap-4 items-center">
              <div class="w-16 h-[70px] md:w-20 md:h-[90px] bg-gray-200 rounded"></div>
              <div class="w-16 h-[70px] md:w-20 md:h-[90px] bg-gray-200 rounded"></div>
            </div>
            <div class="w-full md:w-[556px] h-[300px] md:h-[400px] bg-gray-200 rounded"></div>
        </div>

        <div class="w-full">
          <!-- Title -->
          <div class="h-10 w-3/4 bg-gray-200 rounded mb-4"></div>
          
          <!-- Pricing -->
          <div class="mt-5 flex items-center gap-3">
              <div class="h-6 w-20 bg-gray-200 rounded"></div>
              <div class="h-8 w-24 bg-gray-200 rounded"></div>
              <div class="h-6 w-16 bg-gray-200 rounded"></div>
          </div>

          <!-- Description -->
          <div class="mt-6 flex flex-col gap-2">
            <div class="h-4 w-full bg-gray-200 rounded"></div>
            <div class="h-4 w-full bg-gray-200 rounded"></div>
            <div class="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>

          <!-- Quantity -->
          <div class="p-2 w-[150px] h-14 bg-gray-100 rounded mt-4"></div>

          <!-- Buttons -->
          <div class="mt-6 flex flex-row gap-3">
            <div class="h-12 w-full md:w-[240px] bg-gray-200 rounded"></div>
            <div class="h-12 w-full md:w-[240px] bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </section>`,
})
export class DetailsCardSkeleton {}