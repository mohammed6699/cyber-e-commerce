import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ProductListModel, ProductModel, SearchProducts } from "../Models/Product.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { CategoriesModel } from "../Models/Categories.model";
import { distinctUntilChanged } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { HttpService } from "./Httpservice.service";
@Injectable({
    providedIn: 'root'
})
export class ProductService {
    // behaviour subject to maage dynamic search 
    private searchSubject = new BehaviorSubject<string>('');
    // as requested in the pdf to use distinctUntilChanged() operator to filter out the search 
    search$ = this.searchSubject.asObservable().pipe(distinctUntilChanged(), debounceTime(1000));
    constructor(
        private httpSer: HttpService
    ){}
    // set serch query
    set search(searchQuery: string){
        this.searchSubject.next(searchQuery.toLowerCase());
    }
    // search Product
    searchProductList(q: string, limit: number, skip: number = 1): Observable<SearchProducts>{
        const params = new HttpParams()
        .set('q', q)
        .set('limit', limit)
        .set('skip', skip);
        return this.httpSer.get<SearchProducts>(`products/search`, params);
    }
    // products list
    getProductList(): Observable<ProductListModel>{
        return this.httpSer.get<ProductListModel>('products');
    }
    // get product details
    getProductDetails(prdId: number): Observable<ProductModel>{
        return this.httpSer.get<ProductModel>(`products/${prdId}`)
    }
    // get categorieslist
    getCategoriesList(): Observable<CategoriesModel[]>{
        return this.httpSer.get<CategoriesModel[]>(`products/categories`)
    }
}