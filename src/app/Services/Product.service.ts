import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ProductListModel, ProductModel, SearchProducts } from "../Models/Product.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { CategoriesModel } from "../Models/Categories.model";
import { distinctUntilChanged } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ProductService {
    baseUrl = environment.baseUrl + 'products'
    // behaviour subject to maage dynamic search 
    private searchSubject = new BehaviorSubject<string>('');
    // as requested in the pdf to use distinctUntilChanged() operator to filter out the search 
    search$ = this.searchSubject.asObservable().pipe(distinctUntilChanged(), debounceTime(1000));
    constructor(
        private http: HttpClient
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
        return this.http.get<SearchProducts>(`${this.baseUrl}/search`, {params});
    }
    // products list
    getProductList(): Observable<ProductListModel>{
        return this.http.get<ProductListModel>(`${this.baseUrl}`)
    }
    // get product details
    getProductDetails(prdId: number): Observable<ProductModel>{
        return this.http.get<ProductModel>(`${this.baseUrl}/${prdId}`)
    }
    // get categorieslist
    getCategoriesList(): Observable<CategoriesModel[]>{
        return this.http.get<CategoriesModel[]>(`${this.baseUrl}/categories`)
    }
}