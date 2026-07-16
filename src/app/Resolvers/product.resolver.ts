import { ResolveFn } from "@angular/router";
import { ProductListModel } from "../Models/Product.model";
import { ProductService } from "../Services/Product.service";
import { inject } from "@angular/core";

export const productResolver: ResolveFn<ProductListModel> = (route, state) => {
    const productService = inject(ProductService);

    return productService.getProductList();
}