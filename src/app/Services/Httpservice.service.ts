import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HttpService{
    baseUrl = environment.baseUrl;

    constructor(
        private http: HttpClient
    ){}
    
    get<T>(endpoint: string, params?: HttpParams): Observable<T>{
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`, {params});
    }
}