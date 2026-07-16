import { ResolveFn } from "@angular/router";
import { ProductListModel } from "../Models/Product.model";
import { ProductService } from "../Services/Product.service";
import { inject } from "@angular/core";
import { CategoriesModel } from "../Models/Categories.model";

export const categoryResolver: ResolveFn<CategoriesModel[]> = (route, state) => {
    const productService = inject(ProductService);

    return productService.getCategoriesList();
}