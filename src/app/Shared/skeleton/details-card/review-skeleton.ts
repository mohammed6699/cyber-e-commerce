import { Component } from "@angular/core";

@Component({
    selector: 'app-review-skeleton',
    template: `
    <section class="w-full flex flex-col items-center px-2 md:px-[160px] py-10 bg-white animate-pulse">
        <h1 class="text-xl w-full text-start font-semibold mb-4">Reviews</h1>
        <div class="flex w-full justify-center md:justify-between gap-8">
            <!-- right section avg. reviews -->
            <div class="w-full md:w-[200px]">
                <div class="border border-gray-200 rounded-[12px] p-4 md:p-6 bg-gray-100 w-full flex flex-col items-center gap-4">
                    <div class="h-10 w-16 bg-gray-200 rounded"></div>
                    <div class="h-4 w-24 bg-gray-200 rounded"></div>
                    <div class="h-6 w-32 bg-gray-200 rounded"></div>
                </div>
            </div>
            <!-- left section reviews numbers -->
            <div class="hidden lg:flex flex-col space-y-4 w-[320px]">
                @for (i of [1, 2, 3, 4, 5]; track i) {
                    <div class="flex items-center gap-2">
                        <div class="h-4 w-12 bg-gray-200 rounded"></div>
                        <div class="w-3/4 h-4 bg-gray-200 rounded"></div>
                    </div>
                }
            </div>
        </div>
    </section>
    
    <!-- customers reviews skeleton -->
    <div class="md:px-[160px] flex flex-col gap-4 mt-8">
        @for(i of [1, 2]; track i) {
            <section class="bg-gray-50 border border-gray-200 rounded-[12px] p-6 animate-pulse">
                <div class="flex justify-between mb-4">
                    <div class="h-4 w-1/4 bg-gray-200 rounded"></div>
                    <div class="h-4 w-1/6 bg-gray-200 rounded"></div>
                </div>
                <div class="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
                <div class="h-4 w-full bg-gray-200 rounded"></div>
            </section>
        }
    </div>
    `,
})
export class ReviewSkeleton {}