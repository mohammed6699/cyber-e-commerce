import { Component } from "@angular/core";

@Component({
    selector: 'app-details-skeleton',
    template: `
    <section class="flex flex-col items-center w-full px-0 md:px-2 md:px-[160px] md:py-4 md:py-10 bg-gray-50 animate-pulse">
        <div class="bg-white w-full md:border md:border-gray-200 rounded-none md:rounded-[12px] p-6 space-y-6">
            <!-- Details section -->
            <div>
                <div class="h-6 w-1/4 bg-gray-200 rounded mb-4"></div>
                <div class="h-4 w-full bg-gray-200 rounded"></div>
                <div class="h-4 w-full bg-gray-200 rounded mt-2"></div>
            </div>
            
            <!-- Description/Specs -->
            <div>
                <div class="h-6 w-1/4 bg-gray-200 rounded mb-4"></div>
                <div class="h-4 w-full bg-gray-200 rounded"></div>
            </div>
            
            <!-- Specs table -->
            <div>
                <div class="h-6 w-1/4 bg-gray-200 rounded mb-4"></div>
                <div class="flex justify-between py-2"><div class="h-4 w-1/3 bg-gray-200 rounded"></div><div class="h-4 w-1/4 bg-gray-200 rounded"></div></div>
                <div class="h-px bg-gray-200"></div>
                <div class="flex justify-between py-2"><div class="h-4 w-1/3 bg-gray-200 rounded"></div><div class="h-4 w-1/4 bg-gray-200 rounded"></div></div>
            </div>
        </div>
    </section>
    `,
})
export class DetailsSkeleton {}